import { Link } from "react-router-dom";
import type { Experiment } from "../types";
import StatusBadge from "./StatusBadge";

export default function ExperimentCard({ e }: { e: Experiment }) {
  const latestMetric = (e.metrics || [])[0];
  const label = latestMetric?.name || latestMetric?.key || "—";
  const when = latestMetric?.timestamp || latestMetric?.createdAt;
  const whenStr = when ? new Date(when).toLocaleString("de-DE") : "—";

  const arms = e.arms || [];
  const splits = arms.map(a =>
    typeof a.initialSplit === "number"
      ? `${a.name}: ${Math.round(a.initialSplit * 100)}%`
      : `${a.name}: —`
  ).join(" · ");

  return (
    <Link to={`/experiments/${e.id}`} className="block rounded-2xl border p-4 hover:bg-slate-50 dark:hover:bg-slate-800">
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold">{e.name}</h3>
        <StatusBadge status={e.status} />
      </div>
      {e.description && (
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{e.description}</p>
      )}
      <div className="mt-3 text-sm text-slate-500">
        <div>Splits: {splits || "—"}</div>
        <div>Latest metric: {label} @ {whenStr}</div>
      </div>
    </Link>
  );
}
