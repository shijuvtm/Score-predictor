import logging
import os
import re
import secrets
import threading
from functools import wraps

import psycopg
from flask import current_app, jsonify, request, session
from psycopg.errors import UniqueViolation
from psycopg.rows import dict_row
from werkzeug.security import check_password_hash, generate_password_hash

logger = logging.getLogger("ipl-score-predictor.auth")
_schema_lock = threading.Lock()
_schema_ready = False


def _database_url():
    return os.environ.get("DATABASE_URL", "").strip()


def _connect():
    database_url = _database_url()
    if not database_url:
        raise RuntimeError("DATABASE_URL is not configured")
    return psycopg.connect(
        database_url,
        sslmode=os.environ.get("DATABASE_SSLMODE", "require"),
        connect_timeout=5,
        row_factory=dict_row,
    )


def _ensure_users_table():
    global _schema_ready
    if _schema_ready:
        return
    with _schema_lock:
        if _schema_ready:
            return
        with _connect() as connection:
            connection.execute(
                """
                CREATE TABLE IF NOT EXISTS users (
                    id BIGSERIAL PRIMARY KEY,
                    name VARCHAR(100) NOT NULL,
                    email VARCHAR(254) NOT NULL,
                    password_hash TEXT NOT NULL,
                    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
                )
                """
            )
            connection.execute(
                "CREATE UNIQUE INDEX IF NOT EXISTS users_email_lower_unique ON users (LOWER(email))"
            )
        _schema_ready = True


def _normalize_email(value):
    if not isinstance(value, str):
        return None
    email = value.strip().lower()
    if len(email) > 254 or not re.fullmatch(r"[^@\s]+@[^@\s]+\.[^@\s]+", email):
        return None
    return email


def _user_json(row):
    return {
        "id": row["id"],
        "name": row["name"],
        "email": row["email"],
        "created_at": row["created_at"].isoformat(),
    }


def _database_error():
    logger.exception("Authentication database operation failed")
    return jsonify({"error": "Account service is temporarily unavailable. Please try again."}), 503


def _auth_ready():
    if not _database_url():
        return jsonify({"error": "Account service is not configured. Set DATABASE_URL."}), 503
    if not current_app.secret_key:
        return jsonify({"error": "Account service is not configured. Set SECRET_KEY."}), 503
    return None


def csrf_required(handler):
    @wraps(handler)
    def wrapped(*args, **kwargs):
        token = session.get("_csrf_token")
        supplied = request.headers.get("X-CSRF-Token", "")
        if not token or not supplied or not secrets.compare_digest(token, supplied):
            return jsonify({"error": "Your session expired. Refresh the page and try again."}), 403
        return handler(*args, **kwargs)

    return wrapped


def register_auth_routes(app):
    @app.route("/csrf", methods=["GET"])
    def csrf_token():
        unavailable = _auth_ready()
        if unavailable:
            return unavailable
        token = session.setdefault("_csrf_token", secrets.token_urlsafe(32))
        response = jsonify({"csrf_token": token})
        response.headers["Cache-Control"] = "no-store"
        return response

    @app.route("/signup", methods=["POST"])
    @csrf_required
    def signup():
        unavailable = _auth_ready()
        if unavailable:
            return unavailable

        payload = request.get_json(silent=True) or {}
        if not isinstance(payload, dict):
            return jsonify({"error": "Request body must be a JSON object."}), 400
        name = payload.get("name")
        email = _normalize_email(payload.get("email"))
        password = payload.get("password")
        if not isinstance(name, str) or not name.strip() or len(name.strip()) > 100:
            return jsonify({"error": "Name is required and must be 100 characters or fewer."}), 400
        if not email:
            return jsonify({"error": "Enter a valid email address."}), 400
        if not isinstance(password, str) or len(password) < 8 or len(password) > 128:
            return jsonify({"error": "Password must be between 8 and 128 characters."}), 400

        try:
            _ensure_users_table()
            with _connect() as connection:
                row = connection.execute(
                    """
                    INSERT INTO users (name, email, password_hash)
                    VALUES (%s, %s, %s)
                    RETURNING id, name, email, created_at
                    """,
                    (name.strip(), email, generate_password_hash(password)),
                ).fetchone()
        except UniqueViolation:
            return jsonify({"error": "An account with this email already exists."}), 409
        except (psycopg.Error, RuntimeError, ValueError):
            return _database_error()

        session.clear()
        session.permanent = True
        session["user_id"] = row["id"]
        session["_csrf_token"] = secrets.token_urlsafe(32)
        return jsonify({"user": _user_json(row)}), 201

    @app.route("/login", methods=["POST"])
    @csrf_required
    def login():
        unavailable = _auth_ready()
        if unavailable:
            return unavailable

        payload = request.get_json(silent=True) or {}
        if not isinstance(payload, dict):
            return jsonify({"error": "Request body must be a JSON object."}), 400
        email = _normalize_email(payload.get("email"))
        password = payload.get("password")
        if not email or not isinstance(password, str) or not password:
            return jsonify({"error": "Enter a valid email and password."}), 400

        try:
            _ensure_users_table()
            with _connect() as connection:
                row = connection.execute(
                    """
                    SELECT id, name, email, password_hash, created_at
                    FROM users
                    WHERE LOWER(email) = %s
                    """,
                    (email,),
                ).fetchone()
        except (psycopg.Error, RuntimeError, ValueError):
            return _database_error()

        if not row or not check_password_hash(row["password_hash"], password):
            return jsonify({"error": "Email or password is incorrect."}), 401

        session.clear()
        session.permanent = True
        session["user_id"] = row["id"]
        session["_csrf_token"] = secrets.token_urlsafe(32)
        return jsonify({"user": _user_json(row)})

    @app.route("/profile", methods=["GET"])
    def profile():
        unavailable = _auth_ready()
        if unavailable:
            return unavailable

        user_id = session.get("user_id")
        if not user_id:
            return jsonify({"error": "Please log in to view your profile."}), 401
        try:
            _ensure_users_table()
            with _connect() as connection:
                row = connection.execute(
                    "SELECT id, name, email, created_at FROM users WHERE id = %s",
                    (user_id,),
                ).fetchone()
        except (psycopg.Error, RuntimeError, ValueError):
            return _database_error()

        if not row:
            session.clear()
            return jsonify({"error": "Please log in to view your profile."}), 401
        return jsonify({"user": _user_json(row)})

    @app.route("/logout", methods=["POST"])
    @csrf_required
    def logout():
        unavailable = _auth_ready()
        if unavailable:
            return unavailable
        session.clear()
        return jsonify({"message": "You have been logged out."})
