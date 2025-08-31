import React from "react";
import "../styles/page.css";

export default function Costs() {
  return (
    <div className="page-container">
      <section className="page-hero">
        <h1>Transparente Kostenoptimierung</h1>
        <p>Messbar, nachvollziehbar, kontinuierlich optimiert.</p>
      </section>

      <section className="page-content card">
        <h2>März 2025 – Kostenaufschlüsselung</h2>
        <ul className="bullets">
          <li>Compute: €8.342 (65%)</li>
          <li>Storage: €1.234 (10%)</li>
          <li>Networking: €987 (8%)</li>
          <li>Licensing: €2.145 (17%)</li>
          <li><b>Gesamt: €12.708</b></li>
        </ul>
      </section>

      <section className="page-grid">
        <div className="card">
          <h3>Cost per Request</h3>
          <ul className="bullets">
            <li>Durchschnitt: €0.0021</li>
            <li>Min: €0.0008 (Batch)</li>
            <li>Max: €0.012 (Realtime)</li>
          </ul>
        </div>
        <div className="card">
          <h3>Optimierungserfolge</h3>
          <ul className="bullets">
            <li>Auto-Scaling: €2.340/Monat</li>
            <li>Model Right-Sizing: €1.560/Monat</li>
            <li>Spot-Instanzen: €890/Monat</li>
          </ul>
        </div>
        <div className="card">
          <h3>Prognose</h3>
          <p>April 2025: <b>€11.200</b> (−12%)</p>
        </div>
      </section>
    </div>
  );
}
