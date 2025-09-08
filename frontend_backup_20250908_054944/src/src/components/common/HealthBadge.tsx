import { useEffect, useState } from "react";
import { api } from "../../lib/api";

export default function HealthBadge() {
  const [ts, setTs] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    api.health().then(r => setTs(r.ts)).catch(e => setErr(String(e)));
  }, []);

  if (err) return <span className="text-red-500 text-sm">Backend down: {err}</span>;
  if (!ts) return <span className="text-gray-500 text-sm">Checking…</span>;
  return <span className="text-green-600 text-sm">ok • {new Date(ts).toLocaleString()}</span>;
}
