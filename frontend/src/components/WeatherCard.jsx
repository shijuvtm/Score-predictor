import { motion } from "framer-motion";
import { WiHumidity, WiStrongWind, WiBarometer, WiDaySunny } from "react-icons/wi";
import { HiOutlineExclamationTriangle, HiOutlineArrowPath } from "react-icons/hi2";
import LoadingSpinner from "./LoadingSpinner.jsx";

export default function WeatherCard({ weather, status, error, onRetry }) {
  if (status === "idle") {
    return (
      <div className="glass-card flex h-full items-center justify-center p-6 text-center text-sm text-stadium-500 dark:text-pitch-light/50">
        Pick a city to see live conditions here.
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div className="glass-card flex h-full items-center justify-center p-6">
        <LoadingSpinner label="Fetching weather" />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="glass-card flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
        <HiOutlineExclamationTriangle className="text-ball" size={28} />
        <p className="text-sm text-stadium-600 dark:text-pitch-light/70">{error}</p>
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 rounded-full bg-ball px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-ball-dark"
        >
          <HiOutlineArrowPath /> Retry
        </button>
      </div>
    );
  }

  if (!weather) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card flex h-full flex-col justify-between p-6"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-stadium-500 dark:text-pitch-light/50">
            Conditions in
          </p>
          <h3 className="font-display text-3xl tracking-wide">{weather.city}</h3>
          <p className="text-sm capitalize text-stadium-500 dark:text-pitch-light/60">
            {weather.description}
          </p>
        </div>
        <div className="flex flex-col items-end">
          <WiDaySunny className="text-flood" size={44} />
          <span className="font-mono text-3xl font-bold">{weather.temperature}°C</span>
        </div>
      </div>

      <div className="stitch-divider my-4 opacity-40" />

      <div className="grid grid-cols-3 gap-3 text-center">
        <Stat icon={<WiHumidity size={26} />} label="Humidity" value={`${weather.humidity}%`} />
        <Stat
          icon={<WiStrongWind size={26} />}
          label="Wind"
          value={`${weather.wind_speed} m/s`}
        />
        <Stat
          icon={<WiBarometer size={26} />}
          label="Pressure"
          value={`${weather.pressure} hPa`}
        />
      </div>
    </motion.div>
  );
}

function Stat({ icon, label, value }) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-xl bg-black/[0.03] py-3 dark:bg-white/5">
      <span className="text-flood-dark dark:text-flood">{icon}</span>
      <span className="font-mono text-sm font-semibold">{value}</span>
      <span className="text-[10px] uppercase tracking-wide text-stadium-500 dark:text-pitch-light/50">
        {label}
      </span>
    </div>
  );
}
