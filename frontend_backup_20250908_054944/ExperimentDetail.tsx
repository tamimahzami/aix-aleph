// wichtige Stelle ändern:
{exp.createdAt ? new Date(exp.createdAt).toLocaleString("de-DE") : "—"}

// bei Arm:
typeof a.initialSplit === "number" ? `${Math.round(a.initialSplit * 100)}%` : "—"

// bei Metric:
const label = m.name ?? m.key ?? "metric";
const when = m.timestamp ?? m.createdAt;
