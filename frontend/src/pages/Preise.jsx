// src/pages/Preise.jsx
import React from "react";
import ContainerMax from "../components/common/ContainerMax.jsx";

export default function Preise() {
  const plans = [
    {
      name: "Starter",
      price: "€0",
      period: " / Monat",
      tagline: "Für erste Experimente und kleine Projekte.",
      features: ["1 Projekt", "Basis-API-Limits", "Community Support"],
      cta: "Kostenlos starten",
      accent: false,
    },
    {
      name: "Pro",
      price: "€49",
      period: " / Monat",
      tagline: "Für produktive Teams mit klaren Zielen.",
      features: ["Unbegrenzt Projekte", "Höhere Raten & Quoten", "Priorisierter Support", "Audit-Trails"],
      cta: "Pro holen",
      accent: true,
    },
    {
      name: "Enterprise",
      price: "Kontakt",
      period: "",
      tagline: "Für Flotten & Operations mit hohen Anforderungen.",
      features: ["Custom SLAs", "On-Prem / VPC Optionen", "SAML/SSO", "Persönlicher Ansprechpartner"],
      cta: "Kontakt aufnehmen",
      accent: false,
    },
  ];

  return (
    <section className="page-section">
      <ContainerMax>
        <div className="card" style={{ textAlign: "center" }}>
          <h1
            className="accent-text"
            style={{ fontSize: "2rem", lineHeight: "2.5rem", fontWeight: 800 }}
          >
            Preise & Pläne
          </h1>
          <p className="muted" style={{ marginTop: 8 }}>
            Transparente Pläne, die mit dir wachsen — vom Prototyp bis zur Flotte.
          </p>
        </div>

        {/* Plans */}
        <div
          className="grid"
          style={{
            display: "grid",
            gap: 16,
            marginTop: 16,
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          }}
        >
          {plans.map((p) => (
            <article
              key={p.name}
              className="card"
              style={{
                borderRadius: "var(--radius)",
                border: "1px solid var(--line)",
                boxShadow: "var(--shadow)",
                ...(p.accent
                  ? { boxShadow: "0 0 0 2px var(--primary) inset, var(--shadow)" }
                  : {}),
              }}
            >
              <header>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700 }}>{p.name}</h3>
                <p className="muted" style={{ marginTop: 6 }}>
                  {p.tagline}
                </p>
              </header>

              <div style={{ marginTop: 12 }}>
                <span style={{ fontSize: "2rem", fontWeight: 800 }}>{p.price}</span>
                <span className="muted">{p.period}</span>
              </div>

              <ul className="list-disc ml-6" style={{ marginTop: 12 }}>
                {p.features.map((f) => (
                  <li key={f} className="muted" style={{ marginTop: 6 }}>
                    {f}
                  </li>
                ))}
              </ul>

              <div style={{ marginTop: 14 }}>
                <button className={`btn ${p.accent ? "btn-primary" : ""}`}>{p.cta}</button>
              </div>
            </article>
          ))}
        </div>

        {/* Hinweis */}
        <div className="panel" style={{ marginTop: 16 }}>
          <strong>Hinweis:</strong>{" "}
          <span className="muted">
            Alle Preise zzgl. USt. Falls du spezielle Anforderungen (z. B. On-Prem)
            hast, sprich uns an — wir finden eine Lösung.
          </span>
        </div>
      </ContainerMax>
    </section>
  );
}
