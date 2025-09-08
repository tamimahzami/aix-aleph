import React from "react";

export function HealthBadge() {
  const [ok, setOk] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    const base = import.meta.env.VITE_API_BASE || "";
    fetch(`${base}/api/health`).then(async (r) => {
      try {
        const j = await r.json();
        setOk(Boolean(j?.ok ?? r.ok));
      } catch {
        setOk(r.ok);
      }
    }).catch(() => setOk(false));
  }, []);

  const color = ok === null ? "bg-yellow-400" : ok ? "bg-green-500" : "bg-red-500";
  const label = ok === null ? "checking…" : ok ? "healthy" : "error";

  return (
    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 text-sm">
      <span className={`inline-block h-2.5 w-2.5 rounded-full ${color}`} />
      <span className="text-white/80">{label}</span>
    </span>
  );
}
