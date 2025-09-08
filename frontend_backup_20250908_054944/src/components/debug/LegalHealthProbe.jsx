// src/components/debug/LegalHealthProbe.jsx
import React, { useEffect, useState } from "react";
import { api } from "../../lib/api.js";

export default function LegalHealthProbe() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await api.health(); // -> /legal/health
        if (!alive) return;
        setData(res);
      } catch (e) {
        if (!alive) return;
        setErr(e?.message || "Unbekannter Fehler");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold">Legal Health Probe</span>
        {loading ? (
          <span className="text-xs text-muted">lädt…</span>
        ) : err ? (
          <span className="text-xs text-red-500">Fehler</span>
        ) : (
          <span className="text-xs text-emerald-500">ok</span>
        )}
      </div>

      <div className="mt-3 text-sm">
        {loading && <div className="text-muted">Bitte warten…</div>}
        {err && <div className="text-red-500 break-all">Fehler: {err}</div>}
        {!loading && !err && (
          <pre className="overflow-auto rounded-lg bg-[color:var(--grey-800)] p-3 text-[0.8rem] text-white">
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}
