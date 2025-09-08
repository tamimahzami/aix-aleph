// src/components/common/Spinner.jsx
import React from "react";

export default function Spinner({ label = "Laden…" }) {
  return (
    <div className="inline-flex items-center gap-2 text-sm text-[var(--color-ink-muted)]">
      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4A4 4 0 008 12H4z"/>
      </svg>
      <span>{label}</span>
    </div>
  );
}
