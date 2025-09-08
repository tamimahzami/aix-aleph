import React from "react";
import { Link } from "react-router-dom";

import HeartbeatHeroNew from "../components/Hero/HeartbeatHeroNew.jsx";
import GeminiAgent from "../components/agent/GeminiAgent.jsx";
export default function Landing() {
  return (
    <>
      {/* Neuer Hero */}
      <HeartbeatHeroNew />

      {/* ===== FEATURES ===== */}
      <section className="py-14">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-extrabold">Was AIX Aleph einzigartig macht</h2>
          <p className="mt-2 text-muted max-w-[70ch]">
            Von der Semantik bis zur Ausführung: Ein Stack, der Flotten, Energie und Prozesse verbindet.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { t: "E-Depot Orchestrierung", d: "Planung, Laderampen, Energiepreise – automatisch balanciert.", to: "/info/e-depot" },
              { t: "Flottensteuerung", d: "Gesundheit, Routen, Uptime und Kosten im Griff – global.", to: "/info/flottensteuerung" },
              { t: "Ladeinfrastruktur", d: "Tarife, Auslastung, Wartung und Ausfälle vorausschauend steuern.", to: "/info/ladeinfrastruktur" },
              { t: "Tech-Overview", d: "Agenten, Policies, API – transparent & auditierbar.", to: "/tech/overview" },
            ].map((f) => (
              <div key={f.t} className="panel p-5 transition-transform hover:-translate-y-0.5">
                <h3 className="font-semibold">{f.t}</h3>
                <p className="mt-2 text-muted">{f.d}</p>
                <Link className="btn btn-ghost mt-4" to={f.to}>Mehr erfahren</Link>
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
              { t: "ÖPNV E-Bus", d: "Ladefenster & Umläufe: Energiepreise, Depot-Kapazität, SOC – automatisch optimiert." },
              { t: "Smart Charging", d: "Tarif-Peaks umgehen, Grid-Mix berücksichtigen, CO₂-Ziele einhalten." },
              { t: "Fleet Health", d: "Anomalien erkennen, Wartung triggern, Ausfälle minimieren." },
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
            Starte mit der Weltkarte, spiele Szenarien durch – oder öffne das Live-Dashboard.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link className="btn btn-primary neon" to="/demo">Jetzt Demo öffnen</Link>
            <Link className="btn btn-ghost" to="/dashboard">Zum Dashboard</Link>
          </div>
        </div>
      </section>

      {/* Interaktiver Agent (floating) */}
      <GeminiAgent />
    </>
  );
}
