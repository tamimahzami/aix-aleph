// src/components/debug/ManifestoProbe.jsx
import React, { useEffect, useState } from "react";
import { api } from "../../lib/api.js";

export default function ManifestoProbe() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  async function load() {
    setLoading(true);
    setErr(null);
    try {
      // Wenn du im api-Client den Endpunkt einkommentierst, geht auch: await api.getManifesto()
      const res = await apiFetch("/manifesto"); // Fallback: direkter Call
      setData(res);
    } catch (e) {
      setErr(e.message || "Unbekannter Fehler");
    } finally {
      setLoading(false);
    }
  }

  // kleiner Helfer, wenn api.getManifesto noch nicht freigeschaltet ist
  async function apiFetch(path) {
    // minimaler Wrapper, damit die Probe unabhängig vom api-Objekt funktioniert
    const base = (import.meta?.env?.VITE_API_BASE ?? "http://localhost:5001/api").replace(/\/+$/, "");
    const res = await fetch(`${base}${path}`, { headers: { Accept: "application/json" } });
    if (!res.ok) {
      const t = await res.text().catch(() => "");
      throw new Error(t || `HTTP ${res.status}`);
    }
    return res.json();
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="p-4 rounded-lg bg-[var(--color-bg-2)] text-[var(--color-ink)] shadow">
      <header className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-bold">🫀 Humane Computing Manifesto (Probe)</h2>
        <button
          onClick={load}
          className="px-3 py-1 rounded-md bg-[var(--color-primary)] text-white hover:opacity-90"
        >
          Neu laden
        </button>
      </header>

      {loading && <p>Lade Manifesto…</p>}
      {err && <p className="text-red-500">Fehler: {err}</p>}

      {data && (
        <div className="space-y-4">
          <div>
            <div className="text-sm uppercase tracking-wide text-[var(--color-muted)]">Titel</div>
            <div className="text-lg font-semibold">{data.title}</div>
          </div>

          {Array.isArray(data.credo) && (
            <div>
              <div className="text-sm uppercase tracking-wide text-[var(--color-muted)] mb-1">Credo</div>
              <ul className="list-disc pl-6 space-y-1">
                {data.credo.map((line, i) => (
                  <li key={`c-${i}`}>{line}</li>
                ))}
              </ul>
            </div>
          )}

          {Array.isArray(data.principles) && (
            <div>
              <div className="text-sm uppercase tracking-wide text-[var(--color-muted)] mb-1">Prinzipien</div>
              <ul className="list-disc pl-6 space-y-1">
                {data.principles.map((p, i) => (
                  <li key={`p-${i}`}>{p}</li>
                ))}
              </ul>
            </div>
          )}

          {data.promise && (
            <div className="italic opacity-90">„{data.promise}“</div>
          )}
        </div>
      )}
    </section>
  );
}
