import React from "react";

export default function Landing() {
  return (
    <main>
      {/* ===== HERO ===== */}
      <section className="bg-hero-gradient">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16 md:py-24">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <div className="inline-flex items-center gap-2 chip chip-on sticker">
                <span className="w-2 h-2 rounded-full" style={{ background: "var(--color-primary)" }} />
                Next-Gen e-Mobility · AI Agents
              </div>

              <h1 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight">
                Deine Flotte, <span className="neon">vernetzt in Echtzeit</span>
              </h1>
              <p className="mt-4 text-lg text-muted max-w-[60ch]">
                AIX Aleph orchestriert Ladepunkte, E-Flotten und Depots mit KI-Agenten.
                Effizient, auditierbar und global skalierbar – von Berlin bis Singapur.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a className="btn btn-primary neon" href="/world">Demo starten</a>
                <a className="btn btn-ghost" href="/pitch-deck/">Pitch Deck ansehen</a>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted">
                <span className="chip">⚡ Smart Charging</span>
                <span className="chip">🌍 Globale Karte</span>
                <span className="chip">🧠 Agent-Automatisierung</span>
              </div>
            </div>

            {/* Deko-Panel */}
            <div className="panel elev rounded-[var(--radius-xl)] p-6">
              <div className="text-sm text-muted">Live KPI (Beispiel)</div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {[
                  { label: "Gesparte tCO₂ (24h)", val: "12.4k" },
                  { label: "Charging Sessions", val: "78,122" },
                  { label: "Uptime Fleet", val: "98.2%" },
                  { label: "Kosten / 100 km", val: "€ 19.4" },
                ].map((k) => (
                  <div key={k.label} className="kpi">
                    <h4>{k.label}</h4>
                    <div className="val mt-1">{k.val}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-sm text-muted">
                * Demo-Daten. Echtzeit-Feeds via API anbindbar.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="py-14">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-extrabold">Was AIX Aleph einzigartig macht</h2>
          <p className="mt-2 text-muted max-w-[70ch]">
            Von der Semantik bis zur Ausführung: Ein Stack, der Flotten, Energie und Prozesse verbindet.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                t: "E-Depot Orchestrierung",
                d: "Planung, Laderampen, Energiepreise – automatisch balanciert.",
                b: "Mehr erfahren",
                to: "/e-depot/",
              },
              {
                t: "Flottensteuerung",
                d: "Gesundheit, Routen, Uptime und Kosten im Griff – global.",
                b: "Mehr erfahren",
                to: "/flottensteuerung/",
              },
              {
                t: "Ladeinfrastruktur",
                d: "Tarife, Auslastung, Wartung und Ausfälle vorausschauend steuern.",
                b: "Mehr erfahren",
                to: "/ladeinfrastruktur/",
              },
              {
                t: "KI-Agenten",
                d: "Autonome Agenten verhandeln, priorisieren und reporten – auditierbar.",
                b: "Mehr erfahren",
                to: "/technologie/",
              },
            ].map((f) => (
              <div key={f.t} className="panel p-5">
                <h3 className="font-semibold">{f.t}</h3>
                <p className="mt-2 text-muted">{f.d}</p>
                <a className="btn btn-ghost mt-4" href={f.to}>{f.b}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== USE CASES ===== */}
      <section className="py-14 bg-surface">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-extrabold">Use Cases – von heute, nicht 2035</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                t: "ÖPNV E-Bus",
                d: "Ladefenster & Umläufe: Energiepreise, Depot-Kapazität, SOC – automatisch optimiert.",
              },
              {
                t: "Smart Charging",
                d: "Tarif-Peaks umgehen, Grid-Mix berücksichtigen, CO₂-Ziele einhalten.",
              },
              {
                t: "Fleet Health",
                d: "Anomalien erkennen, Wartung triggern, Ausfälle minimieren.",
              },
            ].map((u) => (
              <div key={u.t} className="panel p-5">
                <h3 className="font-semibold">{u.t}</h3>
                <p className="mt-2 text-muted">{u.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="py-16 bg-final-cta">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold">Bereit für die echte Demo?</h2>
          <p className="mt-3 text-muted">
            Starte mit der Weltkarte, spiele Szenarien durch – oder lade unser Pitch Deck.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <a className="btn btn-primary neon" href="/world">Jetzt Demo öffnen</a>
            <a className="btn btn-ghost" href="/pitch-deck/">Pitch Deck</a>
          </div>
        </div>
      </section>
    </main>
  );
}
