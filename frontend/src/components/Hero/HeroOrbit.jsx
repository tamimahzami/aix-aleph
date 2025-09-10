// src/components/hero/HeroOrbit.jsx
import React from "react";

export default function HeroOrbit() {
  return (
    <section className="page-section">
      <div className="container-max" style={{maxWidth: "1100px", margin: "0 auto"}}>
        <div className="hero-wrap">
          {/* Hintergrund: feines Grid + Glow */}
          <div className="hero-bg-grid" aria-hidden="true" />
          <div className="hero-bg-glow" aria-hidden="true" />

          {/* Orbit */}
          <div className="orbit">
            <div className="orbit-ring r1">
              <span className="dot d1" />
            </div>
            <div className="orbit-ring r2">
              <span className="dot d2" />
            </div>
            <div className="orbit-ring r3">
              <span className="dot d3" />
            </div>
          </div>

          {/* Headline / CTA */}
          <div className="hero-copy card">
            <div className="eyebrow">AIX Aleph</div>
            <h1 className="hero-title">
              Operate AI like <span className="accent-text">Starcraft</span>
            </h1>
            <p className="hero-sub">
              Ein orchestriertes Control-Center für deine Agents, Workflows und
              Realtime-Daten. Schnell. Präzise. Ohne Magie – nur gutes Engineering.
            </p>

            <div className="hero-cta">
              <a className="btn btn-primary" href="/register">Jetzt starten</a>
              <a className="btn btn-ghost" href="/dashboard">Live-Demo</a>
            </div>

            <ul className="hero-bullets">
              <li>⏱ Realtime-Pipelines</li>
              <li>🧠 Multi-Agent Routing</li>
              <li>🔐 On-Prem / Cloud</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
