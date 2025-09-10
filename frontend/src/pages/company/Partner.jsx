// src/pages/company/Partner.jsx
import React from "react";
export default function Partner() {
  return (
    <section className="page-section">
      <div className="container-max">
        <div className="panel">
          <h1 className="text-2xl font-bold">Partnerprogramm</h1>
          <p className="muted mt-1">OEMs, Energieversorger, Betreiber.</p>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="card">
              <h3 className="font-semibold">Technologie-Partner</h3>
              <p className="muted">APIs, Zertifikate, Co-Selling.</p>
            </div>
            <div className="card">
              <h3 className="font-semibold">Lösungspartner</h3>
              <p className="muted">Integration, Schulung, Betrieb.</p>
            </div>
          </div>
          <button className="btn btn-primary mt-4">Partner werden</button>
        </div>
      </div>
    </section>
  );
}
