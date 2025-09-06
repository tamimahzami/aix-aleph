// src/pages/Preise.jsx
import React from "react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Starter",
    price: "0 €",
    period: "immer",
    features: [
      "Demo-Dashboard (read-only)",
      "3 Szenarien & Kartenlayer",
      "Basis-Reporte (PDF)",
    ],
    cta: { to: "/register", label: "Kostenlos starten" },
  },
  {
    name: "Pro",
    price: "299 €",
    period: "pro Monat",
    features: [
      "Live-Daten & Webhooks",
      "10 Depots / 100 Fahrzeuge",
      "KI-Agent Orchestrierung",
      "Support: E-Mail",
    ],
    highlight: true,
    cta: { to: "/register", label: "14 Tage testen" },
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "nach Bedarf",
    features: [
      "Unlimitierte Flotten",
      "On-Prem / VPC",
      "SLA, SSO, Audit Trails",
      "Dedicated Support",
    ],
    cta: { to: "/kontakt", label: "Gespräch vereinbaren" },
  },
];

export default function Preise() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <header className="text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold">Preise</h1>
        <p className="mt-2 text-muted">
          Transparent, wachstumsfreundlich und sofort einsatzbereit.
        </p>
      </header>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`panel p-6 ${p.highlight ? "ring-2 ring-[var(--color-primary)]" : ""}`}
          >
            <h3 className="text-xl font-semibold">{p.name}</h3>
            <div className="mt-3">
              <div className="text-3xl font-extrabold">{p.price}</div>
              <div className="text-muted">{p.period}</div>
            </div>
            <ul className="mt-5 space-y-2 text-[15px]">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <span>✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Link
              to={p.cta.to}
              className={`btn mt-6 ${p.highlight ? "btn-primary" : "btn-ghost"}`}
            >
              {p.cta.label}
            </Link>
          </div>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-muted">
        Preise zzgl. USt. Monatlich kündbar. Enterprise: individuelle Vereinbarung.
      </p>
    </div>
  );
}
