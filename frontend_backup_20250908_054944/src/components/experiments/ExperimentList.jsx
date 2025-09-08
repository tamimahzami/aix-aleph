import React, { useEffect, useState } from "react";
import { api } from "../../lib/api";

/**
 * Zeigt eine Tabelle mit Experimenten.
 * Erwartet vom Backend Felder wie: id, name, status, createdAt (ISO), updatedAt (ISO)
 * – alles optional/flexibel gehandhabt.
 */
export default function ExperimentList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      setErr(null);
      try {
        const data = await api.listExperiments(); // GET /experiments
        if (alive) setItems(Array.isArray(data) ? data : []);
      } catch (e) {
        if (alive) setErr(e?.message || "Fehler beim Laden");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  if (loading) {
    return (
      <div className="panel p-6">
        <div className="text-sm text-muted">Lade Experimente…</div>
      </div>
    );
  }

  if (err) {
    return (
      <div className="panel p-6 border border-red-500/40">
        <div className="font-semibold text-red-500">Fehler</div>
        <div className="text-sm mt-1">{String(err)}</div>
      </div>
    );
  }

  return (
    <div className="panel p-6">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold">Experimente</h2>
          <p className="text-sm text-muted">
            {items.length} {items.length === 1 ? "Experiment" : "Experimente"} gefunden
          </p>
        </div>
        {/* Platz für zukünftige Aktionen (Filter, Neuexperiment-Button, etc.) */}
      </div>

      {items.length === 0 ? (
        <div className="mt-4 text-sm text-muted">
          Noch keine Experimente vorhanden.
        </div>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-left text-muted border-b border-[var(--color-line)]">
              <tr>
                <th className="py-2 pr-4">Name</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2 pr-4">Erstellt</th>
                <th className="py-2 pr-4">Aktualisiert</th>
              </tr>
            </thead>
            <tbody>
              {items.map((x) => (
                <tr key={x.id} className="border-b border-[var(--color-line)]/60">
                  <td className="py-2 pr-4 font-medium">{x.name ?? "—"}</td>
                  <td className="py-2 pr-4">
                    <span className="chip">{x.status ?? "—"}</span>
                  </td>
                  <td className="py-2 pr-4">
                    {x.createdAt ? new Date(x.createdAt).toLocaleString() : "—"}
                  </td>
                  <td className="py-2 pr-4">
                    {x.updatedAt ? new Date(x.updatedAt).toLocaleString() : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
