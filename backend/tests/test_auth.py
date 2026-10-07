import unittest
from datetime import datetime, timezone
from unittest.mock import patch

from flask import Flask
from psycopg.errors import UniqueViolation
from werkzeug.security import check_password_hash

from utils import auth


class FakeCursor:
    def __init__(self, row=None):
        self.row = row

    def fetchone(self):
        return self.row


class FakeConnection:
    def __init__(self, users):
        self.users = users

    def __enter__(self):
        return self

    def __exit__(self, *_args):
        return False

    def execute(self, statement, parameters=None):
        if statement.lstrip().upper().startswith("INSERT INTO USERS"):
            name, email, password_hash = parameters
            if any(user["email"] == email for user in self.users):
                raise UniqueViolation("Email already exists")
            row = {
                "id": len(self.users) + 1,
                "name": name,
                "email": email,
                "password_hash": password_hash,
                "created_at": datetime.now(timezone.utc),
            }
            self.users.append(row)
            return FakeCursor(row)

        if "WHERE id = %s" in statement:
            row = next((user for user in self.users if user["id"] == parameters[0]), None)
        elif "WHERE LOWER(email) = %s" in statement:
            row = next((user for user in self.users if user["email"] == parameters[0]), None)
        else:
            row = None
        return FakeCursor(row)


class AuthRoutesTest(unittest.TestCase):
    def setUp(self):
        self.users = []
        self.app = Flask(__name__)
        self.app.secret_key = "test-signing-secret"
        self.app.config.update(TESTING=True)
        auth.register_auth_routes(self.app)
        self.client = self.app.test_client()
        self.connection_patch = patch.object(auth, "_connect", side_effect=lambda: FakeConnection(self.users))
        self.schema_patch = patch.object(auth, "_schema_ready", True)
        self.environment_patch = patch.dict(
            "os.environ",
            {"DATABASE_URL": "postgresql://test", "SECRET_KEY": "test-signing-secret"},
        )
        self.connection_patch.start()
        self.schema_patch.start()
        self.environment_patch.start()
        self.addCleanup(self.connection_patch.stop)
        self.addCleanup(self.schema_patch.stop)
        self.addCleanup(self.environment_patch.stop)

    def csrf_header(self, client=None):
        response = (client or self.client).get("/csrf")
        self.assertEqual(response.status_code, 200)
        return {"X-CSRF-Token": response.get_json()["csrf_token"]}

    def test_signup_hashes_password_and_profile_does_not_expose_hash(self):
        response = self.client.post(
            "/signup",
            json={"name": "Cricket Fan", "email": "Fan@Example.com", "password": "safe-password-123"},
            headers=self.csrf_header(),
        )

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.get_json()["user"]["email"], "fan@example.com")
        self.assertEqual(len(self.users), 1)
        self.assertNotEqual(self.users[0]["password_hash"], "safe-password-123")
        self.assertTrue(check_password_hash(self.users[0]["password_hash"], "safe-password-123"))

        profile = self.client.get("/profile")
        self.assertEqual(profile.status_code, 200)
        self.assertNotIn("password_hash", profile.get_json()["user"])

    def test_login_checks_password_and_logout_clears_session(self):
        user = {
            "id": 1,
            "name": "Cricket Fan",
            "email": "fan@example.com",
            "password_hash": auth.generate_password_hash("safe-password-123"),
            "created_at": datetime.now(timezone.utc),
        }
        self.users.append(user)

        invalid = self.client.post(
            "/login",
            json={"email": user["email"], "password": "incorrect-password"},
            headers=self.csrf_header(),
        )
        self.assertEqual(invalid.status_code, 401)

        valid = self.client.post(
            "/login",
            json={"email": user["email"], "password": "safe-password-123"},
            headers=self.csrf_header(),
        )
        self.assertEqual(valid.status_code, 200)
        self.assertEqual(self.client.get("/profile").status_code, 200)

        logged_out = self.client.post("/logout", headers=self.csrf_header())
        self.assertEqual(logged_out.status_code, 200)
        self.assertEqual(self.client.get("/profile").status_code, 401)

    def test_duplicate_email_and_missing_csrf_are_rejected(self):
        request = {"name": "Cricket Fan", "email": "fan@example.com", "password": "safe-password-123"}
        first = self.client.post("/signup", json=request, headers=self.csrf_header())
        self.assertEqual(first.status_code, 201)

        duplicate = self.client.post(
            "/signup",
            json=request,
            headers=self.csrf_header(),
        )
        self.assertEqual(duplicate.status_code, 409)

        no_csrf = self.app.test_client().post("/login", json=request)
        self.assertEqual(no_csrf.status_code, 403)

    def test_unconfigured_database_and_invalid_json_shape_fail_explicitly(self):
        with patch.dict("os.environ", {"DATABASE_URL": ""}):
            unavailable = self.app.test_client().get("/csrf")
        self.assertEqual(unavailable.status_code, 503)

        invalid_body = self.client.post(
            "/signup",
            json=["not", "an", "object"],
            headers=self.csrf_header(),
        )
        self.assertEqual(invalid_body.status_code, 400)


if __name__ == "__main__":
    unittest.main()
