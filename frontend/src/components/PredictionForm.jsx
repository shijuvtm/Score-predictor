import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { HiOutlineBolt } from "react-icons/hi2";
import { IPL_CITIES } from "../constants/teams.js";

export default function PredictionForm({ teams, onSubmit, onCityChange, submitting }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      battingTeam: "",
      bowlingTeam: "",
      city: "",
      runs: "",
      wickets: "",
      overs: "",
      runsLast5: "",
      wicketsLast5: "",
    },
  });

  const battingTeam = watch("battingTeam");
  const bowlingTeam = watch("bowlingTeam");
  const city = watch("city");

  useEffect(() => {
    if (city) onCityChange(city);
  }, [city, onCityChange]);

  const teamsClash = battingTeam && bowlingTeam && battingTeam === bowlingTeam;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="glass-card space-y-5 p-6"
      noValidate
    >
      <h3 className="font-display text-2xl tracking-wide">Match State</h3>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Batting team" error={errors.battingTeam?.message || (teamsClash && "Teams must differ")}>
          <select
            className="form-select"
            {...register("battingTeam", { required: "Required" })}
          >
            <option value="">Select team</option>
            {teams.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Bowling team" error={errors.bowlingTeam?.message}>
          <select
            className="form-select"
            {...register("bowlingTeam", { required: "Required" })}
          >
            <option value="">Select team</option>
            {teams.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="City" error={errors.city?.message}>
        <input
          list="ipl-cities"
          placeholder="Start typing a city..."
          className="form-input"
          {...register("city", { required: "City is required" })}
        />
        <datalist id="ipl-cities">
          {IPL_CITIES.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
      </Field>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <Field label="Overs bowled" error={errors.overs?.message}>
          <input
            type="number"
            step="0.1"
            placeholder="e.g. 10.4"
            className="form-input"
            {...register("overs", {
              required: "Required",
              min: { value: 5, message: "Min 5.0" },
              max: { value: 20, message: "Max 20.0" },
            })}
          />
        </Field>

        <Field label="Runs" error={errors.runs?.message}>
          <input
            type="number"
            placeholder="0-300"
            className="form-input"
            {...register("runs", {
              required: "Required",
              min: { value: 0, message: "Min 0" },
              max: { value: 300, message: "Max 300" },
            })}
          />
        </Field>

        <Field label="Wickets" error={errors.wickets?.message}>
          <input
            type="number"
            placeholder="0-10"
            className="form-input"
            {...register("wickets", {
              required: "Required",
              min: { value: 0, message: "Min 0" },
              max: { value: 10, message: "Max 10" },
            })}
          />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Runs in last 5 overs" error={errors.runsLast5?.message}>
          <input
            type="number"
            placeholder="0-100"
            className="form-input"
            {...register("runsLast5", {
              required: "Required",
              min: { value: 0, message: "Min 0" },
              max: { value: 100, message: "Max 100" },
            })}
          />
        </Field>

        <Field label="Wickets in last 5 overs" error={errors.wicketsLast5?.message}>
          <input
            type="number"
            placeholder="0-10"
            className="form-input"
            {...register("wicketsLast5", {
              required: "Required",
              min: { value: 0, message: "Min 0" },
              max: { value: 10, message: "Max 10" },
            })}
          />
        </Field>
      </div>

      <button
        type="submit"
        disabled={!isValid || teamsClash || submitting}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-ball py-3 font-display text-lg tracking-wide text-white shadow-glow transition disabled:cursor-not-allowed disabled:opacity-40 enabled:hover:bg-ball-dark"
      >
        <HiOutlineBolt size={20} />
        {submitting ? "Predicting..." : "Predict Score"}
      </button>
    </form>
  );
}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-stadium-500 dark:text-pitch-light/50">
        {label}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs font-medium text-ball">{error}</span>}
    </label>
  );
}
