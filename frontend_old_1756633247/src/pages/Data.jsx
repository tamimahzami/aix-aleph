import React from "react";
import "../styles/page.css";

export default function Data() {
  return (
    <div className="page-container">
      <section className="page-hero">
        <h1>Data Excellence Framework</h1>
        <p>Ingestion → Validation → Transformation → Serving → Monitoring</p>
      </section>

      <section className="page-grid">
        <div className="card">
          <h3>Data Quality</h3>
          <ul className="kpis">
            <li>Datenfrische: <b>98.3% &lt; 1s</b></li>
            <li>Validierungsrate: <b>99.95%</b></li>
            <li>PII-Erkennung: <b>100%</b></li>
            <li>Feature Consistency: <b>99.8%</b></li>
          </ul>
        </div>
        <div className="card">
          <h3>Realtime Streams</h3>
          <ul className="bullets">
            <li>Kafka: 12 Topics</li>
            <li>Kinesis: 8 Streams</li>
            <li>Durchsatz: 12.000 events/sec</li>
          </ul>
        </div>
        <div className="card">
          <h3>Batch & Warehousing</h3>
          <ul className="bullets">
            <li>45 Daily Jobs (99.8% success)</li>
            <li>Snowflake 4.2TB / BigQuery 2.8TB / Redshift 1.5TB</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
