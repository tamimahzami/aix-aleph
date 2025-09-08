import React from "react";
import { Link } from "react-router-dom";

export default function Compare() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 space-y-10">
      {/* Hero */}
      <header className="text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          AIX ALEPH vs. Aleph Alpha
        </h1>
        <p className="mt-3 text-[var(--color-ink-muted)] max-w-3xl mx-auto">
          Kurz & klar: Operatives, auditierbares Agenten-Betriebssystem (AIX ALEPH)
          trifft auf generative Grundlagentechnologie (Aleph Alpha).
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link to="/demo" className="btn btn-primary">Demo öffnen</Link>
          <Link to="/dashboard" className="btn btn-ghost">Zum Dashboard</Link>
        </div>
      </header>

      {/* TL;DR */}
      <section className="grid gap-4 md:grid-cols-2">
        <div className="panel p-5">
          <h2 className="text-xl font-bold">AIX ALEPH – TL;DR</h2>
          <ul className="mt-2 list-disc pl-5 space-y-1 text-sm">
            <li>Agenten-Betriebssystem für Flotte, E-Depot &amp; Ladeinfrastruktur</li>
            <li>Echtzeit-Orchestrierung mit Policies &amp; Explainability</li>
            <li>Auditierbare Entscheidungen, SLA-tauglich</li>
          </ul>
        </div>
        <div className="panel p-5">
          <h2 className="text-xl font-bold">Aleph Alpha – TL;DR</h2>
          <ul className="mt-2 list-disc pl-5 space-y-1 text-sm">
            <li>Deutscher LLM-Anbieter (z. B. Luminous)</li>
            <li>Generatives Grundmodell für viele Anwendungsfälle</li>
            <li>Explain-Funktion für mehr Transparenz</li>
          </ul>
        </div>
      </section>

      {/* Vergleichstabelle */}
      <section>
        <h2 className="text-2xl font-extrabold">Direkter Vergleich</h2>
        <div className="overflow-auto mt-4">
          <table className="min-w-[720px] w-full">
            <thead>
              <tr>
                <th className="text-left p-2 border-b border-[var(--color-line)]">Aspekt</th>
                <th className="text-left p-2 border-b border-[var(--color-line)]">AIX ALEPH</th>
                <th className="text-left p-2 border-b border-[var(--color-line)]">Aleph Alpha</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border-b border-[var(--color-line)]">Rolle</td>
                <td className="p-2 border-b border-[var(--color-line)]">Operative Plattform / Agenten-OS</td>
                <td className="p-2 border-b border-[var(--color-line)]">Grundlagen-KI (LLM-Provider)</td>
              </tr>
              <tr>
                <td className="p-2 border-b border-[var(--color-line)]">Fokus</td>
                <td className="p-2 border-b border-[var(--color-line)]">Echtzeit, Policies, Orchestrierung</td>
                <td className="p-2 border-b border-[var(--color-line)]">Generieren, Verstehen, Erklären</td>
              </tr>
              <tr>
                <td className="p-2 border-b border-[var(--color-line)]">Explainability</td>
                <td className="p-2 border-b border-[var(--color-line)]">Kausalpfade & Audit-Trails je Entscheidung</td>
                <td className="p-2 border-b border-[var(--color-line)]">Explain-Funktion für Antworten</td>
              </tr>
              <tr>
                <td className="p-2 border-b border-[var(--color-line)]">Realtime / Edge</td>
                <td className="p-2 border-b border-[var(--color-line)]">Realtime Fabric, Edge-fähig</td>
                <td className="p-2 border-b border-[var(--color-line)]">Abhängig von Integration</td>
              </tr>
              <tr>
                <td className="p-2 border-b border-[var(--color-line)]">Einsatz</td>
                <td className="p-2 border-b border-[var(--color-line)]">Flotten, Energie, physische Prozesse</td>
                <td className="p-2 border-b border-[var(--color-line)]">Breite, textlastige Use-Cases</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Praxisbezug */}
      <section className="grid gap-4 md:grid-cols-2">
        <div className="panel p-5">
          <h3 className="font-semibold">Wann AIX ALEPH?</h3>
          <p className="text-sm text-muted mt-1">
            Wenn Entscheidungen <em>in der physischen Welt</em> orchestriert, überwacht
            und auditierbar gemacht werden müssen (E-Depot, Flotte, Ladepunkte).
          </p>
        </div>
        <div className="panel p-5">
          <h3 className="font-semibold">Wann Aleph Alpha?</h3>
          <p className="text-sm text-muted mt-1">
            Wenn du ein <em>LLM als Baustein</em> brauchst (Generieren, Q&amp;A, Zusammenfassen)
            – optional mit Explain-Insights.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center">
        <div className="inline-flex flex-wrap gap-3">
          <Link to="/demo" className="btn btn-primary">Demo ausprobieren</Link>
          <Link to="/tech/overview" className="btn btn-ghost">Technologie verstehen</Link>
          <Link to="/kontakt" className="btn btn-ghost">Kontakt</Link>
        </div>
      </section>
    </div>
  );
}
