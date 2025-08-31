// src/pages/About.jsx
import React from "react";
import "../styles/page.css";

export default function About() {
  return (
    <div className="page-container">
      {/* Hero */}
      <section className="page-hero">
        <h1>Visionäre der Neuralität</h1>
        <p>
          AIX Aleph ist das Neural Operating System, das KI-Fähigkeiten orchestriert,
          generiert und kontinuierlich weiterentwickelt – wie ein lebendiges Nervensystem.
        </p>
      </section>

      {/* Mission */}
      <section className="page-content card">
        <h2>Unsere Mission</h2>
        <p className="muted">
          Wir schaffen die Grundlage für die nächste Stufe der KI-Evolution: Systeme,
          die sich selbst organisieren, optimieren und an neue Herausforderungen anpassen –
          sicher, transparent und skalierbar.
        </p>
        <ul className="bullets" style={{ marginTop: 10 }}>
          <li>Von einzelnen Modellen zu orchestrierten Fähigkeiten</li>
          <li>Resilienz &amp; Compliance als Architekturprinzip</li>
          <li>Vendor-agnostisch &amp; zukunftssicher</li>
        </ul>
      </section>

      {/* Herkunft / Expertisen */}
      <section className="page-grid">
        <div className="card">
          <h3>Ursprung</h3>
          <p className="muted">
            Entstanden 2023 aus Expertise in Deep Learning, verteilten Systemen,
            industriellem IoT und Enterprise-Security.
          </p>
        </div>
        <div className="card">
          <h3>Fokus</h3>
          <ul className="bullets">
            <li>Neural Orchestration &amp; Model Mesh</li>
            <li>AutoML &amp; Meta-Learning</li>
            <li>Data Plane &amp; Governance</li>
          </ul>
        </div>
        <div className="card">
          <h3>Was uns antreibt</h3>
          <ul className="bullets">
            <li>Wirkung vor Hype</li>
            <li>Messbare KPIs statt Slides</li>
            <li>Security &amp; Souveränität by Design</li>
          </ul>
        </div>
      </section>

      {/* Zahlen & Fakten */}
      <section className="page-grid">
        <div className="card">
          <h3>📊 Zahlen &amp; Fakten</h3>
          <ul className="kpis">
            <li>🚀 15+ Jahre kombinierte KI-Expertise</li>
            <li>🔬 8 Patente in neuronaler Architektur</li>
            <li>🌍 100% Europäische Datensouveränität</li>
            <li>⚡ 50 ms durchschnittliche Inferenz-Latenz</li>
          </ul>
        </div>
        <div className="card">
          <h3>🔐 Compliance</h3>
          <ul className="bullets">
            <li>ISO 27001, SOC2, GDPR ready</li>
            <li>EU Data Residency (z. B. AWS Frankfurt)</li>
            <li>Audit Trails &amp; Policy Enforcement</li>
          </ul>
        </div>
        <div className="card">
          <h3>🤝 Arbeitsweise</h3>
          <ul className="bullets">
            <li>Co-Design mit Fachbereichen</li>
            <li>Champion/Challenger-Evals</li>
            <li>Canary-Releases &amp; Auto-Rollback</li>
          </ul>
        </div>
      </section>

      {/* Callout */}
      <section className="page-content card">
        <h2>Warum AIX Aleph?</h2>
        <p>
          Wir bewegen uns jenseits einzelner Modelle: AIX Aleph liefert betriebliche
          Agilität, Resilienz und Compliance – das Betriebssystem für industrielle KI.
        </p>
        <div className="btn-row" style={{ marginTop: 8 }}>
          <a href="/demo" className="btn btn-primary">Demo anfordern</a>
          <a href="/business" className="btn btn-ghost">Wirtschaftliche Vorteile</a>
        </div>
      </section>
    </div>
  );
}
