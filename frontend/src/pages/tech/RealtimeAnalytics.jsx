// src/pages/tech/RealtimeAnalytics.jsx
import React from "react";
export default function RealtimeAnalytics() {
  return (
    <section className="page-section">
      <div className="container-max">
        <article className="panel">
          <h1 className="text-2xl font-bold">Realtime Analytics</h1>
          <p className="muted mt-1">Streaming-Ingest, Zeitreihen, Alerts.</p>
          <div className="grid md:grid-cols-3 gap-4 mt-3">
            <div className="card">
              <h3 className="font-semibold">Ingest</h3>
              <p className="muted">MQTT/Kafka, Protobuf, Edge-Gateways.</p>
            </div>
            <div className="card">
              <h3 className="font-semibold">Feature-Store</h3>
              <p className="muted">Aggregationen, Fenster, Materialized Views.</p>
            </div>
            <div className="card">
              <h3 className="font-semibold">KPIs & SLA</h3>
              <p className="muted">Verfügbarkeit, Energie, Kosten, CO₂.</p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
