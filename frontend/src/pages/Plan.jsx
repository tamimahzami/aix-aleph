// src/pages/Plan.jsx
import React from "react";
import { Link } from "react-router-dom";
import ContainerMax from "../components/common/ContainerMax.jsx";

const milestones = [
  {
    q: "Q1",
    title: "Pilotaufbau",
    items: ["Datenaufnahme & Adapter", "Baseline + Hypothesen", "Safety & Compliance Setup"],
  },
  {
    q: "Q2",
    title: "Wirknachweise",
    items: ["KPI: Kosten/Uptime/CO₂", "A/B-Strategien (Laden)", "Audit-Trails & Repro"],
  },
  {
    q: "Q3",
    title: "Skalierung",
    items: ["Mehr-Depot Orchestrierung", "RBAC/SSO/ISO Pack", "Ops-Handbuch & Runbooks"],
  },
  {
    q: "Q4",
    title: "Transfer",
    items: ["Förderrichtlinien-Report", "Publikationen & Poster", "Governance & Übergabe"],
  },
];

const research = [
  {
    title: "Orchestrierung & Optimierung",
    desc: "Multi-Ziel (Tarif, CO₂, Verfügbarkeit) mit Nebenbedingungen (Schichten, Netzlast, Degradation).",
    tags: ["Mixed-Integer", "Heuristics", "Realtime"],
  },
  {
    title: "Telemetrie & Health",
    desc: "SoC/SOH-Schätzung, Ladeeffizienz, Anomalieerkennung – herstelleragnostisch.",
    tags: ["Signalverarbeitung", "Bayes", "Self-Supervised"],
  },
  {
    title: "Resilienz & Sicherheit",
    desc: "Fehlermodi, Fallbacks, Attack-Surfaces, Auditierbarkeit der Entscheidungen.",
    tags: ["Safety Cases", "Threat Modeling", "SBOM"],
  },
];

function Milestone({ q, title, items }) {
  return (
    <div className="card relative">
      <div className="flex items-center justify-between">
        <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-full bg-primary/15 text-primary text-sm font-semibold border border-primary/30">
          {q}
        </span>
        <span className="font-semibold">{title}</span>
      </div>
      <ul className="mt-3 space-y-1 text-sm">
        {items.map((it) => (
          <li key={it} className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Pill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-card px-2 py-1 text-xs">
      {children}
    </span>
  );
}

export default function Plan() {
  return (
    <>
      {/* Hero */}
      <section className="page-section">
        <ContainerMax>
          <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr] items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                Forschungs- & Skalierungsplan <span className="text-primary">2025</span>
              </h1>
              <p className="mt-3 text-foreground/80 max-w-[70ch]">
                Wir verbinden akademische Strenge mit operativer Exzellenz: von Hypothese zu belastbarem Betrieb –
                transparent, auditierbar, replizierbar.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/demo" className="btn btn-accent">Live-Demo</Link>
                <a href="#call" className="btn-outline">Kooperations-Call</a>
              </div>
            </div>

            <div className="card">
              <div className="text-sm opacity-70">Förderlinien & Partnerschaften</div>
              <ul className="mt-2 space-y-2 text-sm">
                <li>• Kommunen & Hochschulen: Rabatte + Evaluation-Slots</li>
                <li>• Industrie: Integrations-Partner, SLA, On-Prem/Hybrid</li>
                <li>• Forschung: Datenräume, Publikationen, Repro-Pipelines</li>
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                <Pill>Open Research</Pill>
                <Pill>ISO-ready</Pill>
                <Pill>RBAC/SSO</Pill>
                <Pill>Audit Trails</Pill>
              </div>
            </div>
          </div>
        </ContainerMax>
      </section>

      {/* Meilensteine */}
      <section className="page-section">
        <ContainerMax>
          <h2 className="text-xl font-bold">Meilensteine 2025</h2>
          <div className="mt-4 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {milestones.map((m) => (
              <Milestone key={m.q} {...m} />
            ))}
          </div>
        </ContainerMax>
      </section>

      {/* Forschungsschwerpunkte */}
      <section className="page-section">
        <ContainerMax>
          <h2 className="text-xl font-bold">Forschungsschwerpunkte</h2>
          <div className="mt-4 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {research.map((r) => (
              <div key={r.title} className="card">
                <h3 className="font-semibold">{r.title}</h3>
                <p className="mt-2 text-sm muted">{r.desc}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {r.tags.map((t) => (
                    <Pill key={t}>{t}</Pill>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ContainerMax>
      </section>

      {/* Call to action / Kontakt */}
      <section id="call" className="page-section">
        <ContainerMax>
          <div className="card">
            <div className="grid gap-6 md:grid-cols-[1.1fr_.9fr]">
              <div>
                <h2 className="text-xl font-bold">Gemeinsamen Plan schmieden</h2>
                <p className="mt-2 text-sm muted max-w-[65ch]">
                  Ob Pilot, Enterprise-Integration oder Forschungskooperation – wir strukturieren Scope, Daten & KPIs
                  in einer kurzen Discovery und liefern anschließend reproduzierbare Ergebnisse.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link to="/preise" className="btn-outline">Pakete vergleichen</Link>
                  <Link to="/demo" className="engine-btn">Engine ansehen</Link>
                </div>
              </div>

              <form
                className="space-y-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Danke! Wir melden uns kurzfristig.");
                }}
              >
                <div>
                  <label className="block text-sm mb-1">Organisation</label>
                  <input className="input" type="text" required placeholder="Firma/Institut" />
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <div>
                    <label className="block text-sm mb-1">Name</label>
                    <input className="input" type="text" required placeholder="Vor- und Nachname" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">E-Mail</label>
                    <input className="input" type="email" required placeholder="you@example.org" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm mb-1">Ziel</label>
                  <select className="input" defaultValue="Pilot">
                    <option>Pilot</option>
                    <option>Enterprise</option>
                    <option>Forschung</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-1">Nachricht</label>
                  <textarea className="input min-h-28" placeholder="Kurzbeschreibung & Zeitraum" />
                </div>
                <button className="btn w-full" type="submit">Gespräch anfragen</button>
                <p className="text-xs muted">
                  Hinweise zum Datenschutz finden Sie im Impressum/Datenschutz.
                </p>
              </form>
            </div>
          </div>
        </ContainerMax>
      </section>
    </>
  );
}
