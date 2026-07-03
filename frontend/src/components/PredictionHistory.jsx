import { useMemo, useState } from "react";
import { HiOutlineTrash, HiOutlineMagnifyingGlass, HiOutlineXMark } from "react-icons/hi2";
import { TEAM_META } from "../constants/teams.js";

export default function PredictionHistory({ history, onDelete, onClearAll }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return history;
    const q = query.toLowerCase();
    return history.filter(
      (item) =>
        item.battingTeam.toLowerCase().includes(q) || item.bowlingTeam.toLowerCase().includes(q)
    );
  }, [history, query]);

  return (
    <div className="glass-card p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-display text-2xl tracking-wide">Prediction History</h3>
        {history.length > 0 && (
          <button
            type="button"
            onClick={onClearAll}
            className="inline-flex items-center gap-1.5 rounded-full border border-ball/40 px-3 py-1.5 text-xs font-semibold text-ball transition hover:bg-ball hover:text-white"
          >
            <HiOutlineTrash size={14} /> Clear all
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <p className="py-6 text-center text-sm text-stadium-500 dark:text-pitch-light/50">
          No predictions yet. Your saved match states will show up here, stored right in this
          browser.
        </p>
      ) : (
        <>
          <div className="relative mb-4">
            <HiOutlineMagnifyingGlass
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-stadium-400"
              size={16}
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by team..."
              className="w-full rounded-full border border-black/10 bg-transparent py-2 pl-9 pr-4 text-sm outline-none focus:border-ball dark:border-white/10"
            />
          </div>

          <div className="max-h-80 space-y-2 overflow-y-auto pr-1">
            {filtered.length === 0 ? (
              <p className="py-4 text-center text-sm text-stadium-500 dark:text-pitch-light/50">
                No matches found for &ldquo;{query}&rdquo;.
              </p>
            ) : (
              filtered.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-xl bg-black/[0.03] px-4 py-3 text-sm dark:bg-white/5"
                >
                  <div>
                    <p className="font-semibold">
                      {TEAM_META[item.battingTeam]?.short ?? item.battingTeam} vs{" "}
                      {TEAM_META[item.bowlingTeam]?.short ?? item.bowlingTeam}
                    </p>
                    <p className="text-xs text-stadium-500 dark:text-pitch-light/50">
                      {item.runs}/{item.wickets} at {item.overs} ov &middot;{" "}
                      {new Date(item.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-lg font-bold text-ball">
                      {item.prediction}
                    </span>
                    <button
                      type="button"
                      onClick={() => onDelete(item.id)}
                      aria-label="Delete this prediction"
                      className="text-stadium-400 transition hover:text-ball"
                    >
                      <HiOutlineXMark size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}
