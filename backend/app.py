import os
import logging

from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv

from utils.predictor import predict, load_model, TEAMS
from utils.weather import get_weather, WeatherError

load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("ipl-score-predictor")

app = Flask(__name__)

cors_origins = os.environ.get("CORS_ORIGINS", "*")
CORS(app, resources={r"/*": {"origins": cors_origins.split(",")}})

# Load the model exactly once, at process startup, not per-request.
load_model()
logger.info("ML model loaded and ready.")


@app.route("/", methods=["GET"])
def index():
    return jsonify({"message": "IPL Score Predictor API Running"})


@app.route("/teams", methods=["GET"])
def teams():
    return jsonify({"teams": TEAMS})


@app.route("/weather", methods=["GET"])
def weather():
    city = request.args.get("city", "").strip()
    if not city:
        return jsonify({"error": "Query param 'city' is required"}), 400
    try:
        data = get_weather(city)
        return jsonify(data)
    except WeatherError as exc:
        logger.warning("Weather lookup failed for %s: %s", city, exc)
        return jsonify({"error": str(exc)}), 502


@app.route("/predict", methods=["POST"])
def predict_route():
    payload = request.get_json(silent=True) or {}

    required_fields = [
        "batting_team", "bowling_team", "overs", "runs", "wickets",
        "runs_last_5", "wickets_last_5",
    ]
    missing = [f for f in required_fields if f not in payload]
    if missing:
        return jsonify({"error": f"Missing field(s): {', '.join(missing)}"}), 400

    try:
        batting_team = str(payload["batting_team"])
        bowling_team = str(payload["bowling_team"])
        overs = float(payload["overs"])
        runs = int(payload["runs"])
        wickets = int(payload["wickets"])
        runs_last_5 = int(payload["runs_last_5"])
        wickets_last_5 = int(payload["wickets_last_5"])
    except (TypeError, ValueError):
        return jsonify({"error": "Numeric fields must be valid numbers"}), 400

    if batting_team == bowling_team:
        return jsonify({"error": "batting_team and bowling_team must differ"}), 400
    if not (5.0 <= overs <= 20.0):
        return jsonify({"error": "overs must be between 5.0 and 20.0"}), 400
    if not (0 <= wickets <= 10):
        return jsonify({"error": "wickets must be between 0 and 10"}), 400
    if not (0 <= runs <= 300):
        return jsonify({"error": "runs must be between 0 and 300"}), 400

    try:
        score = predict(
            batting_team, bowling_team, overs, runs, wickets,
            runs_last_5, wickets_last_5,
        )
    except ValueError as exc:
        return jsonify({"error": str(exc)}), 400
    except Exception:
        logger.exception("Prediction failed")
        return jsonify({"error": "The model failed to generate a prediction"}), 500

    # A predicted score can't realistically be lower than the current score.
    score = max(score, runs)

    return jsonify({"prediction": score})


@app.errorhandler(404)
def not_found(_e):
    return jsonify({"error": "Not found"}), 404


@app.errorhandler(500)
def server_error(_e):
    return jsonify({"error": "Internal server error"}), 500


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
