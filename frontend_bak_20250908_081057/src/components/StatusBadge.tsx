import type { ExperimentStatus } from "../types";

const MAP: Record<ExperimentStatus, { bg: string; dot: string; label: string }> = {
  DRAFT:     { bg: "bg-slate-100 text-slate-700", dot: "bg-slate-500", label: "Draft" },
  RUNNING:   { bg: "bg-emerald-100 text-emerald-700", dot: "bg-emerald-500", label: "Running" },
  COMPLETED: { bg: "bg-indigo-100 text-indigo-700", dot: "bg-indigo-500", label: "Completed" },
  CANCELLED: { bg: "bg-rose-100 text-rose-700", dot: "bg-rose-500", label: "Cancelled" }
};

export default function StatusBadge({ status }: { status: ExperimentStatus }) {
  const s = MAP[status];
  return (
    <span className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-xl text-xs font-medium ${s.bg}`}>
      <span className={`inline-block w-2 h-2 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}
