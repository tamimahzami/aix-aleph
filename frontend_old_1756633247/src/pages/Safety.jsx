import React from "react";
import "../styles/page.css";

export default function Safety() {
  return (
    <div className="page-container">
      <section className="page-hero">
        <h1>Enterprise-Sicherheit</h1>
        <p>Zero-Trust, Guardrails und volle Auditierbarkeit by design.</p>
      </section>

      <section className="page-grid">
        <div className="card">
          <h3>Security Posture</h3>
          <ul className="bullets">
            <li>Zero Vulnerabilities: ✅</li>
            <li>Compliance: ISO 27001, SOC2, GDPR</li>
            <li>Crypto: AES-256 + TLS 1.3</li>
          </ul>
        </div>
        <div className="card">
          <h3>Governance</h3>
          <ul className="bullets">
            <li>15 aktive Security Policies</li>
            <li>0 Policy Violations (7 Tage)</li>
            <li>100% Request Logging</li>
          </ul>
        </div>
        <div className="card">
          <h3>Zero-Trust Architektur</h3>
          <ul className="bullets">
            <li>Auth pro Request, Micro-Segmentation</li>
            <li>EU Data Residency: 100%</li>
            <li>Encryption in Transit/Rest</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
