import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TEAM_META } from "../constants/teams.js";

function useCountUp(target, duration = 900) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (target == null) return undefined;
    let start = null;
    let raf;

    const step = (timestamp) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return value;
}

export default function ResultCard({ result }) {
  const animatedScore = useCountUp(result?.prediction ?? null);

  if (!result) {
    return (
      <div className="glass-card flex h-full min-h-[220px] flex-col items-center justify-center gap-2 p-8 text-center">
        <p className="font-display text-2xl tracking-wide text-stadium-500 dark:text-pitch-light/40">
          Your prediction will light up here
        </p>
        <p className="text-sm text-stadium-500 dark:text-pitch-light/40">
          Fill in the match state on the left and hit Predict Score.
        </p>
      </div>
    );
  }

  const battingMeta = TEAM_META[result.battingTeam];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={result.timestamp}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="glass-card relative overflow-hidden p-8 shadow-glow"
      >
        <div className="absolute inset-0 bg-stadium-radial pointer-events-none" />
        <div className="relative flex flex-col items-center gap-4 text-center">
          <span
            className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest text-white"
            style={{ backgroundColor: battingMeta?.color ?? "#D62839" }}
          >
            {result.battingTeam} projected
          </span>

          <div className="font-mono text-7xl font-extrabold tabular-nums text-ball drop-shadow-sm sm:text-8xl">
            {animatedScore}
          </div>
          <p className="text-sm text-stadium-500 dark:text-pitch-light/60">
            Predicted final score after 20 overs
          </p>

          <div className="mt-2 grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
            <MiniStat label="Batting" value={TEAM_META[result.battingTeam]?.short ?? "—"} />
            <MiniStat label="Bowling" value={TEAM_META[result.bowlingTeam]?.short ?? "—"} />
            <MiniStat label="At" value={`${result.overs} ov`} />
            <MiniStat label="Score now" value={`${result.runs}/${result.wickets}`} />
          </div>

          <p className="text-[11px] text-stadium-400 dark:text-pitch-light/40">
            Predicted at {new Date(result.timestamp).toLocaleTimeString()}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function MiniStat({ label, value }) {
  return (
    <div className="rounded-xl bg-black/[0.03] px-3 py-2 dark:bg-white/5">
      <p className="text-[10px] uppercase tracking-wide text-stadium-500 dark:text-pitch-light/50">
        {label}
      </p>
      <p className="font-mono text-sm font-bold">{value}</p>
    </div>
  );
}
