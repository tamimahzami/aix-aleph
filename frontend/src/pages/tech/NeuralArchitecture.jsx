// src/pages/tech/NeuralArchitecture.jsx
import React from "react";
export default function NeuralArchitecture() {
  return (
    <section className="page-section">
      <div className="container-max">
        <article className="panel">
          <h1 className="text-2xl font-bold">Neural Architecture</h1>
          <p className="muted mt-1">Agenten-Komposition für Flotten-Intelligenz.</p>
          <div className="card mt-3">
            <ul className="space-y-2">
              <li className="muted">• Policy Agent: Ziel-Optimierung</li>
              <li className="muted">• Planner: Routen & Ladefenster</li>
              <li className="muted">• Executor: OCPP/Depot-Aktoren</li>
              <li className="muted">• Safety: Guard-Rails & Audit</li>
            </ul>
          </div>
        </article>
      </div>
    </section>
  );
}
