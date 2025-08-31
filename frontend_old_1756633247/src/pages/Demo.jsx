import React from "react";
import "../styles/page.css";
import { Link } from "react-router-dom";

export default function Demo() {
  return (
    <div className="page-container">
      <section className="page-hero">
        <h1>Live-Demo anfordern</h1>
        <p>Erlebe AIX Aleph in Aktion – fokussiert auf deine Use Cases.</p>
        <div className="btn-row">
          <Link to="/register" className="btn btn-primary">Demo-Termin vereinbaren</Link>
          <Link to="/dashboard-demo" className="btn btn-ghost">Interaktive Demo</Link>
        </div>
      </section>

      <section className="page-grid">
        <div className="card">
          <h3>1) Neural Graph</h3>
          <p>Echtzeit-Einblick in Modell-Interaktionen.</p>
        </div>
        <div className="card">
          <h3>2) Autonome Orchestrierung</h3>
          <p>Selbstoptimierende Architektur live.</p>
        </div>
        <div className="card">
          <h3>3) Enterprise-Security</h3>
          <p>Guardrails, Audit und Policies.</p>
        </div>
        <div className="card">
          <h3>4) Custom Integration</h3>
          <p>Deine Daten & Prozesse – sicher und souverän.</p>
        </div>
      </section>
    </div>
  );
}
