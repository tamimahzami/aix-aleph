import React from "react";
export default function Loader() {
  return (
    <div className="p-10 flex items-center justify-center">
      <div className="animate-pulse text-[var(--color-ink-muted)]">Lade Inhalte…</div>
    </div>
  );
}
