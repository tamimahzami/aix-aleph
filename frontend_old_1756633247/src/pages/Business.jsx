import React from "react";
import "../styles/page.css";

export default function Business() {
  return (
    <div className="page-container">
      <section className="page-hero">
        <h1>Wirtschaftliche Vorteile</h1>
        <p>ROI-Transparenz, echte Use Cases und klare Preismodelle.</p>
      </section>

      <section className="page-content card">
        <h2>ROI-Berechnung</h2>
        <p><b>Typische Einsparungen pro 100.000 Inference-Requests</b></p>
        <ul className="bullets">
          <li>Traditionell: ~€4.200</li>
          <li>Mit AIX Aleph: ~€2.300</li>
          <li>➡️ <b>45% Kosteneffizienzsteigerung</b></li>
        </ul>
      </section>

      <section className="page-grid">
        <div className="card">
          <h3>🏭 Smart Manufacturing</h3>
          <ul className="bullets">
            <li>30% weniger Produktionsausfälle</li>
            <li>25% schnellere Fehlererkennung</li>
          </ul>
        </div>
        <div className="card">
          <h3>⚡ Energieoptimierung</h3>
          <ul className="bullets">
            <li>18% niedrigere Lastspitzen</li>
            <li>€120k/Jahr Einsparungen pro Anlage</li>
          </ul>
        </div>
        <div className="card">
          <h3>🚚 Logistik & Supply Chain</h3>
          <ul className="bullets">
            <li>40% reduzierte Planungszeit</li>
            <li>22% weniger Leerfahrten</li>
          </ul>
        </div>
      </section>

      <h2 style={{ marginTop: 22 }}>Preismodelle</h2>
      <section className="page-grid">
        <div className="card">
          <h3>Starter</h3>
          <p className="muted">€2.500 / Monat</p>
          <ul className="bullets">
            <li>Bis 1M Requests/Monat</li>
            <li>Standard-Support</li>
          </ul>
        </div>
        <div className="card">
          <h3>Enterprise</h3>
          <p className="muted">Individuell</p>
          <ul className="bullets">
            <li>Unbegrenzte Requests</li>
            <li>24/7 Premium-Support</li>
            <li>Dedicated Onboarding</li>
          </ul>
        </div>
      </section>

      <section className="btn-row" style={{ marginTop: 18 }}>
        <a className="btn btn-primary" href="/demo">Demo anfordern</a>
        <a className="btn btn-ghost" href="/contact">Kontakt</a>
      </section>
    </div>
  );
}
