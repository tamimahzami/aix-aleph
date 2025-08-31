/** @jsxImportSource react */
// src/pages/DashboardDemo.jsx
import React from "react";
import "../styles/page.css";
import TinyBars from "../components/charts/TinyBars";

export default function DashboardDemo() {
  // Fake-Daten (ersetzbar durch API später)
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const fleetUtil = hours.map(h => 62 + Math.round(18 * Math.sin(h / 3) + Math.random() * 8)); // %
  const energyKWh = hours.map(h => 180 + Math.round(70 * Math.cos(h / 2) + Math.random() * 30));

  return (
    <div className="page">
      <section className="page-hero">
        <h1>Dashboard Demo</h1>
        <p className="muted">Interaktive Vorschau der wichtigsten Widgets.</p>
      </section>

      <section className="grid cols-2">
        <div className="card">
          <h3 style={{ marginTop: 0 }}>Fleet Utilization</h3>
          <TinyBars data={fleetUtil} width={280} height={80} />
        </div>

        <div className="card">
          <h3 style={{ marginTop: 0 }}>Energy &amp; Charging</h3>
          <TinyBars data={energyKWh} width={280} height={80} />
        </div>
      </section>
    </div>
  );
}
