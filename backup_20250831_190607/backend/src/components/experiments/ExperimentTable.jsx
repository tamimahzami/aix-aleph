// src/components/experiments/ExperimentTable.jsx
import React from "react";

/** Kleine Status-Pille ohne extra CSS-Datei */
function StatusPill({ status }) {
  const s = String(status || "").toUpperCase();
  const colors = {
    DRAFT:   { bg: "#eef2ff", fg: "#3730a3" },
    RUNNING: { bg: "#ecfdf5", fg: "#065f46" },
    PAUSED:  { bg: "#fff7ed", fg: "#9a3412" },
    STOPPED: { bg: "#fef2f2", fg: "#991b1b" },
    DONE:    { bg: "#f0fdf4", fg: "#166534" },
    COMPLETED:{ bg: "#f0fdf4", fg: "#166534" },
  };
  const c = colors[s] || { bg: "#f1f5f9", fg: "#334155" };
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 8px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 700,
        background: c.bg,
        color: c.fg,
      }}
      aria-label={`Status ${s}`}
      title={s}
    >
      {s}
    </span>
  );
}

function formatDate(dt) {
  try {
    return new Date(dt).toLocaleString();
  } catch {
    return "—";
  }
}

function renderArms(arms = []) {
  if (!arms?.length) return "—";
  return arms
    .map(a => `${a.name || "Arm"} ${a.weight ?? 0}%${a?.metadata?.model ? ` (${a.metadata.model})` : ""}`)
    .join(" · ");
}

/**
 * ExperimentTable
 * @param {Array} items - Liste von Experimenten (mit arms, status, updatedAt, etc.)
 * @param {Function} onSelect - Klick-Handler für "Öffnen" / Zeilenklick
 * @param {Boolean} dense - kompaktere Zeilenhöhe
 */
export default function ExperimentTable({ items = [], onSelect, dense = false }) {
  if (!items.length) {
    return (
      <div className="card" style={{ textAlign: "center", padding: 20 }}>
        <div style={{ fontWeight: 700, marginBottom: 6 }}>Keine Experimente gefunden</div>
        <div className="muted">Starte ein neues Experiment, um hier Einträge zu sehen.</div>
      </div>
    );
  }

  return (
    <div className="table-wrap">
      <table className="table" role="table" aria-label="Experimente">
        <thead>
          <tr>
            <th style={{ width: "30%" }}>Experiment</th>
            <th style={{ width: "10%" }}>Typ</th>
            <th style={{ width: "14%" }}>Status</th>
            <th>Arme / Split</th>
            <th style={{ width: "18%" }}>Zuletzt aktualisiert</th>
            <th style={{ width: "10%" }}>Aktion</th>
          </tr>
        </thead>
        <tbody>
          {items.map(exp => (
            <tr
              key={exp.id}
              style={{ cursor: onSelect ? "pointer" : "default", height: dense ? 42 : 54 }}
              onClick={() => onSelect?.(exp)}
            >
              <td>
                <div style={{ fontWeight: 700 }}>{exp.name || "Ohne Titel"}</div>
                {exp.description ? (
                  <div className="muted" style={{ fontSize: 12, marginTop: 2 }}>
                    {exp.description}
                  </div>
                ) : null}
              </td>
              <td>{exp.type || "—"}</td>
              <td><StatusPill status={exp.status} /></td>
              <td>{renderArms(exp.arms)}</td>
              <td>{formatDate(exp.updatedAt || exp.createdAt)}</td>
              <td>
                <button
                  className="btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect?.(exp);
                  }}
                >
                  Öffnen
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
