# Cricket Predictor

A responsive cricket information website with an ML-powered innings score predictor. The predictor is backed by this project's existing trained XGBoost model and Flask API; the surrounding match, team, player and editorial pages use local illustrative data.

## Features

- Home page with a cricket stadium hero, match cards, teams, players, stories and predictor overview
- Responsive navigation and shared footer
- Live, upcoming and completed match views with match detail and sample scorecard
- IPL model-supported team directory and sample player profiles/statistics
- Original demo cricket stories with search and detail pages
- Cricket score prediction using the existing model, with validation, dynamic current run rate and local prediction history
- Responsive dark/light theme
- PostgreSQL-backed registration and login with one-way password hashing
- Secure HTTP-only login sessions, CSRF protection and authenticated profile endpoint
- Local demo fixtures work without paid APIs, map keys or external data credentials

Live fixtures, player profiles/statistics and articles are clearly identified as illustrative. No live cricket feed or news provider is connected.

## Project structure

```text
backend/
  app.py                 Flask routes and validation
  model/ml_model.pkl     Existing trained model
  utils/predictor.py     Cached model loading and original feature encoding
  utils/weather.py       Optional OpenWeatherMap endpoint
  utils/auth.py          PostgreSQL-backed account registration and sessions
frontend/
  src/
    components/          Shared navigation, cards, predictor and presentation components
    data/cricket.js      Local illustrative site content
    pages/               Home, predictor and routed directory/detail pages
    services/api.js      Existing Flask API client
    constants/teams.js   Team colors and predictor fallback list
```

## ML predictor

The frontend `/predictor` page submits a JSON `POST /predict` request to the existing Flask service. The request contract and model preprocessing have not changed.

Required fields:

| Field | Meaning |
| --- | --- |
| `batting_team` | Batting team name from the model's supported team list |
| `bowling_team` | Bowling team name; must differ from batting team |
| `runs` | Current innings runs |
| `wickets` | Current wickets lost |
| `overs` | Overs completed (5.0–20.0, matching backend validation) |
| `runs_last_5` | Runs in the last five overs |
| `wickets_last_5` | Wickets in the last five overs |

The UI calculates current run rate as runs divided by overs for display only; it is not sent as a model feature. The model feature vector remains: 10 batting-team one-hot values, 10 bowling-team one-hot values, then `runs`, `wickets`, `overs`, `runs_last_5`, and `wickets_last_5`. The Flask service loads `backend/model/ml_model.pkl` once when the process starts, calls the trained model, and returns `{ "prediction": <score> }`. The result UI displays only this returned score.

Prediction history is stored in the user's browser `localStorage`. PostgreSQL stores registered account names, normalized email addresses, password hashes, and account creation timestamps. It never stores plaintext passwords.

## API

Existing backend routes:

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/` | Backend health response |
| `GET` | `/teams` | Team list used by the predictor |
| `POST` | `/predict` | Existing ML score prediction |
| `GET` | `/weather?city=Mumbai` | Optional weather lookup (requires a provider key) |
| `GET` | `/csrf` | Creates/returns a CSRF token for auth form requests |
| `POST` | `/signup` | Creates a PostgreSQL account and signs the user in |
| `POST` | `/login` | Checks credentials and starts a session |
| `GET` | `/profile` | Returns the signed-in account, or HTTP 401 |
| `POST` | `/logout` | Clears the current session |

The website's other match, team, player and news pages use local data from `frontend/src/data/cricket.js`.

## Environment variables

Environment template files are provided at `backend/.env.example` and `frontend/.env.example`.

- `DATABASE_URL` — PostgreSQL connection URL from your managed cloud provider. It must remain a server-side secret and should use TLS.
- `DATABASE_SSLMODE` — PostgreSQL TLS mode; defaults to `require` for cloud databases. Set to `prefer` only for local PostgreSQL installations without TLS.
- `SECRET_KEY` — long, random Flask signing secret used to protect sessions. Required for authentication; do not commit it or expose it to the frontend.
- `CORS_ORIGINS` — comma-separated exact frontend origins. Keep this explicit when credentials are enabled.
- `SESSION_COOKIE_SECURE` — set to `true` when using HTTPS.
- `SESSION_COOKIE_SAMESITE` — defaults to `Lax`. When the deployed frontend and API are on different sites, set this to `None` and `SESSION_COOKIE_SECURE=true`.
- `OPENWEATHER_API_KEY` — optional; only needed if calling the backend's retained `/weather` endpoint. It is not needed to run the website or predictor.
- `PORT` — optional backend port; defaults to `5000`.
- `VITE_API_BASE_URL` — optional Flask base URL for deployment; leave blank during local development to use the Vite proxy.

Copy `backend/.env.example` to `backend/.env`, then replace the database URL and signing key with values from your PostgreSQL provider and a securely generated secret. The backend creates the `users` table and case-insensitive unique email index on its first authentication request. The database user therefore needs permission to create tables/indexes during initial setup; after the schema exists, those permissions can be reduced. Do not put real credentials in example files or commit `.env` files.

## Run locally

Requirements: Node.js 18+ and Python 3.10+.

Start the Flask API:

```bash
cd backend
python -m venv .venv
source .venv/bin/activate          # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Set DATABASE_URL and SECRET_KEY in .env to enable registration/login.
python app.py
```

To generate a suitable Flask signing secret, run `python -c "import secrets; print(secrets.token_urlsafe(48))"` and set its output as `SECRET_KEY` in the backend environment. Never use that generated value as a database password.

In a second terminal, start the frontend:

```bash
cd frontend
npm install
cp .env.example .env               # optional
npm run dev
```

Open the Vite URL (normally `http://localhost:5173`). In development, the frontend calls `/api/*`; the Vite proxy strips `/api` and forwards to Flask. With `VITE_API_BASE_URL` set for deployment, the frontend calls the Flask paths directly. Configure `CORS_ORIGINS` with the frontend's exact origin and credentials enabled by the backend.

Authentication uses signed, HTTP-only session cookies and CSRF tokens; passwords are hashed with Werkzeug's scrypt-based password hasher before being stored. The browser sends account requests with credentials included. For separate frontend and API sites, configure `SESSION_COOKIE_SAMESITE=None`, `SESSION_COOKIE_SECURE=true`, HTTPS, and the exact deployed frontend origin in `CORS_ORIGINS`. Authentication APIs return a service-unavailable response when the database URL or session signing key is not configured.

## Checks

```bash
cd frontend
npm run lint
npm run build

cd ../backend
python -m unittest discover -s tests -v
```

To manually verify the backend prediction contract, with Flask running:

```bash
curl -X POST http://localhost:5000/predict \
  -H 'Content-Type: application/json' \
  -d '{"batting_team":"Mumbai Indians","bowling_team":"Chennai Super Kings","overs":10.4,"runs":78,"wickets":2,"runs_last_5":42,"wickets_last_5":1}'
```

The response is generated by the trained model and has the form `{"prediction": 180}` for the sample input in this environment. The score is not hard-coded; it is the model output and may depend on the model/runtime version.
