// src/pages/Status.jsx
import React from "react";
import "../styles/page.css";

export default function Status() {
  return (
    <div className="page-container">
      {/* Hero */}
      <section className="page-hero">
        <h1>Systemstatus</h1>
        <p>Live Monitoring für Performance, Incidents und Kapazität.</p>
      </section>

      {/* Performance KPIs */}
      <section className="page-content card">
        <h2>Aktuelle Performance</h2>
        <ul className="kpis">
          <li>✅ Systemstatus: Normal</li>
          <li>🔄 Auslastung: 67%</li>
          <li>⏱️ Antwortzeit: 48 ms</li>
          <li>📊 Erfolgsrate: 99.98%</li>
        </ul>
      </section>

      {/* Letzte Incidents */}
      <section className="page-content card">
        <h2>Letzte Incidents</h2>
        <ul className="bullets">
          <li>12.03.2025 – 14:23: Auto-Scaling Event (+23% Load)</li>
          <li>10.03.2025 – 09:45: Model Update v2.3.1 deployed</li>
          <li>08.03.2025 – 03:12: Wartungsfenster (99.9% Availability)</li>
        </ul>
      </section>

      {/* Kapazität */}
      <section className="page-grid">
        <div className="card">
          <h3>📈 Erwartetes Wachstum</h3>
          <p className="muted">+15% pro Monat</p>
        </div>
        <div className="card">
          <h3>💾 Storage</h3>
          <p className="muted">2.4 TB von 5.0 TB genutzt</p>
        </div>
        <div className="card">
          <h3>🔌 Compute</h3>
          <p className="muted">84 von 128 Nodes aktiv</p>
        </div>
      </section>

      {/* Callout */}
      <section className="page-content card">
        <h2>Monitoring-Philosophie</h2>
        <p>
          AIX Aleph überwacht kontinuierlich alle Systemschichten – von Modellen über Datenpipelines
          bis zur Infrastruktur. So garantieren wir Transparenz, Resilienz und schnelle Reaktion
          auf Anomalien.
        </p>
      </section>
    </div>
  );
}
