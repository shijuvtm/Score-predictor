import { HiOutlineCloud, HiOutlineMapPin } from "react-icons/hi2";

export default function WeatherCard({ weather, city, loading, error }) {
  return (
    <section className="site-card p-5 sm:p-6" aria-live="polite">
      <div className="flex items-center gap-2 text-ball">
        <HiOutlineCloud size={20} />
        <h2 className="font-display text-2xl tracking-wide">City weather</h2>
      </div>

      {loading ? (
        <p className="mt-4 text-sm text-stadium-500 dark:text-pitch-light/60">
          Fetching weather for {city}…
        </p>
      ) : error ? (
        <p className="mt-4 text-sm text-ball" role="alert">{error}</p>
      ) : weather ? (
        <>
          <div className="mt-4 flex items-start justify-between gap-4">
            <div>
              <p className="flex items-center gap-1 text-sm font-semibold text-stadium-600 dark:text-pitch-light/70">
                <HiOutlineMapPin /> {weather.city}
              </p>
              <p className="mt-2 font-display text-3xl">{weather.temperature}°C</p>
              <p className="mt-1 text-sm capitalize text-stadium-500 dark:text-pitch-light/60">
                {weather.description}
              </p>
            </div>
            <span className="rounded-full bg-turf/10 px-3 py-1 text-xs font-bold text-turf-dark dark:text-emerald-300">
              {weather.condition}
            </span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <WeatherStat label="Humidity" value={`${weather.humidity}%`} />
            <WeatherStat label="Wind" value={`${weather.wind_speed} m/s`} />
          </div>
        </>
      ) : (
        <p className="mt-3 text-sm text-stadium-500 dark:text-pitch-light/60">
          {city.trim()
            ? "Weather will appear here when the city lookup completes."
            : "Choose a city in the match setup to see its weather."}
        </p>
      )}
    </section>
  );
}

function WeatherStat({ label, value }) {
  return (
    <div className="rounded-xl bg-black/[0.03] px-3 py-2 dark:bg-white/5">
      <p className="text-[10px] uppercase tracking-wide text-stadium-500 dark:text-pitch-light/50">
        {label}
      </p>
      <p className="font-mono text-sm font-bold">{value}</p>
    </div>
  );
}
