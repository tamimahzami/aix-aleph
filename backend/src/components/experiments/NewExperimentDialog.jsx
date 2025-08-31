// src/components/experiments/NewExperimentDialog.jsx
import React, { useEffect, useState } from "react";

export default function NewExperimentDialog({ open, onClose, onCreated }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("AB");            // AB | CANARY
  const [description, setDescription] = useState("");
  const [strategy, setStrategy] = useState("SPLIT"); // SPLIT | CANARY_STEP
  const [arms, setArms] = useState([
    { name: "Champion", weight: 50, metadata: { model: "Gemini-Pro v1.2" } },
    { name: "Challenger", weight: 50, metadata: { model: "GPT-4 v4.0" } },
  ]);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!open) {
      setName("");
      setType("AB");
      setDescription("");
      setStrategy("SPLIT");
      setArms([
        { name: "Champion", weight: 50, metadata: { model: "Gemini-Pro v1.2" } },
        { name: "Challenger", weight: 50, metadata: { model: "GPT-4 v4.0" } },
      ]);
      setBusy(false);
      setErr("");
    }
  }, [open]);

  if (!open) return null;

  const totalWeight = arms.reduce((s, a) => s + Number(a.weight || 0), 0);
  const canSubmit = name && totalWeight === 100 && !busy;

  async function submit() {
    try {
      setBusy(true);
      setErr("");
      const res = await fetch("/api/experiments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          type,                 // "AB" | "CANARY"
          description,
          strategy,             // "SPLIT" | "CANARY_STEP" (liegt in deinem Schema als enum)
          arms,                 // [{ name, weight, metadata }]
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const created = await res.json();
      onCreated?.(created);
      onClose?.();
    } catch (e) {
      setErr(`Fehler beim Anlegen: ${e.message}`);
    } finally {
      setBusy(false);
    }
  }

  const updateArm = (idx, patch) => {
    setArms(prev => prev.map((a, i) => i === idx ? { ...a, ...patch } : a));
  };

  return (
    <div role="dialog" aria-modal="true"
         style={{ position:"fixed", inset:0, background:"rgba(2,6,23,.45)", display:"grid", placeItems:"center", padding:16, zIndex:1000 }}>
      <div className="card" style={{ width:"100%", maxWidth:720 }}>
        <h3 style={{ marginTop:0 }}>Neues Experiment</h3>
        <p className="muted">Leichtgewichtiges A/B- oder Canary-Experiment anlegen.</p>

        {err && <div className="card" style={{ borderColor:"#ef4444", color:"#b91c1c", background:"#fff1f2" }}>{err}</div>}

        <div className="grid cols-2" style={{ marginTop:12 }}>
          <div>
            <label>Name</label>
            <input
              value={name}
              onChange={e=>setName(e.target.value)}
              placeholder="z.B. NLP Router Optimierung"
            />
          </div>
          <div>
            <label>Typ</label>
            <select value={type} onChange={e=>setType(e.target.value)}>
              <option value="AB">A/B</option>
              <option value="CANARY">Canary</option>
            </select>
          </div>

          <div style={{ gridColumn:"1 / -1" }}>
            <label>Beschreibung</label>
            <textarea
              rows={3}
              value={description}
              onChange={e=>setDescription(e.target.value)}
              placeholder="Hypothese / Ziel…"
            />
          </div>

          <div>
            <label>Traffic-Strategie</label>
            <select value={strategy} onChange={e=>setStrategy(e.target.value)}>
              <option value="SPLIT">Split (A/B)</option>
              <option value="CANARY_STEP">Canary Step</option>
            </select>
          </div>

          <div>
            <label>Gewicht-Check</label>
            <div className="muted">Summe: <b>{totalWeight}%</b> (muss 100% sein)</div>
          </div>
        </div>

        <div className="card" style={{ marginTop:12 }}>
          <h4 style={{ marginTop:0 }}>Arme / Varianten</h4>
          <div className="grid cols-2">
            {arms.map((arm, idx) => (
              <div key={idx} className="card" style={{ padding:12 }}>
                <div className="grid" style={{ gap:8 }}>
                  <div>
                    <label>Name</label>
                    <input
                      value={arm.name}
                      onChange={e=>updateArm(idx, { name: e.target.value })}
                      placeholder={idx === 0 ? "Champion" : "Challenger"}
                    />
                  </div>
                  <div>
                    <label>Gewicht (%)</label>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={arm.weight}
                      onChange={e=>updateArm(idx, { weight: Number(e.target.value || 0) })}
                    />
                  </div>
                  <div style={{ gridColumn:"1 / -1" }}>
                    <label>Modell (optional)</label>
                    <input
                      value={arm.metadata?.model || ""}
                      onChange={e=>updateArm(idx, { metadata: { ...(arm.metadata||{}), model: e.target.value } })}
                      placeholder="z.B. GPT-4 v4.0"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="btn-row" style={{ marginTop:8 }}>
            <button
              className="btn"
              onClick={() => setArms(prev => [...prev, { name: `Variante ${prev.length+1}`, weight: 0, metadata: {} }])}
            >+ Arm hinzufügen</button>
            {arms.length > 2 && (
              <button
                className="btn"
                onClick={() => setArms(prev => prev.slice(0, -1))}
              >Letzten Arm entfernen</button>
            )}
          </div>
        </div>

        <div className="btn-row" style={{ marginTop:14 }}>
          <button className="btn btn-primary" disabled={!canSubmit} onClick={submit}>
            {busy ? "Wird angelegt…" : "Experiment starten"}
          </button>
          <button className="btn btn-ghost" onClick={onClose}>Abbrechen</button>
        </div>
      </div>
    </div>
  );
}
