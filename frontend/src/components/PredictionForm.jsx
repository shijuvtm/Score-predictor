import { useForm } from "react-hook-form";
import { HiOutlineBolt, HiOutlineInformationCircle } from "react-icons/hi2";

export default function PredictionForm({ teams, onSubmit, submitting, onCityChange }) {
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
  const runsInput = watch("runs");
  const oversInput = watch("overs");
  const runs = Number(runsInput);
  const overs = Number(oversInput);
  const currentRunRate = runsInput !== "" && oversInput !== "" && Number.isFinite(runs / overs) && overs > 0
    ? (runs / overs).toFixed(2)
    : "—";
  const teamsClash = battingTeam && bowlingTeam && battingTeam === bowlingTeam;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="site-card space-y-5 p-5 sm:p-7" noValidate>
      <div>
        <p className="text-xs font-bold uppercase tracking-[.16em] text-ball">Match setup</p>
        <h2 className="mt-1 font-display text-2xl tracking-wide">Tell us about the innings</h2>
        <p className="mt-2 text-xs leading-5 text-stadium-500 dark:text-pitch-light/50">All fields are required by the existing prediction model.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Batting team" error={errors.battingTeam?.message || (teamsClash && "Teams must differ")}>
          <select className="site-input" {...register("battingTeam", { required: "Select a batting team" })}>
            <option value="">Select team</option>
            {teams.map((team) => <option key={team} value={team}>{team}</option>)}
          </select>
        </Field>
        <Field label="Bowling team" error={errors.bowlingTeam?.message}>
          <select className="site-input" {...register("bowlingTeam", {
            required: "Select a bowling team",
            validate: (value) => value !== battingTeam || "Teams must differ",
          })}>
            <option value="">Select team</option>
            {teams.map((team) => <option key={team} value={team}>{team}</option>)}
          </select>
        </Field>
      </div>

      <Field label="City for weather" error={errors.city?.message}>
        <input
          type="text"
          list="weather-cities"
          placeholder="Choose or enter a city"
          autoComplete="address-level2"
          className="site-input"
          {...register("city", {
            maxLength: { value: 80, message: "City name is too long" },
            onChange: (event) => onCityChange(event.target.value),
          })}
        />
        <datalist id="weather-cities">
          {["Ahmedabad", "Bengaluru", "Chennai", "Delhi", "Dharamshala", "Hyderabad", "Jaipur", "Kolkata", "Lucknow", "Mumbai"].map((city) => (
            <option key={city} value={city} />
          ))}
        </datalist>
        <span className="mt-1 block text-xs text-stadium-500 dark:text-pitch-light/50">
          Weather only; this does not affect the score prediction.
        </span>
      </Field>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <Field label="Overs completed" error={errors.overs?.message}>
          <input type="number" step="0.1" min="5" max="20" placeholder="5.0–20.0" className="site-input" {...register("overs", {
            required: "Enter overs completed",
            valueAsNumber: true,
            min: { value: 5, message: "Minimum 5.0 overs" },
            max: { value: 20, message: "Maximum 20.0 overs" },
          })} />
        </Field>
        <Field label="Current runs" error={errors.runs?.message}>
          <input type="number" min="0" max="300" placeholder="0–300" className="site-input" {...register("runs", {
            required: "Enter the current runs",
            valueAsNumber: true,
            min: { value: 0, message: "Minimum 0 runs" },
            max: { value: 300, message: "Maximum 300 runs" },
            validate: (value) => Number.isInteger(value) || "Enter whole runs",
          })} />
        </Field>
        <Field label="Wickets" error={errors.wickets?.message}>
          <input type="number" min="0" max="10" placeholder="0–10" className="site-input" {...register("wickets", {
            required: "Enter wickets lost",
            valueAsNumber: true,
            min: { value: 0, message: "Minimum 0 wickets" },
            max: { value: 10, message: "Maximum 10 wickets" },
            validate: (value) => Number.isInteger(value) || "Enter whole wickets",
          })} />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Runs in last 5 overs" error={errors.runsLast5?.message}>
          <input type="number" min="0" max="100" placeholder="0–100" className="site-input" {...register("runsLast5", {
            required: "Enter runs from the last five overs",
            valueAsNumber: true,
            min: { value: 0, message: "Minimum 0 runs" },
            max: { value: 100, message: "Maximum 100 runs" },
            validate: (value) => Number.isInteger(value) || "Enter whole runs",
          })} />
        </Field>
        <Field label="Wickets in last 5 overs" error={errors.wicketsLast5?.message}>
          <input type="number" min="0" max="10" placeholder="0–10" className="site-input" {...register("wicketsLast5", {
            required: "Enter wickets from the last five overs",
            valueAsNumber: true,
            min: { value: 0, message: "Minimum 0 wickets" },
            max: { value: 10, message: "Maximum 10 wickets" },
            validate: (value) => Number.isInteger(value) || "Enter whole wickets",
          })} />
        </Field>
      </div>

      <div className="flex items-center justify-between gap-3 rounded-xl bg-[#eef3ee] px-4 py-3 dark:bg-white/5">
        <div className="flex items-center gap-2 text-xs font-medium text-stadium-600 dark:text-pitch-light/60"><HiOutlineInformationCircle className="shrink-0 text-turf" size={18} />Current run rate</div>
        <span className="font-mono text-lg font-bold tabular-nums text-turf-dark dark:text-emerald-300">{currentRunRate}</span>
      </div>

      <button type="submit" disabled={!isValid || teamsClash || submitting} className="flex w-full items-center justify-center gap-2 rounded-full bg-ball py-3.5 font-bold text-white transition disabled:cursor-not-allowed disabled:opacity-40 enabled:hover:bg-ball-dark">
        <HiOutlineBolt size={20} />
        {submitting ? "Analyzing match conditions…" : "Predict final score"}
      </button>
    </form>
  );
}

function Field({ label, error, children }) {
  return <label className="block">
    <span className="mb-1.5 block text-xs font-semibold tracking-wide text-stadium-600 dark:text-pitch-light/65">{label}</span>
    {children}
    {error && <span className="mt-1 block text-xs font-medium text-ball">{error}</span>}
  </label>;
}
