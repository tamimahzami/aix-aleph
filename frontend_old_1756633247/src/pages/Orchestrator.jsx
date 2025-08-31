// src/pages/Orchestrator.jsx
import React from "react";
import "../styles/page.css";

function MiniNeuralGraph() {
  // kleines, statisches SVG als Platzhalter – später echt befüllen
  const nodes = [
    { id: "A", x: 40,  y: 60,  label: "Gateway" },
    { id: "B", x: 200, y: 40,  label: "LLM-1" },
    { id: "C", x: 200, y: 100, label: "LLM-2" },
    { id: "D", x: 360, y: 70,  label: "Vision" },
    { id: "E", x: 520, y: 60,  label: "Output" },
  ];
  const edges = [
    ["A","B"],["A","C"],["B","D"],["C","D"],["D","E"]
  ];
  return (
    <div className="card" aria-label="Neural Graph Mini Viz">
      <h3 style={{marginTop:0}}>Neural Graph (Mini)</h3>
      <svg viewBox="0 0 560 140" style={{width:"100%", height:"180px"}}>
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2563eb"/><stop offset="100%" stopColor="#8b5cf6"/>
          </linearGradient>
        </defs>
        {edges.map(([s,t],i)=>{
          const S = nodes.find(n=>n.id===s); const T = nodes.find(n=>n.id===t);
          return <line key={i} x1={S.x} y1={S.y} x2={T.x} y2={T.y} stroke="url(#g)" strokeWidth="2" opacity="0.6"/>;
        })}
        {nodes.map(n=>(
          <g key={n.id}>
            <circle cx={n.x} cy={n.y} r="12" fill="url(#g)" />
            <text x={n.x} y={n.y+28} textAnchor="middle" fontSize="10" fill="#475569">{n.label}</text>
          </g>
        ))}
      </svg>
      <p className="muted" style={{marginTop:8}}>
        Knoten = Modelle/Services • Kanten = Aufrufe (Dicke/Transparenz später dynamisch)
      </p>
    </div>
  );
}

export default function Orchestrator() {
  return (
    <div className="page-container">
      {/* Hero */}
      <section className="page-hero">
        <h1>Orchestrator – Der digitale Kortex</h1>
        <p>Autonomes Routing nach Performance, Kosten, Latenz und Policies.</p>
      </section>

      {/* Decision Matrix */}
      <section className="page-content card">
        <h2>Echtzeit-Entscheidungsmatrix</h2>
        <ul className="bullets">
          <li><b>Modell-Performance</b>: Accuracy, F1, Halluzinations-Score</li>
          <li><b>Kostenoptimierung</b>: €/Inference, GPU-Zeit</li>
          <li><b>Compliance</b>: Data Residency, Policy-Guardrails</li>
          <li><b>Systemauslastung</b>: Load, Queue-Tiefe, Throttling</li>
        </ul>
      </section>

      {/* Viz + Live Metrics */}
      <section className="page-grid">
        <MiniNeuralGraph />
        <div className="card">
          <h3 style={{marginTop:0}}>Live-Metriken</h3>
          <ul className="kpis">
            <li>⚡ Entscheidungszeit: &lt; 5 ms</li>
            <li>📈 Durchsatz: 8,200 RPS</li>
            <li>🛡️ Policy-Violations (24h): 0</li>
            <li>🔄 Auto-Scale Events (24h): 12</li>
          </ul>
          <div className="btn-row" style={{marginTop:8}}>
            <button className="btn btn-primary">Routing-Report anzeigen</button>
            <button className="btn btn-ghost">Guardrails</button>
          </div>
        </div>
      </section>

      {/* Autonomous Loop */}
      <section className="page-content card">
        <h2>Autonome Schleife</h2>
        <p className="muted" style={{marginBottom:8}}>
          Telemetry → Evaluation → Challenge (A/B/Canary) → Promotion → Audit
        </p>
        <ul className="bullets">
          <li><b>Challenge</b>: 15% Traffic auf Challenger-Modelle</li>
          <li><b>Promotion</b>: automatisiert bei signifikanter Verbesserung (p &lt; 0.01)</li>
          <li><b>Rollback</b>: sofort bei Drift, SLA-Verletzung oder Policy-Fehlern</li>
        </ul>
        <div className="btn-row" style={{marginTop:10}}>
          <button className="btn btn-primary">Champion/Challenger öffnen</button>
          <button className="btn btn-ghost">Audit-Trail</button>
        </div>
      </section>
    </div>
  );
}
