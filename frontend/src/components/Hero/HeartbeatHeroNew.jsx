// src/components/Hero/HeartbeatHeroNew.jsx
import React from "react";
import { Link } from "react-router-dom";
import LiveKPITicker from "../KPI/LiveKPITicker.jsx";  // ⟵ NEU

// ... dein bestehender Code (useHeartbeat, HeartbeatHeroNew, HeartPulse, WaveDivider)

export default function HeartbeatHeroNew() {
  return (
    <section
      className="relative bg-hero-gradient overflow-hidden"
      aria-label="AIX ALEPH – Human ♥ Computing"
    >
      {/* ... unverändert ... */}

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-20 lg:py-28">
        {/* Herz-Emblem */}
        <div className="mx-auto flex items-center justify-center">
          <HeartPulse periodMs={1800} />
        </div>

        {/* Headline, Copy, CTAs */}
        <div className="mt-8 text-center">
          {/* ... unverändert (h1, p, CTA-Leiste) ... */}

          {/* Sub-Points */}
          <ul className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-[var(--color-ink-muted)]">
            <li className="panel p-4">E-Depot Orchestrierung – tarif- & emissionsoptimiert</li>
            <li className="panel p-4">Flottensteuerung – Gesundheit, Routen, Uptime</li>
            <li className="panel p-4">Ladeinfrastruktur – Vorhersage, Wartung, Policies</li>
          </ul>

          {/* ⟵ NEU: Live KPI Ticker (beat-synchron) */}
          <LiveKPITicker beatMs={1800} />
        </div>
      </div>

      <WaveDivider />
    </section>
  );
}
