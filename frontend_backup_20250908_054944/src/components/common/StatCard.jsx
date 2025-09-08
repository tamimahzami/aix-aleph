// src/components/common/StatCard.jsx
import React from "react";

export default function StatCard({ label, value, hint }) {
  return (
    <div className="panel p-5 rounded-2xl bg-[var(--color-surface)] ring-1 ring-[var(--color-line)]">
      <div className="text-sm text-muted">{label}</div>
      <div className="mt-2 text-3xl font-extrabold">{value}</div>
      {hint ? <div className="mt-1 text-xs text-muted">{hint}</div> : null}
    </div>
  );
}
