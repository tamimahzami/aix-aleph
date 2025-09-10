// src/pages/company/InvestorRelations.jsx
import React from "react";
export default function InvestorRelations() {
  return (
    <section className="page-section">
      <div className="container-max">
        <div className="panel">
          <h1 className="text-2xl font-bold">Investor Relations</h1>
          <div className="grid md:grid-cols-3 gap-4 mt-3">
            <div className="card"><b>KPIs</b><p className="muted">MRR, Churn, ACV …</p></div>
            <div className="card"><b>Deck</b><p className="muted">One-Pager & Pitch.</p></div>
            <div className="card"><b>Kontakt</b><p className="muted">ir@aix-aleph.com</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}
