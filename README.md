# 🏏 IPL Score Predictor

A full-stack web app that predicts the final score of a live IPL T20 innings using
a trained XGBoost model, with live weather for the match venue layered on top for
context.

**Frontend:** React (Vite) + Tailwind CSS + Framer Motion + Recharts
**Backend:** Flask + XGBoost + OpenWeatherMap

---

## Features

- **Instant score prediction** from batting/bowling team, current runs/wickets/overs,
  and the last-5-overs trend
- **Live weather** for the selected city (temperature, humidity, wind, pressure)
- **Prediction history** saved to `localStorage` — search, delete, or clear all
- **Run projection & current-vs-predicted charts** (Recharts)
- **Dark / light mode** with system-preference detection
- **Form validation**: teams must differ, overs 0–20, wickets 0–10, runs 0–300
- **Graceful error handling** for backend downtime, bad weather lookups, and model errors
- Responsive, mobile-first, cricket-stadium-inspired UI

---

## Folder structure

```
ipl-score-predictor/
├── frontend/
│   ├── src/
│   │   ├── components/       Navbar, PredictionForm, WeatherCard, ResultCard,
│   │   │                     StatsCard, PredictionHistory, LoadingSpinner
│   │   ├── pages/            Dashboard, About
│   │   ├── services/api.js   Axios client for the Flask API
│   │   ├── constants/teams.js
│   │   ├── App.jsx / main.jsx / index.css
│   └── vite.config.js / tailwind.config.js
│
├── backend/
│   ├── app.py                 Flask app & routes
│   ├── model/ml_model.pkl     Trained XGBoost model
│   ├── utils/predictor.py     Loads the model once, builds features, predicts
│   ├── utils/weather.py       OpenWeatherMap wrapper
│   └── requirements.txt
│
└── README.md
```

---

## Getting started

### Prerequisites

- Node.js 18+
- Python 3.10+
- A free [OpenWeatherMap](https://openweathermap.org/api) API key (optional — the
  app runs fine without it, the weather card just shows an error you can retry)

### 1. Backend setup

```bash
cd backend
python -m venv venv
source venv/bin/activate          # Windows: venv\Scripts\activate
pip install -r requirements.txt

cp .env.example .env
# then edit .env and paste in your OPENWEATHER_API_KEY

python app.py
# API now running at http://localhost:5000
```

### 2. Frontend setup

```bash
cd frontend
npm install
cp .env.example .env    # optional — only needed for a non-default API URL
npm run dev
# App now running at http://localhost:5173
```

The Vite dev server proxies `/api/*` requests to `http://localhost:5000`, so the
two servers just need to be running side by side — no CORS headaches locally.

### 3. Weather API configuration

1. Sign up at https://openweathermap.org/api and grab a free API key.
2. Put it in `backend/.env` as `OPENWEATHER_API_KEY=...`.
3. Restart the Flask server.

Without a key, `/weather` returns a clear error message and the UI shows a
"Retry" button instead of crashing.

---

## API documentation

Base URL (dev): `http://localhost:5000`

### `GET /`
Health check.
```json
{ "message": "IPL Score Predictor API Running" }
```

### `GET /teams`
Returns the list of teams the model was trained on (used to populate the dropdowns).
```json
{ "teams": ["Chennai Super Kings", "Mumbai Indians", "..."] }
```

### `GET /weather?city=Mumbai`
```json
{
  "city": "Mumbai",
  "temperature": 31.0,
  "humidity": 70,
  "condition": "Clear",
  "description": "clear sky",
  "wind_speed": 3.6,
  "pressure": 1008
}
```
Errors return `{ "error": "..." }` with a `4xx`/`5xx` status.

### `POST /predict`
Request body:
```json
{
  "batting_team": "Mumbai Indians",
  "bowling_team": "Chennai Super Kings",
  "overs": 10.4,
  "runs": 78,
  "wickets": 2,
  "runs_last_5": 42,
  "wickets_last_5": 1
}
```
Response:
```json
{ "prediction": 184 }
```

The model is loaded **once**, at process startup — never per-request — so
predictions are fast even under load.

---

## Deployment

**Backend (Render / Railway / Fly.io / any Python host):**
```bash
pip install -r requirements.txt
gunicorn app:app --bind 0.0.0.0:$PORT
```
Set `OPENWEATHER_API_KEY` and `CORS_ORIGINS` (your deployed frontend URL) as
environment variables on the host.

**Frontend (Vercel / Netlify):**
```bash
npm run build     # outputs to frontend/dist
```
Set `VITE_API_BASE_URL` to your deployed backend URL, e.g.
`https://your-api.onrender.com`, in the host's environment variable settings.

---

## Screenshots

> _Add screenshots here once deployed:_
> - `docs/dashboard-dark.png` — Dashboard, dark mode
> - `docs/dashboard-light.png` — Dashboard, light mode
> - `docs/prediction-result.png` — Prediction result & charts
> - `docs/history.png` — Prediction history panel

---

## Tech notes

- The model expects a specific 25-feature vector (one-hot batting team, one-hot
  bowling team, then `runs`, `wickets`, `overs`, `runs_last_5`, `wickets_last_5`)
  — this exact order is documented and enforced in `backend/utils/predictor.py`.
- Weather is decorative context, not a model input — swapping weather providers
  or removing the panel entirely won't affect predictions.
- Charts on the dashboard are illustrative interpolations between the current
  score and the predicted final score, not a second model.
