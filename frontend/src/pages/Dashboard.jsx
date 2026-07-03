import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import PredictionForm from "../components/PredictionForm.jsx";
import WeatherCard from "../components/WeatherCard.jsx";
import ResultCard from "../components/ResultCard.jsx";
import StatsCard from "../components/StatsCard.jsx";
import PredictionHistory from "../components/PredictionHistory.jsx";
import { fetchTeams, fetchWeather, fetchPrediction, getErrorMessage } from "../services/api.js";
import { FALLBACK_TEAMS } from "../constants/teams.js";

const HISTORY_KEY = "ipl-score-predictor:history";
const MAX_HISTORY = 25;

function loadHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveHistory(history) {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch {
    // localStorage may be unavailable (private browsing, quota) - fail silently,
    // the UI still works for the current session.
  }
}

export default function Dashboard() {
  const [teams, setTeams] = useState(FALLBACK_TEAMS);
  const [weatherStatus, setWeatherStatus] = useState("idle");
  const [weather, setWeather] = useState(null);
  const [weatherError, setWeatherError] = useState("");
  const [lastCity, setLastCity] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [predictError, setPredictError] = useState("");
  const [result, setResult] = useState(null);

  const [history, setHistory] = useState(loadHistory);

  useEffect(() => {
    fetchTeams()
      .then((t) => t?.length && setTeams(t))
      .catch(() => {
        /* Fall back to the bundled team list if the API isn't reachable yet. */
      });
  }, []);

  const loadWeather = useCallback((city) => {
    if (!city || city === lastCity) return;
    setLastCity(city);
    setWeatherStatus("loading");
    fetchWeather(city)
      .then((data) => {
        setWeather(data);
        setWeatherStatus("success");
      })
      .catch((error) => {
        setWeatherError(getErrorMessage(error, "Could not load weather for this city"));
        setWeatherStatus("error");
      });
  }, [lastCity]);

  const retryWeather = () => {
    if (lastCity) {
      setLastCity(""); // force reload
      loadWeather(lastCity);
    }
  };

  const handleSubmit = async (formValues) => {
    setSubmitting(true);
    setPredictError("");
    try {
      const payload = {
        batting_team: formValues.battingTeam,
        bowling_team: formValues.bowlingTeam,
        overs: Number(formValues.overs),
        runs: Number(formValues.runs),
        wickets: Number(formValues.wickets),
        runs_last_5: Number(formValues.runsLast5),
        wickets_last_5: Number(formValues.wicketsLast5),
      };
      const prediction = await fetchPrediction(payload);

      const entry = {
        id: crypto.randomUUID(),
        battingTeam: formValues.battingTeam,
        bowlingTeam: formValues.bowlingTeam,
        city: formValues.city,
        overs: payload.overs,
        runs: payload.runs,
        wickets: payload.wickets,
        prediction,
        timestamp: Date.now(),
      };

      setResult(entry);
      setHistory((prev) => {
        const next = [entry, ...prev].slice(0, MAX_HISTORY);
        saveHistory(next);
        return next;
      });
    } catch (error) {
      setPredictError(getErrorMessage(error, "The model couldn't generate a prediction."));
    } finally {
      setSubmitting(false);
    }
  };

  const deleteHistoryItem = (id) => {
    setHistory((prev) => {
      const next = prev.filter((item) => item.id !== id);
      saveHistory(next);
      return next;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    saveHistory([]);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.3em] text-ball">
          Live match intelligence
        </p>
        <h1 className="font-display text-4xl tracking-wide sm:text-5xl">
          Predict the innings score, powered by ML
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-sm text-stadium-500 dark:text-pitch-light/60">
          Enter the current match state and get an instant projected final score, backed by a
          trained XGBoost model and real-time weather for the venue.
        </p>
      </motion.div>

      {predictError && (
        <div className="mb-6 rounded-xl border border-ball/30 bg-ball/10 px-4 py-3 text-center text-sm font-medium text-ball">
          {predictError}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <PredictionForm
            teams={teams}
            onSubmit={handleSubmit}
            onCityChange={loadWeather}
            submitting={submitting}
          />
        </div>

        <div className="flex flex-col gap-6 lg:col-span-2">
          <ResultCard result={result} />
          <WeatherCard
            weather={weather}
            status={weatherStatus}
            error={weatherError}
            onRetry={retryWeather}
          />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <StatsCard result={result} />
        </div>
        <div className="lg:col-span-2">
          <PredictionHistory
            history={history}
            onDelete={deleteHistoryItem}
            onClearAll={clearHistory}
          />
        </div>
      </div>
    </div>
  );
}
