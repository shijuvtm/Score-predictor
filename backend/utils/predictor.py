"""
predictor.py
------------
Wraps the trained XGBoost model (model/ml_model.pkl) and exposes a single
`predict()` function. The model is loaded exactly once at import time
(i.e. once per Flask process), never per-request.

The feature order below was read directly off the model's own
`feature_names` metadata, so it must stay in this exact order:

  0  batting_team_Chennai Super Kings
  1  batting_team_Delhi Capitals
  2  batting_team_Punjab Kings
  3  batting_team_Gujarat Titans
  4  batting_team_Kolkata Knight Riders
  5  batting_team_Mumbai Indians
  6  batting_team_Rajasthan Royals
  7  batting_team_Royal Challengers Bangalore
  8  batting_team_Sunrisers Hyderabad
  9  batting_team_Lucknow Super Giants
  10 bowling_team_Chennai Super Kings
  11 bowling_team_Delhi Capitals
  12 bowling_team_Punjab Kings
  13 bowling_team_Gujarat Titans
  14 bowling_team_Kolkata Knight Riders
  15 bowling_team_Mumbai Indians
  16 bowling_team_Rajasthan Royals
  17 bowling_team_Royal Challengers Bangalore
  18 bowling_team_Sunrisers Hyderabad
  19 bowling_team_Lucknow Super Giants
  20 runs
  21 wickets
  22 overs
  23 runs_last_5
  24 wickets_last_5
"""

import os
import pickle
import numpy as np

MODEL_PATH = os.path.join(os.path.dirname(__file__), "..", "model", "ml_model.pkl")

TEAMS = [
    "Chennai Super Kings",
    "Delhi Capitals",
    "Punjab Kings",
    "Gujarat Titans",
    "Kolkata Knight Riders",
    "Mumbai Indians",
    "Rajasthan Royals",
    "Royal Challengers Bangalore",
    "Sunrisers Hyderabad",
    "Lucknow Super Giants",
]

_model = None


def load_model():
    """Load the model once and cache it at module scope."""
    global _model
    if _model is None:
        with open(MODEL_PATH, "rb") as f:
            _model = pickle.load(f)
    return _model


def _one_hot(team: str) -> list[float]:
    if team not in TEAMS:
        raise ValueError(f"Unknown team '{team}'. Must be one of: {', '.join(TEAMS)}")
    return [1.0 if team == t else 0.0 for t in TEAMS]


def build_feature_vector(batting_team: str, bowling_team: str, overs: float,
                          runs: int, wickets: int, runs_last_5: int,
                          wickets_last_5: int) -> np.ndarray:
    if batting_team == bowling_team:
        raise ValueError("batting_team and bowling_team must be different")

    features = (
        _one_hot(batting_team)
        + _one_hot(bowling_team)
        + [float(runs), float(wickets), float(overs), float(runs_last_5), float(wickets_last_5)]
    )
    return np.array(features, dtype=np.float32).reshape(1, -1)


def predict(batting_team: str, bowling_team: str, overs: float, runs: int,
            wickets: int, runs_last_5: int, wickets_last_5: int) -> int:
    model = load_model()
    X = build_feature_vector(
        batting_team, bowling_team, overs, runs, wickets, runs_last_5, wickets_last_5
    )
    raw_prediction = float(model.predict(X)[0])
    return int(round(raw_prediction))
