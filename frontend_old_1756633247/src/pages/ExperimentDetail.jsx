// src/pages/ExperimentDetail.jsx
import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "../styles/page.css";
import "../styles/experiments.css";

const Badge = ({ tone="neutral", children }) => {
  const c = {
    neutral:{bg:"#f1f5f9",fg:"#334155"},
    run:{bg:"rgba(37,99,235,.10)",fg:"#1d4ed8"},
    good:{bg:"#ecfdf5",fg:"#065f46"},
    warn:{bg:"#fff7ed",fg:"#9a3412"},
    stop:{bg:"#fef2f2",fg:"#991b1b"},
  }[tone] || {bg:"#f1f5f9",fg:"#334155"};
  return <span style={{padding:"2px 8px",borderRadius:999,fontSize:12,fontWeight:700,background:c.bg,color:c.fg,border:"1px solid rgba(0,0,0,.06)"}}>{children}</span>;
};

export default function ExperimentDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const [exp, setExp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [splitA, setSplitA] = useState(50);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function load() {
    try {
      setLoading(true);
      const res = await fetch(`/api/experiments/${id}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setExp(data);
      // heuristisch Split aus Arms laden
      if (Array.isArray(data?.arms) && data.arms.length >= 2) {
        const a = data.arms[0]?.weight ?? 50;
        setSplitA(a);
      }
    } catch (e) {
      setErr("Laden fehlgeschlagen.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => { load(); /* eslint-disable-next-line */ }, [id]);

  async function postEvent(type, payload = {}) {
    try {
      setBusy(true);
      setErr("");
      const res = await fetch(`/api/experiments/${id}/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, payload })
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await load();
    } catch (e) {
      console.error(e);
      setErr("Aktion fehlgeschlagen.");
    } finally {
      setBusy(false);
    }
  }

  const splitB = useMemo(() => 100 - Number(splitA || 0), [splitA]);

  if (loading) return <div className="page"><section className="page-hero"><p className="muted">Lade…</p></section></div>;
  if (!exp) return <div className="page"><section className="page-hero"><p className="muted">Nicht gefunden.</p></section></div>;

  const statusTone = exp.status === "RUNNING" ? "run" : exp.status === "STOPPED" ? "stop" : "neutral";

  return (
    <div className="page">
      <section className="page-hero">
        <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}>
          <button className="btn" onClick={()=>nav(-1)}>← Zurück</button>
          <h1 style={{margin:0}}>{exp.name}</h1>
          <Badge tone="neutral">{exp.type}</Badge>
          <Badge tone={statusTone}>{exp.status}</Badge>
        </div>
        {exp.description && <p className="muted" style={{marginTop:8}}>{exp.description}</p>}
        {err && <p className="muted" style={{marginTop:6,color:"#991b1b"}}>{err}</p>}
      </section>

      {/* Arms */}
      <section className="card">
        <h3 style={{marginTop:0}}>Arms</h3>
        <div className="grid cols-2">
          {(exp.arms || []).map(a => (
            <div key={a.id} className="card" style={{marginTop:0}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <strong>{a.name}</strong>
                <Badge tone="neutral">{a.weight}%</Badge>
              </div>
              {a.metadata?.model && <div className="muted" style={{marginTop:6}}>Model: {a.metadata.model}</div>}
            </div>
          ))}
          {!exp.arms?.length && <div className="muted">Keine Arms.</div>}
        </div>
      </section>

      {/* Metrics */}
      <section className="card">
        <h3 style={{marginTop:0}}>Metrics</h3>
        <div className="table-wrap">
          <table className="table">
            <thead><tr><th>Key</th><th>Value</th><th>Unit</th></tr></thead>
            <tbody>
              {(exp.metrics||[]).map(m=>(
                <tr key={m.id}><td>{m.key}</td><td>{m.value}</td><td>{m.unit||"—"}</td></tr>
              ))}
              {!exp.metrics?.length && <tr><td colSpan="3" className="muted">Noch keine Metriken.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>

      {/* Actions */}
      <section className="card">
        <h3 style={{marginTop:0}}>Aktionen</h3>
        <div className="btn-row">
          <button className="btn" disabled={busy || exp.status !== "RUNNING"} onClick={()=>postEvent("STOPPED")}>Stoppen</button>
          <button className="btn" disabled={busy} onClick={()=>postEvent("PROMOTED",{to:"Champion"})}>Challenger promoten</button>
        </div>

        {/* Split setzen */}
        <div style={{marginTop:12}}>
          <label className="muted">Traffic Split (A/B)</label>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <input type="range" min={0} max={100} value={splitA} onChange={e=>setSplitA(Number(e.target.value))}/>
            <span className="muted">A: {splitA}% · B: {splitB}%</span>
            <button className="btn btn-primary" disabled={busy} onClick={()=>postEvent("SPLIT_SET",{a:splitA,b:splitB})}>Setzen</button>
          </div>
        </div>
      </section>

      {/* Events Timeline */}
      <section className="card">
        <h3 style={{marginTop:0}}>Events</h3>
        <ul className="timeline">
          {(exp.events||[]).slice().sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt)).map(ev=>(
            <li key={ev.id}>
              <div className="tl-row">
                <Badge tone="neutral">{ev.type}</Badge>
                <span className="muted">{new Date(ev.createdAt).toLocaleString()}</span>
              </div>
              {ev.payload && <pre className="tl-payload">{JSON.stringify(ev.payload,null,2)}</pre>}
            </li>
          ))}
          {!exp.events?.length && <li className="muted">Keine Events.</li>}
        </ul>
      </section>

      <section className="muted">
        <Link to="/experiments">← Zur Übersicht</Link>
      </section>
    </div>
  );
}
