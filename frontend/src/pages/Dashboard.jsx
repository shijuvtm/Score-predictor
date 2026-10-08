import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineCpuChip, HiOutlineInformationCircle, HiOutlineShieldCheck } from "react-icons/hi2";
import PredictionForm from "../components/PredictionForm.jsx";
import ResultCard from "../components/ResultCard.jsx";
import PredictionHistory from "../components/PredictionHistory.jsx";
import WeatherCard from "../components/WeatherCard.jsx";
import { fetchTeams, fetchPrediction, fetchWeather, getErrorMessage } from "../services/api.js";
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
    // Storage may be disabled; predictions remain available for this session.
  }
}

export default function Dashboard() {
  const [teams, setTeams] = useState(FALLBACK_TEAMS);
  const [submitting, setSubmitting] = useState(false);
  const [predictError, setPredictError] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState(loadHistory);
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState("");

  useEffect(() => {
    fetchTeams()
      .then((availableTeams) => {
        if (availableTeams?.length) setTeams(availableTeams);
      })
      .catch(() => {
        setPredictError("Couldn't reach the teams API. The bundled model-supported team list is available; prediction still requires the Flask backend.");
      });
  }, []);

  useEffect(() => {
    const selectedCity = city.trim();
    if (!selectedCity) {
      setWeather(null);
      setWeatherLoading(false);
      setWeatherError("");
      return undefined;
    }

    let active = true;
    setWeather(null);
    setWeatherError("");
    setWeatherLoading(true);

    const timeoutId = window.setTimeout(() => {
      fetchWeather(selectedCity)
        .then((data) => {
          if (active) setWeather(data);
        })
        .catch((error) => {
          if (active) {
            setWeatherError(
              error.response?.data?.error ||
                "Could not fetch weather. Check the backend and weather API configuration."
            );
          }
        })
        .finally(() => {
          if (active) setWeatherLoading(false);
        });
    }, 400);

    return () => {
      active = false;
      window.clearTimeout(timeoutId);
    };
  }, [city]);

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
        overs: payload.overs,
        runs: payload.runs,
        wickets: payload.wickets,
        prediction,
        timestamp: Date.now(),
      };
      setResult(entry);
      setHistory((previous) => {
        const next = [entry, ...previous].slice(0, MAX_HISTORY);
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
    setHistory((previous) => {
      const next = previous.filter((item) => item.id !== id);
      saveHistory(next);
      return next;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    saveHistory([]);
  };

  return (
    <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-12">
      <div className="mb-8 grid gap-6 border-b border-black/5 pb-7 dark:border-white/10 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[.2em] text-ball">The machine-learning feature</p>
          <h1 className="font-display text-4xl tracking-wide sm:text-5xl">Cricket Score Predictor</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-stadium-500 dark:text-pitch-light/60">Predict an expected innings total from the current match state. The estimate comes directly from this project’s trained model.</p>
        </div>
        <Link to="/matches" className="text-sm font-bold text-ball hover:underline">Explore match centre →</Link>
      </div>

      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        <FeatureNote icon={<HiOutlineCpuChip />} title="Trained model" text="Existing XGBoost model; no fabricated output." />
        <FeatureNote icon={<HiOutlineInformationCircle />} title="Seven inputs" text="Teams, innings state and last-five-over trend." />
        <FeatureNote icon={<HiOutlineShieldCheck />} title="Private history" text="Your recent predictions stay in this browser." />
      </div>

      {predictError && <div role="alert" className="mb-5 rounded-xl border border-ball/30 bg-ball/10 px-4 py-3 text-sm font-medium text-ball">{predictError}</div>}

      <div className="grid gap-5 lg:grid-cols-[1.03fr_.97fr]">
        <PredictionForm
          teams={teams}
          onSubmit={handleSubmit}
          submitting={submitting}
          onCityChange={setCity}
        />
        <div className="flex flex-col gap-5">
          <WeatherCard weather={weather} city={city} loading={weatherLoading} error={weatherError} />
          <ResultCard result={result} />
          <div className="site-card p-5 sm:p-6">
            <p className="text-xs font-bold uppercase tracking-[.16em] text-ball">What the model receives</p>
            <p className="mt-2 text-sm leading-6 text-stadium-600 dark:text-pitch-light/65">Batting and bowling team, runs, wickets, overs completed, runs in the last five overs and wickets in the last five overs. Current run rate is shown in the form for context; it is not sent as an extra model feature.</p>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <PredictionHistory history={history} onDelete={deleteHistoryItem} onClearAll={clearHistory} />
      </div>
    </main>
  );
}

function FeatureNote({ icon, title, text }) {
  return <div className="site-card flex items-start gap-3 p-4"><span className="mt-0.5 text-xl text-ball">{icon}</span><div><p className="text-sm font-bold">{title}</p><p className="mt-1 text-xs leading-5 text-stadium-500 dark:text-pitch-light/55">{text}</p></div></div>;
}
