// src/pages/Landing.jsx
import React from "react";
import { Link } from "react-router-dom";
import ContainerMax from "../components/common/ContainerMax.jsx";

export default function Landing() {
  const kpis = [
    { value: "▲ 12%", label: "Uptime" },
    { value: "-18%", label: "Ladekosten" },
    { value: "-27%", label: "Ausfälle" },
  ];

  const features = [
    {
      title: "Smart Charging",
      desc: "Tarif-Optimierung, Peak-Shaving, CO₂-Ziele – automatisch ausbalanciert.",
    },
    {
      title: "Flottensteuerung",
      desc: "Gesundheit, Routen, Uptime & Alerts – in einem konsistenten Modell.",
    },
    {
      title: "E-Depot Orchestrierung",
      desc: "Laderampen, Energiepreise, Schichten & Reserven präzise geplant.",
    },
  ];

  return (
    <>
      {/* HERO */}
      <section className="page-section" style={{ position: "relative", overflow: "hidden" }}>
        {/* Dezent: Soft-Glow Background */}
        <div aria-hidden style={{ pointerEvents: "none" }}>
          <div
            style={{
              position: "absolute",
              top: "-160px",
              left: "50%",
              height: "24rem",
              width: "110rem",
              transform: "translateX(-50%)",
              borderRadius: "9999px",
              background: "color-mix(in oklab, var(--primary) 18%, transparent)",
              filter: "blur(100px)",
              opacity: 0.55,
            }}
          />
        </div>

        <ContainerMax>
          <div className="card">
            {/* 2-Spalten-Layout ohne Tailwind-Breakpoints */}
            <div
              className="break-any"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "1.25rem",
              }}
            >
              {/* Linke Spalte: Copy */}
              <div>
                <h1 className="text-3xl font-extrabold accent-text">
                  Das Betriebssystem für Mobilität
                </h1>

                <p className="mt-2 muted" style={{ maxWidth: "65ch" }}>
                  Von der Semantik bis zur Ausführung: Orchestrierung von Flotten, Energie und
                  Prozessen – sicher, auditierbar, menschzentriert.
                </p>

                <div className="mt-6" style={{ display: "flex", gap: ".75rem", flexWrap: "wrap" }}>
                  <button
                    className="btn btn-primary"
                    onClick={() => (window.location.href = "/demo")}
                    aria-label="Demo starten"
                  >
                    Demo starten
                  </button>
                  <Link to="/dashboard" className="btn">
                    Zum Dashboard
                  </Link>
                  <Link to="/plan" className="btn btn-ghost">
                    Plan
                  </Link>
                </div>

                {/* Trust-Stripes */}
                <div
                  className="mt-8"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                    gap: ".75rem",
                  }}
                >
                  {[
                    ["99.97%", "Fleet Uptime"],
                    ["-28%", "Ladekosten"],
                    ["< 3min", "Scheduling-Latenz"],
                    ["ISO 27001", "Security Ready"],
                  ].map(([v, l]) => (
                    <div key={l} className="card">
                      <div className="text-xl font-semibold">{v}</div>
                      <div className="muted">{l}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rechte Spalte: KPI Panel */}
              <div className="panel">
                <div className="text-sm muted">Live KPI</div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                    gap: ".75rem",
                    marginTop: ".75rem",
                  }}
                >
                  {kpis.map(({ value, label }) => (
                    <div
                      key={label}
                      className="rounded-xl"
                      style={{
                        border: "1px solid var(--line)",
                        padding: "1rem",
                        textAlign: "center",
                      }}
                    >
                      <div className="text-xl font-semibold accent-text">{value}</div>
                      <div className="muted text-sm" style={{ marginTop: ".25rem" }}>
                        {label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ContainerMax>
      </section>

      {/* FEATURES */}
      <section className="page-section">
        <ContainerMax>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: "1rem",
            }}
          >
            {features.map(({ title, desc }) => (
              <div key={title} className="card" style={{ height: "100%" }}>
                <h3 className="font-semibold">{title}</h3>
                <p className="muted mt-1">{desc}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div
            className="mt-8"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <p className="muted">
              Forschung & Validierung willkommen: Wir öffnen Telemetrie-Schnittstellen,
              Simulations-Fixtures und Audit-Trails.
            </p>
            <div style={{ display: "flex", gap: ".75rem" }}>
              <Link to="/preise" className="btn btn-ghost">
                Preise & Lizenzen
              </Link>
              <Link to="/plan" className="btn">
                Kooperations-Call
              </Link>
            </div>
          </div>
        </ContainerMax>
      </section>
    </>
  );
}
