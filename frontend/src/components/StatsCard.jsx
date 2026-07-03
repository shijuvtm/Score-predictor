import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function buildProjection(result) {
  // Simple, honest visual: interpolate current run-rate out to 20 overs,
  // then show the model's prediction as the final point. Not a second
  // model - purely illustrative of "where things are trending".
  const currentRunRate = result.runs / result.overs;
  const points = [];
  for (let over = 0; over <= 20; over += 1) {
    if (over <= result.overs) {
      points.push({ over, projected: Math.round(currentRunRate * over) });
    } else {
      const remainingOvers = 20 - result.overs;
      const remainingRuns = result.prediction - result.runs;
      const ratio = (over - result.overs) / remainingOvers;
      points.push({ over, projected: Math.round(result.runs + remainingRuns * ratio) });
    }
  }
  return points;
}

export default function StatsCard({ result }) {
  if (!result) {
    return (
      <div className="glass-card flex h-full min-h-[220px] items-center justify-center p-6 text-center text-sm text-stadium-500 dark:text-pitch-light/40">
        Charts will appear once you generate a prediction.
      </div>
    );
  }

  const projection = buildProjection(result);
  const comparison = [
    { name: "Current", value: result.runs },
    { name: "Predicted", value: result.prediction },
  ];

  return (
    <div className="glass-card grid gap-6 p-6 sm:grid-cols-2">
      <div>
        <h4 className="mb-2 text-sm font-semibold text-stadium-600 dark:text-pitch-light/70">
          Run projection
        </h4>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={projection}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
            <XAxis dataKey="over" tick={{ fontSize: 11 }} label={{ value: "Over", position: "insideBottom", offset: -4, fontSize: 10 }} />
            <YAxis tick={{ fontSize: 11 }} width={32} />
            <Tooltip formatter={(v) => [`${v} runs`, "Projected"]} labelFormatter={(l) => `Over ${l}`} />
            <Line type="monotone" dataKey="projected" stroke="#D62839" strokeWidth={2.5} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h4 className="mb-2 text-sm font-semibold text-stadium-600 dark:text-pitch-light/70">
          Current vs predicted
        </h4>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={comparison}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 11 }} width={32} />
            <Tooltip formatter={(v) => [`${v} runs`, "Score"]} />
            <Bar dataKey="value" fill="#F4C95D" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
