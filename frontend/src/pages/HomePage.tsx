import { useEffect, useState } from "react";
import { api } from "../lib/api";

export default function HomePage() {
  const [ts, setTs] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    api.health().then(r => setTs(r.ts)).catch(e => setErr(String(e)));
  }, []);

  return (
    <div className="p-6 space-y-3">
      <h1 className="text-xl font-semibold text-white">Dashboard</h1>
      {err ? (
        <div className="text-red-400">Backend down: {err}</div>
      ) : ts ? (
        <div className="text-green-500">Backend ok • {new Date(ts).toLocaleString()}</div>
      ) : (
        <div className="text-[#B5BAC1]">Prüfe Backend…</div>
      )}
    </div>
  );
}
