// src/pages/Models.jsx
import React, { useMemo, useState } from "react";
import "../styles/page.css";

const STATUS_COLORS = {
  production: "#16a34a",
  testing: "#f59e0b",
  retired: "#94a3b8",
};

const initialModels = [
  { id: "gemini-pro",      name: "Gemini-Pro",      type: "LLM",    version: "v1.2", status: "production", usage: 35, latencyMs: 62,  cost: 0.0023 },
  { id: "deepseek-coder",  name: "DeepSeek-Coder",  type: "Code",   version: "v2.1", status: "production", usage: 28, latencyMs: 74,  cost: 0.0018 },
  { id: "gpt-4",           name: "GPT-4",           type: "LLM",    version: "v4.0", status: "production", usage: 22, latencyMs: 95,  cost: 0.0039 },
  { id: "yolo-v8",         name: "YOLO-v8",         type: "Vision", version: "v8.2", status: "testing",    usage: 8,  latencyMs: 41,  cost: 0.0011 },
  { id: "prophet",         name: "Prophet",         type: "TS",     version: "v1.1", status: "production", usage: 7,  latencyMs: 38,  cost: 0.0009 },
];

function StatusBadge({ status }) {
  const color = STATUS_COLORS[status] ?? "#64748b";
  const label =
    status === "production" ? "Production" :
    status === "testing"    ? "Testing" :
    status === "retired"    ? "Retired" : status;
  return (
    <span style={{
      display:"inline-flex", alignItems:"center", gap:6,
      fontSize:12, fontWeight:700, color:"#0f172a",
      background:"#fff", border:"1px solid #e5e7eb",
      borderRadius:999, padding:"4px 8px"
    }}>
      <span style={{
        width:8, height:8, borderRadius:999, background: color
      }}/>
      {label}
    </span>
  );
}

function PromoteDialog({ open, onClose, model, onConfirm }) {
  if (!open || !model) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="promote-title"
      style={{
        position:"fixed", inset:0, display:"grid", placeItems:"center",
        background:"rgba(2,6,23,.45)", padding:"16px", zIndex:1000
      }}
    >
      <div className="card" style={{ maxWidth: 520, width:"100%" }}>
        <h3 id="promote-title" style={{ marginTop: 0 }}>
          {model.name} {model.version} zum <b>Champion</b> befördern?
        </h3>
        <p className="muted" style={{ marginTop: 6 }}>
          Aktuelle Metriken: Nutzung {model.usage}% · Latenz {model.latencyMs}ms · Kosten {model.cost.toFixed(4)} €/Req
        </p>
        <ul className="bullets" style={{ marginTop: 10 }}>
          <li>Traffic wird progressiv (Canary) hochgeschaltet</li>
          <li>Automatischer Rollback bei SLA/Policy-Verletzungen</li>
          <li>Audit-Trail wird vollständig protokolliert</li>
        </ul>
        <div className="btn-row" style={{ marginTop: 12 }}>
          <button className="btn btn-primary" onClick={() => onConfirm(model)}>Bestätigen</button>
          <button className="btn btn-ghost" onClick={onClose}>Abbrechen</button>
        </div>
      </div>
    </div>
  );
}

export default function Models() {
  const [models, setModels] = useState(initialModels);
  const [query, setQuery] = useState("");
  const [dialogModel, setDialogModel] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return models;
    return models.filter(m =>
      m.name.toLowerCase().includes(q) ||
      m.type.toLowerCase().includes(q) ||
      m.status.toLowerCase().includes(q) ||
      m.version.toLowerCase().includes(q)
    );
  }, [models, query]);

  const openPromote = (m) => { setDialogModel(m); setDialogOpen(true); };
  const closePromote = () => { setDialogOpen(false); setDialogModel(null); };

  const confirmPromote = (m) => {
    // Simple client-side “promotion”: set status to production
    setModels(prev => prev.map(x => x.id === m.id ? { ...x, status: "production" } : x));
    closePromote();
  };

  return (
    <div className="page-container">
      {/* Hero */}
      <section className="page-hero">
        <h1>Model Registry</h1>
        <p>Heterogene Modelle als Mesh – versioniert, beobachtbar, austauschbar.</p>
      </section>

      {/* Controls */}
      <section className="card" style={{ display:"grid", gap:12 }}>
        <div className="grid cols-3" style={{ alignItems:"end" }}>
          <div>
            <label className="muted" htmlFor="q">Suche</label>
            <input
              id="q"
              type="text"
              placeholder="Name, Typ, Status…"
              value={query}
              onChange={(e)=>setQuery(e.target.value)}
              style={{
                width:"100%", padding:"10px 12px", borderRadius:10,
                border:"1px solid #e5e7eb", outline:"none"
              }}
            />
          </div>
          <div>
            <label className="muted">Aktionen</label>
            <div className="btn-row">
              <button className="btn">Importieren</button>
              <button className="btn">Neu registrieren</button>
            </div>
          </div>
          <div>
            <label className="muted">Export</label>
            <div className="btn-row">
              <button className="btn btn-ghost">CSV</button>
              <button className="btn btn-ghost">JSON</button>
            </div>
          </div>
        </div>
      </section>

      {/* Table */}
      <section className="card table-wrap">
        <table className="table" role="table" aria-label="Model Registry">
          <thead>
            <tr>
              <th>Name</th>
              <th>Typ</th>
              <th>Version</th>
              <th>Status</th>
              <th>Nutzung</th>
              <th>Latenz</th>
              <th>Kosten/Req</th>
              <th style={{ width: 220 }}>Aktion</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(m => (
              <tr key={m.id}>
                <td>{m.name}</td>
                <td>{m.type}</td>
                <td>{m.version}</td>
                <td><StatusBadge status={m.status} /></td>
                <td>{m.usage}%</td>
                <td>{m.latencyMs} ms</td>
                <td>€ {m.cost.toFixed(4)}</td>
                <td>
                  <div className="btn-row">
                    <button className="btn btn-primary" onClick={()=>openPromote(m)}>
                      Promote to Champion
                    </button>
                    <button className="btn btn-ghost">
                      Details
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="muted">Keine Modelle gefunden.</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      {/* Modal */}
      <PromoteDialog
        open={dialogOpen}
        model={dialogModel}
        onClose={closePromote}
        onConfirm={confirmPromote}
      />
    </div>
  );
}
