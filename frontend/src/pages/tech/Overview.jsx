import React from "react";
import { Link } from "react-router-dom";

/**
 * TechOverview – Einstieg in die Technologie von AIX ALEPH
 */
export default function Overview() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 space-y-10">
      {/* Hero */}
      <header className="text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          AIX Neural Core – <span className="text-[var(--blurple)]">Technologie-Übersicht</span>
        </h1>
        <p className="mt-3 text-[var(--color-ink-muted)] max-w-3xl mx-auto">
          Neuro-symbolische KI, Realtime-Fabric und erklärbare Entscheidungen – gebaut für Mobilität,
          Energie & Industrie.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link to="/demo" className="btn btn-primary">Demo starten</Link>
          <Link to="/dashboard" className="btn btn-ghost">Live-Dashboard</Link>
          <Link to="/preise" className="btn btn-ghost">Preise</Link>
        </div>
      </header>

      {/* Inhalt */}
      <section className="prose prose-invert max-w-none">
        <h2>🧠 Neuro-symbolische Architektur</h2>
        <p>
          Der <strong>AIX Neural Core</strong> kombiniert tiefe Wahrnehmung (LLMs, Sensoren, Zeitreihen)
          mit logikbasierter Planung & Policies. Ergebnis: <em>entscheidbare Agenten</em>, die
          erklärbar, auditierbar und SLA-fähig sind.
        </p>

        <h3>Kernkomponenten</h3>
        <ul>
          <li><strong>Perception:</strong> multimodal & edge-fähig</li>
          <li><strong>Planning & Policy:</strong> deterministische Entscheidungen</li>
          <li><strong>Explainability:</strong> Kausalgraphen & Audit-Trails</li>
          <li><strong>Realtime Fabric:</strong> Sub-ms Latenzen, deterministisch</li>
          <li><strong>Trust Layer:</strong> sichere Enklaven, Telemetrie-Beweise</li>
        </ul>

        <h3>Use Cases</h3>
        <ul>
          <li>E-Depot Orchestrierung</li>
          <li>Flottensteuerung</li>
          <li>Ladeinfrastruktur</li>
        </ul>
      </section>

      {/* CTA */}
      <section className="text-center">
        <h3 className="text-2xl font-bold">Bereit für mehr?</h3>
        <p className="text-muted mt-2">Öffne das Dashboard oder starte die Demo.</p>
        <div className="mt-5 flex justify-center gap-3">
          <Link to="/demo" className="btn btn-primary">Jetzt Demo öffnen</Link>
          <Link to="/dashboard" className="btn btn-ghost">Zum Dashboard</Link>
        </div>
      </section>
    </div>
  );
}
