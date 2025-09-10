// src/pages/About.jsx
import React from "react";
import ContainerMax from "../components/common/ContainerMax.jsx";

export default function About() {
  return (
    <section className="page-section">
      <ContainerMax>
        {/* Zweispaltiges Layout (responsive via CSS Grid) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "2rem",
            alignItems: "center",
          }}
        >
          {/* Linke Spalte: Text */}
          <div className="break-any">
            <h1
              className="accent-text"
              style={{
                fontSize: "2rem",
                lineHeight: "2.5rem",
                fontWeight: 800,
                letterSpacing: "-0.01em",
              }}
            >
              Human Heartbeat ×{" "}
              <span style={{ color: "var(--primary)" }}>AI Heartbit</span>
            </h1>

            <p className="muted" style={{ marginTop: "0.75rem", maxWidth: "65ch" }}>
              AIX Aleph ist mehr als Technologie – es ist die Verschmelzung von
              menschlichem Herzschlag und künstlichem Herzbit. Unser Ziel: die
              Komplexität der E-Mobilität in Klarheit und Vertrauen zu verwandeln.
            </p>

            <h2 style={{ marginTop: "1.5rem", fontSize: "1.5rem", fontWeight: 700 }}>
              Unsere Vision
            </h2>
            <p className="muted" style={{ marginTop: "0.5rem", maxWidth: "65ch" }}>
              Wir bauen eine Mobilität, die <strong>funktioniert</strong>,{" "}
              <strong>nachhaltig</strong> ist und <strong>Menschen entlastet</strong>.
              KI arbeitet im Hintergrund – plant, balanciert, schützt – damit wir uns
              auf die Fahrt konzentrieren können.
            </p>

            <h2 style={{ marginTop: "1.5rem", fontSize: "1.5rem", fontWeight: 700 }}>
              Warum jetzt
            </h2>
            <p className="muted" style={{ marginTop: "0.5rem", maxWidth: "65ch" }}>
              Reichweite, Ladeinfrastruktur, Flottenbetrieb: Wo heute Unsicherheit ist,
              schafft AIX Aleph verlässliche Entscheidungen – transparent, auditierbar,
              menschzentriert.
            </p>

            <p
              style={{
                marginTop: "2rem",
                fontWeight: 600,
                color: "var(--primary)",
              }}
            >
              AIX Aleph — Human ♥ Computing.
            </p>
          </div>

          {/* Rechte Spalte: Engine / Heartbit Button */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <EngineButton />
          </div>
        </div>
      </ContainerMax>
    </section>
  );
}

/** Pulsierender Start-Button – komplett inline gestylt, keine externen Utilities */
function EngineButton() {
  const size = 260;
  return (
    <div
      className="card"
      style={{
        position: "relative",
        height: size,
        width: size,
        borderRadius: "9999px",
        background: "var(--ui)",
        display: "grid",
        placeItems: "center",
        overflow: "hidden",
      }}
      aria-label="Engine starten"
      title="Engine starten"
    >
      {/* weicher Glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: "-16px",
          borderRadius: "inherit",
          background:
            "radial-gradient(60% 60% at 50% 50%, color-mix(in oklab, var(--primary) 70%, transparent) 0%, transparent 70%)",
          filter: "blur(24px)",
          opacity: 0.6,
          pointerEvents: "none",
        }}
      />

      {/* konzentrische Linien */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          boxShadow: `inset 0 0 0 1px var(--line)`,
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: "10px",
          borderRadius: "inherit",
          boxShadow: `inset 0 0 0 1px color-mix(in oklab, var(--primary) 40%, var(--line))`,
          opacity: 0.6,
        }}
      />

      {/* Buttonfläche */}
      <button
        type="button"
        className="btn btn-primary"
        style={{
          height: size - 36,
          width: size - 36,
          borderRadius: "9999px",
          boxShadow: "0 10px 30px rgba(0,0,0,.35)",
          position: "relative",
          background:
            "radial-gradient(45% 45% at 50% 40%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.0) 40%), conic-gradient(from 220deg, rgba(255,255,255,.18), rgba(255,255,255,0) 30%)",
          border: "1px solid color-mix(in oklab, var(--primary) 35%, var(--line))",
          display: "grid",
          placeItems: "center",
        }}
        onClick={() => (window.location.href = "/demo")}
      >
        {/* innerer Kern */}
        <span
          aria-hidden
          style={{
            position: "absolute",
            inset: "26px",
            borderRadius: "9999px",
            background:
              "radial-gradient(55% 55% at 50% 45%, color-mix(in oklab, var(--primary) 80%, white 5%) 0%, transparent 70%)",
            boxShadow: "inset 0 0 30px rgba(255,255,255,0.08)",
            border: "1px solid color-mix(in oklab, var(--primary) 30%, transparent)",
            animation: "pulseKern 2s ease-in-out infinite",
          }}
        />

        {/* Icon + Label */}
        <span style={{ position: "relative", zIndex: 2, display: "grid", placeItems: "center" }}>
          <svg width="84" height="84" viewBox="0 0 84 84" aria-hidden>
            <circle
              cx="42"
              cy="42"
              r="30"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              style={{ color: "color-mix(in oklab, var(--primary) 80%, white 0%)" }}
            />
            <path
              d="M45 18 L30 44 h12 l-3 22 L54 38 H42 Z"
              fill="currentColor"
              style={{ color: "var(--primary)", opacity: 0.95 }}
            />
          </svg>
          <span
            style={{
              marginTop: "0.5rem",
              fontSize: "0.85rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "color-mix(in oklab, var(--primary) 90%, white 0%)",
            }}
          >
            Start
          </span>
        </span>
      </button>

      {/* einfache Keyframes lokal inline anhängen */}
      <style>{`
        @keyframes pulseKern {
          0%   { transform: scale(1);   opacity: .9; }
          50%  { transform: scale(1.03); opacity: 1;  }
          100% { transform: scale(1);   opacity: .9; }
        }
      `}</style>
    </div>
  );
}
