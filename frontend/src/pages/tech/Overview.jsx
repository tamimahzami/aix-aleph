// src/pages/tech/Overview.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function TechOverview() {
  return (
    <section className="page-section">
      <div className="container-max">
        <div className="panel">
          <h1 className="text-2xl font-bold">Technologie-Overview</h1>
          <p className="muted mt-1">Architektur, Datenpfade, Integrationen.</p>
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            <Link to="/tech/NeuralArchitecture" className="card hover:brightness-110">
              <h3 className="font-semibold">Neural Architecture</h3>
              <p className="muted">Policy, Planner, Executor, Safety-Layer.</p>
            </Link>
            <Link to="/tech/RealtimeAnalytics" className="card hover:brightness-110">
              <h3 className="font-semibold">Realtime Analytics</h3>
              <p className="muted">Stream-Ingest, Feature-Store, KPIs.</p>
            </Link>
            <div className="card">
              <h3 className="font-semibold">APIs & Standards</h3>
              <p className="muted">OCPP 1.6j, GTFS-RT, TOMP-API, Webhooks.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
