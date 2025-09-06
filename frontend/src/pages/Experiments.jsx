import React, { useEffect, useState } from "react";
import { api } from "../lib/api";

export default function Experiments() {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    api.listExperiments().then(setItems).catch(e => setErr(e.message || "Error"));
  }, []);

  return (
    <div className="max-w-[1100px] mx-auto px-4 py-8">
      <h1 className="text-2xl font-extrabold mb-4">Experiments</h1>
      {err && <div className="text-red-500 mb-3">{err}</div>}
      <div className="grid gap-3">
        {items.map(x => (
          <div key={x.id} className="rounded-xl border border-[var(--color-line)] p-4">
            <div className="font-bold">{x.name}</div>
            {x.description && <div className="text-sm opacity-80">{x.description}</div>}
            <div className="text-xs mt-1">Status: {x.status}</div>
          </div>
        ))}
        {!items.length && !err && <div className="opacity-70">Keine Experimente gefunden.</div>}
      </div>
    </div>
  );
}
