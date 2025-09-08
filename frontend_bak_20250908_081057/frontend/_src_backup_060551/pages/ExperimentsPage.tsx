import React from "react";
import { api } from "../lib/api";

export default function ExperimentsPage() {
  const [items, setItems] = React.useState<any[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let mounted = true;
    api.listExperiments()
      .then((data) => mounted && setItems(data))
      .catch((e) => mounted && setError(String(e.message || e)));
    return () => { mounted = false; };
  }, []);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 space-y-6">
      <h2 className="text-2xl font-bold">Experiments</h2>
      {error && <div className="panel p-4 border-red-500/40">Error: {error}</div>}
      {!items && !error && <div className="text-muted">Lade…</div>}
      {items && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {items.map((it: any, i: number) => (
            <div key={it.id ?? i} className="panel p-4">
              <div className="font-semibold">Experiment #{it.id ?? i+1}</div>
              <div className="text-muted text-sm">Status: {it.status ?? "DRAFT"}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
