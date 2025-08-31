// frontend/src/pages/Experiments.jsx
import React, { useEffect, useState } from "react";

/** Mini-Badge */
const Badge = ({ tone = "neutral", children }) => {
  const c =
    {
      neutral: { bg: "#f1f5f9", fg: "#334155" },
      run: { bg: "#ecfeff", fg: "#155e75" },
      stop: { bg: "#fef2f2", fg: "#7f1d1d" },
      draft: { bg: "#f1f5f9", fg: "#334155" },
    }[tone] || { bg: "#f1f5f9", fg: "#334155" };

  return (
    <span
      style={{
        padding: "2px 8px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 700,
        background: c.bg,
        color: c.fg,
        border: "1px solid rgba(0,0,0,.06)",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
};

export default function Experiments() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    try {
      setLoading(true);
      setError("");
      const res = await fetch("/api/experiments");
      if (!res.ok) throw new Error("Fetch failed");
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      setError("Fehler beim Laden der Experimente.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function createExperiment() {
    try {
      setCreating(true);
      setError("");
      const res = await fetch("/api/experiments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Test Experiment " + new Date().toLocaleTimeString(),
          type: "AB",
          description: "Automatisch angelegt aus Frontend",
          arms: [
            { name: "Champion", initialSplit: 50 },
            { name: "Challenger", initialSplit: 50 },
          ],
        }),
      });
      if (!res.ok) throw new Error("Fehler beim Anlegen");
      await load();
    } catch (e) {
      console.error(e);
      setError("Experiment konnte nicht angelegt werden.");
    } finally {
      setCreating(false);
    }
  }

  async function deleteExperiment(id) {
    try {
      setError("");
      const res = await fetch(`/api/experiments/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      await load();
    } catch (e) {
      console.error(e);
      setError("Löschen fehlgeschlagen.");
    }
  }

  return (
    <div className="page" style={{ padding: 16 }}>
      <section className="page-hero" style={{ marginBottom: 16 }}>
        <h1 style={{ margin: 0 }}>Experiments</h1>
        <p className="muted" style={{ marginTop: 4 }}>
          A/B & Canary – Live-Daten aus dem Backend.
        </p>
        <div className="btn-row" style={{ marginTop: 10, display: "flex", gap: 8, alignItems: "center" }}>
          <button
            className="btn btn-primary"
            onClick={createExperiment}
            disabled={creating}
            style={{
              padding: "8px 12px",
              borderRadius: 8,
              border: "1px solid rgba(0,0,0,.1)",
              background: creating ? "#e2e8f0" : "#111827",
              color: creating ? "#111827" : "#fff",
              cursor: creating ? "not-allowed" : "pointer",
            }}
          >
            {creating ? "Erstelle…" : "＋ Neues Experiment"}
          </button>
          {error && <span className="muted" style={{ color: "#b91c1c" }}>{error}</span>}
        </div>
      </section>

      <section className="card" style={{ background: "#fff", borderRadius: 12, border: "1px solid #e5e7eb" }}>
        {loading ? (
          <p className="muted" style={{ padding: 16 }}>Lade…</p>
        ) : (
          <div className="table-wrap" style={{ width: "100%", overflowX: "auto" }}>
            <table className="table" style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f8fafc" }}>
                  <th style={th}>Name</th>
                  <th style={th}>Typ</th>
                  <th style={th}>Status</th>
                  <th style={th}>Arms</th>
                  <th style={th}>Erstellt</th>
                  <th style={th}>Aktionen</th>
                </tr>
              </thead>
              <tbody>
                {items.map((x) => (
                  <tr key={x.id}>
                    <td style={td}>{x.name}</td>
                    <td style={td}><Badge tone="neutral">{x.type}</Badge></td>
                    <td style={td}>
                      <Badge
                        tone={
                          x.status === "RUNNING" ? "run" :
                          x.status === "STOPPED" ? "stop" :
                          "draft"
                        }
                      >
                        {x.status}
                      </Badge>
                    </td>
                    <td style={td}>
                      {Array.isArray(x.arms) && x.arms.length > 0
                        ? x.arms
                            .map((a) => `${a.name} (${a.initialSplit ?? 0}%)`)
                            .join(" · ")
                        : "—"}
                    </td>
                    <td style={td}>{x.createdAt ? new Date(x.createdAt).toLocaleString() : "—"}</td>
                    <td style={td}>
                      <button
                        title="Löschen"
                        onClick={() => deleteExperiment(x.id)}
                        style={trashBtn}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
                {items.length === 0 && (
                  <tr>
                    <td style={td} colSpan={6} className="muted">Keine Experimente vorhanden.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

// simple inline table styles
const th = {
  textAlign: "left",
  padding: "10px 12px",
  fontSize: 12,
  fontWeight: 700,
  color: "#475569",
  borderBottom: "1px solid #e5e7eb",
  whiteSpace: "nowrap",
};
const td = {
  padding: "10px 12px",
  fontSize: 14,
  color: "#0f172a",
  borderBottom: "1px solid #f1f5f9",
  verticalAlign: "top",
};
const trashBtn = {
  padding: "6px 8px",
  borderRadius: 8,
  border: "1px solid #e5e7eb",
  background: "#fff",
  cursor: "pointer",
};
