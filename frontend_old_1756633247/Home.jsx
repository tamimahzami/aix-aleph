// src/pages/Home.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../i18n/I18nProvider"; // falls nicht vorhanden, bleibt der Fallback unten aktiv
import "./home.css";

export default function Home() {
  const { t } = useI18n ? useI18n() : { t: (k) => k }; // Fallback, falls kein Hook exportiert wird

  useEffect(() => {
    document.title = `AIX ALEPH • ${t("hero.title") || "Home"}`;
  }, [t]);

  return (
    <main className="landing">
      {/* HERO */}
      <section className="hero" id="home">
        {/* Overlay für Text-Kontrast */}
        <div className="hero-bg-overlay" aria-hidden="true" />

        <div className="container hero-grid">
          <div className="hero-content">
            <p className="kicker">AI × Industrie X — die intelligente Mobilitätsplattform</p>
            <h1>Industrie X trifft auf AI 🚀</h1>
            <p className="hero-sub">
              Ein Dashboard für alles: Ladeplanung, Routen, Sicherheit und Nachhaltigkeit –
              skaliert von Stadtwerken bis Parkhausnetz.
            </p>
            <div className="hero-actions">
              <Link to="/dashboard" className="btn cta large">Zum Dashboard</Link>
              <Link to="/dashboard-demo" className="btn outline large">Demo starten</Link>
            </div>
          </div>

          {/* Neutrales Hero Visual (SVG) */}
          <div className="hero-art" aria-hidden="true">
            <svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Neutrales Hero Visual">
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.9" />
                </linearGradient>
                <filter id="blur"><feGaussianBlur stdDeviation="20" /></filter>
              </defs>

              {/* weiche, organische Blobs */}
              <g filter="url(#blur)" opacity="0.55">
                <circle cx="160" cy="120" r="90" fill="url(#g1)" />
                <circle cx="420" cy="180" r="120" fill="#2563eb" />
                <circle cx="320" cy="300" r="80" fill="#22d3ee" />
              </g>

              {/* subtiles Grid */}
              <g stroke="#2563eb" strokeOpacity="0.15">
                {Array.from({ length: 8 }).map((_, i) => (
                  <line key={"h" + i} x1="40" y1={60 + i * 36} x2="560" y2={60 + i * 36} />
                ))}
                {Array.from({ length: 12 }).map((_, i) => (
                  <line key={"v" + i} x1={60 + i * 44} y1="40" x2={60 + i * 44} y2="360" />
                ))}
              </g>

              {/* kleine Karte */}
              <rect x="110" y="90" width="380" height="220" rx="18" fill="#fff" opacity="0.9" stroke="#2563eb" />
              <circle cx="180" cy="180" r="50" fill="#22d3ee" opacity="0.25" />
              <rect x="240" y="150" width="120" height="70" rx="10" fill="#2563eb" opacity="0.7" />
            </svg>
          </div>
        </div>
      </section>

      {/* FEATURES & CTA kannst du unten wieder einfügen, wenn du soweit bist */}
    </main>
  );
}
