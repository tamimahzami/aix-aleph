import React from "react";
import { Link } from "react-router-dom";

export default function HeartbeatHeroNew() {
  return (
    <header className="relative overflow-hidden py-16 md:py-20">
      <div className="absolute inset-0 bg-hero-gradient pointer-events-none" />
      <div className="relative z-10 max-w-[1100px] mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--blurple)] text-white">♥</span>
          <span className="text-sm text-muted">Human ♥ Computing</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Das Betriebssystem für Mobilität
        </h1>
        <p className="mt-3 max-w-[70ch] text-[var(--color-ink-muted)]">
          AIX ALEPH orchestriert Flotten, Energie & Prozesse in Echtzeit – erklärbar, auditierbar, produktionsreif.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link className="btn btn-primary" to="/demo">Demo starten</Link>
          <Link className="btn btn-ghost" to="/tech/overview">Technologie &rarr;</Link>
        </div>
      </div>
    </header>
  );
}
