// src/pages/FleetLanding.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function FleetLanding() {
  return (
    <main className="min-h-screen bg-[color:var(--color-bg,#0b0e13)] text-[color:var(--color-ink,#e6edf3)]">
      {/* HERO */}
      <section className="relative">
        <div className="absolute inset-0 opacity-15"
             style={{background:
               "radial-gradient(70% 60% at 60% 30%, rgba(0,212,163,.30) 0%, transparent 60%)"}} />
        <div className="relative max-w-[1100px] mx-auto px-6 pt-18 md:pt-24 pb-12">
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight">
            Ihre Flotte, 20 % effizienter.
          </h1>
          <p className="mt-4 text-[color:var(--color-ink-muted,#8b95a5)] max-w-[70ch]">
            AIX Aleph steuert E-Busse, LKWs und Depots automatisch – Senkung der Kosten,
            pünktliche Umläufe, weniger Ausfälle.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/demo"
              className="inline-flex items-center rounded-xl px-4 py-2 font-semibold
                         bg-[color:var(--color-primary,#00d4a3)] text-black hover:opacity-90 transition"
            >
              Demo anfragen
            </Link>
            <Link
              to="/preise"
              className="inline-flex items-center rounded-xl px-4 py-2 font-semibold
                         border border-[color:var(--color-line,#1f242e)] hover:bg-[color:var(--color-surface,#141922)] transition"
            >
              Preise & Pakete
            </Link>
          </div>
        </div>
      </section>

      {/* SCHMERZ → LÖSUNG */}
      <section className="border-y border-[color:var(--color-line,#1f242e)]">
        <div className="max-w-[1100px] mx-auto px-6 py-12 grid md:grid-cols-3 gap-6">
          {[
            ["Zu hohe Stromkosten?", "Wir verschieben Ladefenster automatisch zu günstigeren Tarifen."],
            ["Umläufe im Stress?", "Optimierung nach SOC, Ladezeit und Fahrerplanung."],
            ["Ungeplante Ausfälle?", "Predictive Maintenance erkennt Probleme frühzeitig."]
          ].map(([t, d]) => (
            <article key={t} className="rounded-2xl p-5 bg-[color:var(--color-surface,#141922)]/60 border border-[color:var(--color-line,#1f242e)]">
              <h3 className="font-semibold">{t}</h3>
              <p className="mt-2 text-[color:var(--color-ink-muted,#8b95a5)]">{d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* FUNKTIONEN */}
      <section>
        <div className="max-w-[1100px] mx-auto px-6 py-12">
          <h2 className="text-2xl md:text-3xl font-extrabold">Was Sie bekommen</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {[
              ["Smart Charging", "Tarif-Peaks umgehen, Grid-Mix & CO₂-Ziele berücksichtigen."],
              ["Fleet Health", "Anomalien erkennen, Wartung triggern, Ausfälle minimieren."],
              ["Dispatch & Routen", "Policy-basiert – zuverlässig und planbar."]
            ].map(([t, d]) => (
              <div key={t} className="rounded-2xl p-5 bg-[color:var(--color-surface,#141922)]/60 border border-[color:var(--color-line,#1f242e)]">
                <h3 className="font-semibold">{t}</h3>
                <p className="mt-2 text-[color:var(--color-ink-muted,#8b95a5)]">{d}</p>
              </div>
            ))}
          </div>

          <ul className="mt-6 grid gap-3 md:grid-cols-3 text-sm">
            {[
              "–15 % Energiekosten/Monat",
              "+20 % Fahrzeugnutzung",
              "100 % Transparenz für Manager & Fahrer"
            ].map((b) => (
              <li key={b} className="rounded-xl px-4 py-3 bg-[color:var(--color-surface,#141922)]/60 border border-[color:var(--color-line,#1f242e)]">{b}</li>
            ))}
          </ul>

          <div className="mt-8 flex gap-3">
            <Link
              to="/kontakt"
              className="inline-flex items-center rounded-xl px-4 py-2 font-semibold
                         bg-[color:var(--color-primary,#00d4a3)] text-black hover:opacity-90 transition"
            >
              Gespräch vereinbaren
            </Link>
            <Link
              to="/tech/overview"
              className="inline-flex items-center rounded-xl px-4 py-2 font-semibold
                         border border-[color:var(--color-line,#1f242e)] hover:bg-[color:var(--color-surface,#141922)] transition"
            >
              Tech-Overview
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
