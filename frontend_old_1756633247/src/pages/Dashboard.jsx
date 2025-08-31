// src/pages/Dashboard.jsx
import React, { useEffect, useMemo, useState } from "react";
import "../styles/page.css";
import "./Dashboard.css";

/**
 * --- Datenform (Beispiel) für euren späteren Prisma/DB-Export ---
 * Prisma-Skizze:
 * model MetricSample {
 *   id           String   @id @default(cuid())
 *   ts           DateTime
 *   requests     Int
 *   latencyP95   Int      // ms
 *   errors       Int
 *   costEur      Float
 * }
 *
 * model ModelUsage {
 *   id        String   @id @default(cuid())
 *   ts        DateTime
 *   modelName String   // z.B. "Gemini-Pro", "GPT-4o", "DeepSeek"
 *   share     Float    // 0..1
 * }
 *
 * model Experiment {
 *   id          String @id
 *   name        String
 *   status      String // "running" | "stopped" | "completed"
 *   champion    String
 *   challenger  String
 *   delta       Float? // z.B. Accuracy-Delta
 *   pValue      Float?
 *   startedAt   DateTime
 * }
 */

// --- Kleine, lib-freie Mini-Charts (SVG) ---
function Sparkline({ data = [], width = 160, height = 40 }) {
  if (!data.length) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const norm = (v, i) => {
    const x = (i / (data.length - 1)) * (width - 2);
    const y = height - 2 - ((v - min) / Math.max(1, max - min)) * (height - 4);
    return [x + 1, y + 1];
  };
  const d = data.map(norm).map(([x, y], i) => (i ? `L${x},${y}` : `M${x},${y}`)).join(" ");
  return (
    <svg width={width} height={height} className="spark">
      <path d={d} />
    </svg>
  );
}

function TinyBar({ data = [], width = 160, height = 40 }) {
  if (!data.length) return null;
  const max = Math.max(...data, 1);
  const bw = width / data.length;
  return (
    <svg width={width} height={height} className="bars">
      {data.map((v, i) => {
        const h = ((v / max) * (height - 4));
        return (
          <rect
            key={i}
            x={i * bw + 1}
            y={height - 1 - h}
            width={Math.max(1, bw - 2)}
            height={h}
            rx="2"
          />
        );
      })}
    </svg>
  );
}

function Donut({ items = [], size = 120 }) {
  // items: [{label, value, color?}]
  const total = items.reduce((a, b) => a + b.value, 0) || 1;
  const r = size / 2 - 8;
  const cx = size / 2, cy = size / 2;
  let angle = -Math.PI / 2;
  const segs = items.map((it, idx) => {
    const a = (it.value / total) * Math.PI * 2;
    const x1 = cx + r * Math.cos(angle);
    const y1 = cy + r * Math.sin(angle);
    angle += a;
    const x2 = cx + r * Math.cos(angle);
    const y2 = cy + r * Math.sin(angle);
    const large = a > Math.PI ? 1 : 0;
    const d = `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${large} 1 ${x2},${y2} Z`;
    return { d, color: it.color };
  });
  return (
    <svg width={size} height={size} className="donut">
      {segs.map((s, i) => <path key={i} d={s.d} fill={s.color || undefined} />)}
      <circle cx={cx} cy={cy} r={r * 0.6} className="donut-hole" />
    </svg>
  );
}

// --- Fake-Loader (heute: Demo-Daten; morgen: echte /api Calls) ---
async function fetchMetrics() {
  // Hier später: const res = await fetch('/api/metrics?range=24h'); return res.json();
  return {
    series: Array.from({ length: 24 }, (_, i) => ({
      ts: Date.now() - (23 - i) * 3600_000,
      requests: 300 + Math.round(Math.sin(i / 2) * 120) + Math.round(Math.random() * 60),
      latencyP95: 45 + Math.round(Math.random() * 30),
      errors: Math.round(Math.random() * 8),
      costEur: 2 + Math.random() * 1.2,
    })),
    totals: {
      requests24h: 0, // rechnen wir unten
      errorRate: 0,   // %
      avgP95: 0,      // ms
      costPerReq: 0,  // €
    },
  };
}

async function fetchModelMix() {
  // später: /api/model-usage?range=24h
  return [
    { label: "Gemini-Pro", value: 36, color: "#6ee7b7" },
    { label: "GPT-4",      value: 27, color: "#93c5fd" },
    { label: "DeepSeek",   value: 21, color: "#fca5a5" },
    { label: "Custom",     value: 16, color: "#c4b5fd" },
  ];
}

async function fetchExperiments() {
  // später: /api/experiments?limit=5
  return [
    { id: "exp-1", name: "NLP Router 4.2", status: "running", champion: "Gemini", challenger: "GPT-4", delta: +0.12, pValue: 0.008, startedAt: Date.now() - 6 * 3600_000 },
    { id: "exp-2", name: "Vision mAP v8", status: "completed", champion: "Detectron2", challenger: "YOLOv8", delta: +0.08, pValue: 0.014, startedAt: Date.now() - 72 * 3600_000 },
  ];
}

