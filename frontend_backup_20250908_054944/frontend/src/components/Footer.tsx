import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/10 bg-[#070b13]">
      <div className="mx-auto max-w-7xl px-4 py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="text-sm text-white/70">© {year} AIX ALEPH – Human ♥ Computing</div>
        <div className="flex items-center gap-3">
          <span className="sr-only">Heartbeat</span>
          <span
            className="relative inline-block h-3 w-3 rounded-full bg-[var(--color-primary)]"
            style={{ boxShadow: "0 0 0 4px rgba(88,101,242,.2)" }}
          >
            <span
              className="absolute inset-0 rounded-full"
              style={{
                animation: "aix-pulse 1.8s ease-out infinite",
                background: "rgba(88,101,242,.45)",
                filter: "blur(2px)",
              }}
            />
          </span>
          <span className="text-xs text-white/60">AI Heartbeat online</span>
        </div>
      </div>
    </footer>
  );
}
