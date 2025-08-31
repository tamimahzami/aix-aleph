// src/pages/Investors.jsx
import React from "react";
import "../styles/page.css";
import "../styles/investors.css";

export default function Investors() {
  return (
    <div className="page-container">
      {/* Hero */}
      <section className="page-hero hero-investors">
        <div>
          <h1>Für Investoren</h1>
          <p>Investieren Sie in die Zukunft intelligenter Infrastrukturen.</p>
        </div>
        <div className="btn-row">
          <a href="#contact" className="btn btn-primary">📊 Pitch Deck anfordern</a>
        </div>
      </section>

      {/* Investment Opportunity */}
      <section className="page-content card">
        <h2>Investment Opportunity</h2>

        <div className="financial-overview">
          <div className="financial-card">
            <h3>Bereits gesichert</h3>
            <div className="amount">€2.1M</div>
            <div className="round">Pre-Seed &amp; Seed</div>
            <div className="investors">
              <span>Lead: DeepTech Ventures</span>
              <span>+ 4 Business Angels</span>
            </div>
          </div>

          <div className="financial-card highlight">
            <h3>Aktuelle Runde</h3>
            <div className="amount">€4.5M</div>
            <div className="round">Series A</div>
            <div className="details">
              <span>Bewertung: €24M pre-money</span>
              <span>Frist: 30.06.2025</span>
            </div>
          </div>
        </div>
      </section>

      {/* Use of Funds */}
      <section className="page-content card">
        <h2>Verwendung der Mittel</h2>
        <div className="funds-chart">
          <div className="funds-item">
            <div className="funds-bar" style={{ width: "40%" }} aria-label="40% Produktentwicklung & Forschung" />
            <span className="percentage">40%</span>
            <span className="purpose">Produktentwicklung &amp; Forschung</span>
          </div>
          <div className="funds-item">
            <div className="funds-bar" style={{ width: "30%" }} aria-label="30% Markteintritt & Vertrieb" />
            <span className="percentage">30%</span>
            <span className="purpose">Markteintritt &amp; Vertrieb</span>
          </div>
          <div className="funds-item">
            <div className="funds-bar" style={{ width: "20%" }} aria-label="20% Talentakquise" />
            <span className="percentage">20%</span>
            <span className="purpose">Talentakquise</span>
          </div>
          <div className="funds-item">
            <div className="funds-bar" style={{ width: "10%" }} aria-label="10% Operative Kosten" />
            <span className="percentage">10%</span>
            <span className="purpose">Operative Kosten</span>
          </div>
        </div>
      </section>

      {/* Growth */}
      <section className="page-content card">
        <h2>Wachstumsprognose</h2>
        <div className="revenue-projections">
          <div className="projection">
            <span className="year">2025</span>
            <span className="amount">€1.2M</span>
            <span className="source">(Pilotprojekte + Lizenzierung)</span>
          </div>
          <div className="projection">
            <span className="year">2026</span>
            <span className="amount">€4.8M</span>
            <span className="source">(Enterprise-Lizenzen + SaaS)</span>
          </div>
          <div className="projection">
            <span className="year">2027</span>
            <span className="amount">€12.3M</span>
            <span className="source">(Skalierung EU-weit)</span>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="page-grid">
        <div className="card">
          <h3>🏗️ Adressierbarer Markt</h3>
          <p className="muted">€12.5B+</p>
        </div>
        <div className="card">
          <h3>⚡ Kosteneffizienz</h3>
          <p className="muted">bis zu 72% Steigerung</p>
        </div>
        <div className="card">
          <h3>🔐 Protegierte Patente</h3>
          <p className="muted">4</p>
        </div>
      </section>

      {/* Technology Advantages */}
      <section className="page-content card">
        <h2>Technologische Wettbewerbsvorteile</h2>
        <div className="competition-table">
          <div className="table-row header">
            <div className="table-cell">Feature</div>
            <div className="table-cell">AIX Aleph CORE</div>
            <div className="table-cell">Traditionelle KI-Plattformen</div>
            <div className="table-cell">Cloud AI Services</div>
          </div>
          <div className="table-row">
            <div className="table-cell">Echtzeit-Orchestrierung</div>
            <div className="table-cell">✅ Autonom</div>
            <div className="table-cell">❌ Manuell</div>
            <div className="table-cell">🟡 Teilweise</div>
          </div>
          <div className="table-row">
            <div className="table-cell">Quantum-Sicherheit</div>
            <div className="table-cell">✅ Integriert</div>
            <div className="table-cell">❌ Nicht verfügbar</div>
            <div className="table-cell">❌ Add-on</div>
          </div>
          <div className="table-row">
            <div className="table-cell">Datenhoheit</div>
            <div className="table-cell">✅ Vollständig</div>
            <div className="table-cell">🟡 Eingeschränkt</div>
            <div className="table-cell">❌ Beim Anbieter</div>
          </div>
          <div className="table-row">
            <div className="table-cell">Anpassungsfähigkeit</div>
            <div className="table-cell">✅ Selbstoptimierend</div>
            <div className="table-cell">🟡 Statisch</div>
            <div className="table-cell">🟡 Begrenzt</div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="page-content card">
        <h2>Investor Relations Kontakt</h2>
        <div className="contact-grid">
          <div className="contact-info">
            <div className="contact-item">
              <strong>Dr. Michael Berger</strong>
              <span>CEO &amp; Gründungspartner</span>
              <a href="mailto:m.berger@aixcore.com">m.berger@aixcore.com</a>
            </div>
            <div className="contact-item">
              <strong>Sarah Vogel</strong>
              <span>CFO &amp; Investor Relations</span>
              <a href="mailto:s.vogel@aixcore.com">s.vogel@aixcore.com</a>
            </div>
          </div>
          <div className="documents">
            <h3>Investor Dokumente</h3>
            <a href="#" className="doc-link">📊 Pitch Deck (Q2 2025)</a>
            <a href="#" className="doc-link">📋 Executive Summary</a>
            <a href="#" className="doc-link">🔒 Due Diligence Package</a>
          </div>
        </div>
      </section>
    </div>
  );
}
