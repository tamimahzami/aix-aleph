import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-10 space-y-6">
      <header className="text-center space-y-3">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
          AIX ALEPH — Human <span className="text-[var(--color-primary)]">♥</span> Computing
        </h1>
        <p className="text-muted max-w-[70ch] mx-auto">
          Das erste Betriebssystem für Mobilität – frisch, klar, auditierbar.
        </p>
      </header>

      <div className="flex flex-wrap justify-center gap-3">
        <Link to="/experiments" className="btn btn-primary">Experiments</Link>
        <Link to="/professors" className="btn btn-ghost">Professors</Link>
        <Link to="/settings" className="btn btn-ghost">Settings</Link>
      </div>

      <ul className="grid sm:grid-cols-3 gap-3">
        <li className="panel p-4">E-Depot Orchestrierung</li>
        <li className="panel p-4">Flottensteuerung</li>
        <li className="panel p-4">Lade-Policies & Vorhersage</li>
      </ul>
    </section>
  );
}
