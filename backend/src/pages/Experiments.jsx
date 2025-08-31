// src/pages/Experiments.jsx
import React, { useEffect, useState } from "react";
import "../styles/page.css";
import NewExperimentDialog from "../components/experiments/NewExperimentDialog";

export default function Experiments() {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function load() {
    try {
      setBusy(true);
      setErr("");
      const res = await fetch("/api/experiments");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setItems(data);
    } catch (e) {
      setErr(`Fehler: ${e.message}`);
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => { load(); }, []);

  return (
    <div className="page-container">
      <section className="page-hero" style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:12 }}>
        <div>
          <h1>Experiments</h1>
          <p className="muted">A/B & Canary – leichtgewichtig, produktionsnah.</p>
        </div>
        <div className="btn-row">
          <button className="btn btn-primary" onClick={() => setOpen(true)}>+ Neues Experiment</button>
        </div>
      </section>

      {err && <div className="card" style={{ borderColor:"#ef4444", color:"#b91c1c", background:"#fff1f2" }}>{err}</div>}

      <section className="card">
        {busy ? (
          <p className="muted">Lade…</p>
        ) : items.length === 0 ? (
          <p className="muted">Noch keine Experimente. Lege das erste an.</p>
        ) : (
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Typ</th>
                  <th>Status</th>
                  <th>Arme</th>
                  <th>Erstellt</th>
                </tr>
              </thead>
              <tbody>
                {items.map((e) => (
                  <tr key={e.id}>
                    <td>{e.name}</td>
                    <td>{e.type}</td>
                    <td>{e.status}</td>
                    <td>
                      {e.arms?.map(a => `${a.name} (${a.weight}%)`).join(" · ")}
                    </td>
                    <td>{new Date(e.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Dialog */}
      <NewExperimentDialog
        open={open}
        onClose={() => setOpen(false)}
        onCreated={() => load()}
      />
    </div>
  );
}
