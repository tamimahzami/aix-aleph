import React from "react";

export default function Header({ isAuthed = false }: { isAuthed?: boolean }) {
  return (
    <header
      role="banner"
      className="sticky top-0 z-[1000] w-full"
      style={{
        background: "rgba(10,10,26,.92)",
        backdropFilter: "blur(7px)",
        borderBottom: "1px solid var(--color-line)",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 focusable" aria-label="AIX ALEPH Startseite">
          <svg viewBox="0 0 50 50" className="w-9 h-9" aria-hidden="true">
            <circle cx="25" cy="25" r="22" className="stroke-[3] fill-none" style={{ stroke: "var(--color-primary)" }} />
            <path d="M10 40 L25 10 L40 40" className="stroke-[3] fill-none" style={{ stroke: "var(--color-primary)" }} />
          </svg>
          <span className="text-white font-extrabold tracking-wide">AIX ALEPH</span>
        </a>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-2" aria-label="Primärnavigation">
          <a href="/" className="aix-link">Home</a>
          <a href="/world" className="aix-link">World</a>
          <a href="/login" className="aix-link">Login</a>
        </nav>

        {/* CTA / Auth */}
        <div className="flex items-center gap-2">
          {isAuthed ? (
            <a className="btn btn-ghost" href="/world">Dashboard</a>
          ) : (
            <a className="btn btn-primary font-extrabold" href="/login">Demo</a>
          )}
        </div>
      </div>
    </header>
  );
}