export default function Dashboard() {
  const [metrics, setMetrics] = useState(null);
  const [modelMix, setModelMix] = useState([]);
  const [experiments, setExperiments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load data
  useEffect(() => {
    (async () => {
      setLoading(true);
      const m = await fetchMetrics();
      const mix = await fetchModelMix();
      const exps = await fetchExperiments();

      // KPIs berechnen
      const req = m.series.reduce((a, b) => a + b.requests, 0);
      const err = m.series.reduce((a, b) => a + b.errors, 0);
      const p95 = Math.round(m.series.reduce((a, b) => a + b.latencyP95, 0) / m.series.length);
      const cost = m.series.reduce((a, b) => a + b.costEur, 0);
      const costPerReq = req ? cost / req : 0;

      m.totals.requests24h = req;
      m.totals.errorRate = req ? (err / req) * 100 : 0;
      m.totals.avgP95 = p95;
      m.totals.costPerReq = costPerReq;

      setMetrics(m);
      setModelMix(mix);
      setExperiments(exps);
      setLoading(false);
    })();
  }, []);

  const reqSeries = useMemo(() => metrics?.series.map(s => s.requests) || [], [metrics]);
  const p95Series = useMemo(() => metrics?.series.map(s => s.latencyP95) || [], [metrics]);

  if (loading || !metrics) {
    return (
      <div className="page-container">
        <section className="page-hero">
          <h1>Dashboard</h1>
          <p className="muted">Lade Metriken…</p>
        </section>
        <div className="skeleton-grid">
          {[...Array(6)].map((_, i) => <div key={i} className="skeleton-card" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      {/* Hero */}
      <section className="page-hero">
        <h1>Dashboard</h1>
        <p className="muted">Live-Überblick über Requests, Latenz, Kosten und Modell-Mix</p>
      </section>

      {/* KPI Row */}
      <section className="page-grid kpi-grid">
        <div className="card kpi">
          <div className="kpi-head">
            <span className="kpi-label">Requests (24h)</span>
            <span className="kpi-val">{metrics.totals.requests24h.toLocaleString("de-DE")}</span>
          </div>
          <TinyBar data={reqSeries} />
        </div>

        <div className="card kpi">
          <div className="kpi-head">
            <span className="kpi-label">Latency P95</span>
            <span className="kpi-val">{metrics.totals.avgP95} ms</span>
          </div>
          <Sparkline data={p95Series} />
        </div>

        <div className="card kpi">
          <div className="kpi-head">
            <span className="kpi-label">Error Rate</span>
            <span className="kpi-val">{metrics.totals.errorRate.toFixed(2)}%</span>
          </div>
          <Sparkline data={metrics.series.map(s => s.errors)} />
        </div>

        <div className="card kpi">
          <div className="kpi-head">
            <span className="kpi-label">Cost / Request</span>
            <span className="kpi-val">€ {metrics.totals.costPerReq.toFixed(4)}</span>
          </div>
          <Sparkline data={metrics.series.map(s => Number((s.costEur / Math.max(1, s.requests)).toFixed(4)))} />
        </div>
      </section>

      {/* Model Mix + Request Trend */}
      <section className="page-grid cols-2">
        <div className="card">
          <h3>Model Mix (24h)</h3>
          <div className="mix-wrap">
            <Donut items={modelMix} size={130} />
            <ul className="mix-legend">
              {modelMix.map(m => (
                <li key={m.label}>
                  <span className="dot" style={{ background: m.color }} />
                  {m.label} <b>{m.value}%</b>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="card">
          <h3>Requests – Verlauf (24h)</h3>
          <TinyBar data={reqSeries} width={320} height={80} />
          <p className="muted" style={{ marginTop: 8 }}>
            Ø {Math.round(reqSeries.reduce((a,b)=>a+b,0)/reqSeries.length)} req/h
          </p>
        </div>
      </section>

      {/* Experiments Table */}
      <section className="card">
        <h3>Experimente</h3>
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Champion</th>
                <th>Challenger</th>
                <th>Δ</th>
                <th>p</th>
                <th>Start</th>
              </tr>
            </thead>
            <tbody>
              {experiments.map(e => (
                <tr key={e.id}>
                  <td>{e.name}</td>
                  <td><span className={`badge ${e.status}`}>{e.status}</span></td>
                  <td>{e.champion}</td>
                  <td>{e.challenger}</td>
                  <td>{e.delta > 0 ? `+${(e.delta*100).toFixed(1)}%` : `${(e.delta*100).toFixed(1)}%`}</td>
                  <td>{e.pValue?.toFixed(3)}</td>
                  <td>{new Date(e.startedAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
