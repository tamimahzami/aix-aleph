// src/pages/Developers.jsx
import React from "react";
export default function Developers() {
  return (
    <section className="page-section">
      <div className="container-max">
        <div className="panel">
          <h1 className="text-2xl font-bold">Developers</h1>
          <div className="card mt-3">
            <b>API</b>
            <p className="muted">REST/GraphQL, Webhooks, OAuth2, API-Keys.</p>
            <button className="btn btn-primary mt-2">API-Key erstellen</button>
          </div>
          <div className="card mt-3">
            <b>SDKs</b>
            <p className="muted">JS/TS, Python. Beispiele & Postman-Collection.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
