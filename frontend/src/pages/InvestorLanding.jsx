// src/pages/InvestorLanding.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function InvestorLanding() {
  return (
    <main className="min-h-screen bg-[color:var(--color-bg,#0b0e13)] text-[color:var(--color-ink,#e6edf3)]">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-20"
             style={{background:
               "radial-gradient(60% 60% at 70% 30%, rgba(0,212,163,.25) 0%, transparent 60%), radial-gradient(40% 40% at 20% 80%, rgba(255,79,129,.18) 0%, transparent 60%)"}} />
        <div className="relative max-w-[1100px] mx-auto px-6 pt-20 pb-14 md:pt-28">
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight">
            AIX ALEPH – Das Betriebssystem für Mobilität
          </h1>
          <p className="mt-4 text-[color:var(--color-ink-muted,#8b95a5)] max-w-[70ch]">
            Von der Edge bis zur planetaren Cloud: KI-Autonomie für Flotten, Energie und Städte.
            Auditierbar. Echtzeitfähig. Skalierbar.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/company/investor-relations"
              className="inline-flex items-center rounded-xl px-4 py-2 font-semibold
                         bg-[color:var(--color-primary,#00d4a3)] text-black hover:opacity-90 transition"
            >
              Investor Relations öffnen
            </Link>
            <Link
              to="/demo"
              className="inline-flex items-center rounded-xl px-4 py-2 font-semibold
                         border border-[color:var(--color-line,#1f242e)] hover:bg-[color:var(--color-surface,#141922)] transition"
            >
              Produktdemo ansehen
            </Link>
          </div>
        </div>
      </section>

      {/* WARUM JETZT */}
      <section className="border-y border-[color:var(--color-line,#1f242e)]">
        <div className="max-w-[1100px] mx-auto px-6 py-12 grid md:grid-cols-3 gap-6">
          {[
            {
              t: "Marktdruck",
              d: "EMobility & Ladeinfrastruktur wachsen exponentiell – Insellösungen skalieren nicht."
            },
            {
              t: "Einheitliche Intelligenz",
              d: "AIX Aleph verbindet Fahrzeuge, Depots, Netze & Prozesse in einer Semantik."
            },
            {
              t: "Regulatorik",
              d: "Explainability, Audit-Artefakte und Policies als API – bereit für Zertifizierungen."
            }
          ].map((x) => (
            <div key={x.t} className="rounded-2xl p-5 bg-[color:var(--color-surface,#141922)]/60 border border-[color:var(--color-line,#1f242e)]">
              <h3 className="font-semibold">{x.t}</h3>
              <p className="mt-2 text-[color:var(--color-ink-muted,#8b95a5)]">{x.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ANSATZ */}
      <section>
        <div className="max-w-[1100px] mx-auto px-6 py-12">
          <h2 className="text-2xl md:text-3xl font-extrabold">Unser Ansatz</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {[
              ["E-Depot Orchestrierung", "Lastmanagement, Tarife, Depot-Kapazität – in Echtzeit optimiert."],
              ["Fleet Dispatch", "Policy-basiert, global skalierbar, CRDT-sicher repliziert."],
              ["Explainability Layer", "Kausalpfade & Artefakte je Entscheidung – Compliance by Design."]
            ].map(([t, d]) => (
              <article key={t} className="rounded-2xl p-5 bg-[color:var(--color-surface,#141922)]/60 border border-[color:var(--color-line,#1f242e)]">
                <h3 className="font-semibold">{t}</h3>
                <p className="mt-2 text-[color:var(--color-ink-muted,#8b95a5)]">{d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* BUSINESS CASE */}
      <section className="border-t border-[color:var(--color-line,#1f242e)]">
        <div className="max-w-[1100px] mx-auto px-6 py-12">
          <h2 className="text-2xl md:text-3xl font-extrabold">Business Case</h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-3">
            {[
              "–15 % OPEX durch smartes Laden & Dispatching",
              "+20 % Auslastung der Flotten",
              "Auditierbare Compliance (EU/ISO) & schnellere Zertifizierung"
            ].map((li) => (
              <li key={li} className="rounded-xl px-4 py-3 bg-[color:var(--color-surface,#141922)]/60 border border-[color:var(--color-line,#1f242e)]">{li}</li>
            ))}
          </ul>

          <div className="mt-8">
            <Link
              to="/company/investor-relations"
              className="inline-flex items-center rounded-xl px-4 py-2 font-semibold
                         bg-[color:var(--color-primary,#00d4a3)] text-black hover:opacity-90 transition"
            >
              Datenraum & Deck öffnen
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
