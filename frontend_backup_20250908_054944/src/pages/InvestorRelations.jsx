// frontend/src/pages/InvestorRelations.jsx
import React from "react";

export default function InvestorRelations() {
  return (
    <main
      className="aix-investor max-w-4xl mx-auto p-8 text-gray-100"
      aria-labelledby="ir-title"
    >
      <h1 id="ir-title" className="text-4xl font-bold mb-6">
        Investor Relations
      </h1>
      <h2 className="text-xl font-semibold mb-8">
        AIX Aleph Pitch Deck — Das Betriebssystem für KI-Agenten
      </h2>

      {/* Call-to-Actions */}
      <div className="flex flex-wrap gap-4 mb-10">
        <a
          href="/assets/pitchdeck.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg focus:ring focus:ring-cyan-400"
        >
          Pitch als PDF
        </a>
        <a
          href="mailto:sales@aix-aleph.com?subject=Intro-Call Investor"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg focus:ring focus:ring-green-400"
        >
          Intro-Call buchen
        </a>
      </div>

      {/* Inhalte Pitch Deck */}
      <section className="mb-10">
        <h3 className="text-2xl font-semibold mb-4">Inhalte des Pitch Decks</h3>
        <ul className="list-disc ml-6 space-y-2">
          <li>🚀 Executive Summary</li>
          <li>📊 Marktanalyse</li>
          <li>🧠 Technologie</li>
          <li>💡 Use Cases</li>
          <li>📈 Traction</li>
          <li>💸 Finanzmodell</li>
        </ul>
      </section>

      {/* Gründer & Team */}
      <section className="mb-10">
        <h3 className="text-2xl font-semibold mb-4">Gründerprofil &amp; Team</h3>
        <ul className="list-disc ml-6 space-y-2">
          <li>
            <strong>Daniela Ahzami — CEO:</strong> Governance, Compliance, Skalierung
          </li>
          <li>
            <strong>Tamim Ahzami — CTO:</strong> KI-Architektur, Semantik, Runtime
          </li>
          <li>
            <strong>Cornel Poppel — Strategy &amp; IR:</strong> Kapitalstrategie, Narrative
          </li>
          <li>
            <strong>Diana Poppel — Finance:</strong> Bilanzierung, IPO-Readiness
          </li>
        </ul>
      </section>

      {/* Marktanalyse */}
      <section className="mb-10">
        <h3 className="text-2xl font-semibold mb-4">Marktanalyse &amp; Wettbewerb</h3>
        <p className="mb-2">
          Die KI-Ökonomie wächst bis 2030 auf über 1 Billion USD. Besonders
          Plattformen in regulierten Märkten sind Wachstumstreiber.
        </p>
        <p className="mb-2">
          Zielmärkte: Finanzwesen, Industrie 4.0, Verwaltung, HealthTech.
        </p>
        <p>
          Wettbewerbsvorteile: semantische Tiefe, Governance-Integration,
          regulatorischer Fit.
        </p>
      </section>

      {/* Plattformarchitektur */}
      <section className="mb-10">
        <h3 className="text-2xl font-semibold mb-4">
          Plattformarchitektur &amp; Investment Case
        </h3>
        <ul className="list-disc ml-6 space-y-2">
          <li>Semantische Engine für Kontext &amp; Bedeutung</li>
          <li>Agentenframework für autonome Teams</li>
          <li>Strategische Assets &amp; IP (Ontologien, APIs, Governance)</li>
          <li>Skalierungsplan: EU → Nordamerika → Asien</li>
          <li>Finanzstrategie: tokenisierte Wandelanleihe, IPO-Ziel Q3 2026</li>
        </ul>
      </section>

      {/* Abschluss CTA */}
      <section className="text-center mt-16">
        <h3 className="text-xl font-semibold mb-4">Jetzt mehr erfahren</h3>
        <p className="mb-6">
          Laden Sie unser Pitch Deck herunter oder vereinbaren Sie einen Call
          mit unserem Team.
        </p>
        <a
          href="mailto:sales@aix-aleph.com"
          className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg focus:ring focus:ring-cyan-400"
        >
          Kontakt aufnehmen
        </a>
      </section>
    </main>
  );
}	
