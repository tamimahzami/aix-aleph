import React from "react";

export default function DarkModeToggle({ className="" }) {
  const [dark, setDark] = React.useState(() =>
    document.documentElement.classList.contains("dark") ||
    window.matchMedia?.("(prefers-color-scheme: dark)")?.matches
  );

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    // persist
    try { localStorage.setItem("themeDark", dark ? "1" : "0"); } catch {}
  }, [dark]);

  React.useEffect(() => {
    try {
      const v = localStorage.getItem("themeDark");
      if (v === "1") setDark(true);
      if (v === "0") setDark(false);
    } catch {}
  }, []);

  return (
    <button
      onClick={() => setDark(d => !d)}
      className={`rounded-xl border border-white/20 dark:border-white/10 bg-white/70 dark:bg-white/5 px-3 py-2 text-sm hover:shadow-soft transition ${className}`}
      aria-label="Toggle theme"
      title="Theme wechseln"
    >
      {dark ? "🌙" : "☀️"}
    </button>
  );
}
