import { useEffect, useState } from "react";
import { api } from "../lib/api";

type Lead = { id: string; name?: string; email: string; source?: string };

export default function LeadsPage() {
  const [items, setItems] = useState<Lead[]>([]);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Falls dein Backend (noch) kein /api/leads hat, vorübergehend mocken:
    // setItems([{ id: "1", name: "Alice", email: "alice@example.com", source: "web" }]);
    // setLoading(false);
    // return;

    api
      .leads()
      .then(setItems)
      .catch((e) => setErr(String(e)))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6 text-[#B5BAC1]">Lade Leads…</div>;
  if (err) return <div className="p-6 text-red-400">Fehler: {err}</div>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-semibold text-white">Leads</h1>

      <div className="grid grid-cols-3 gap-2 text-sm">
        <div className="font-medium text-[#DBDEE1]">Name</div>
        <div className="font-medium text-[#DBDEE1]">Email</div>
        <div className="font-medium text-[#DBDEE1]">Quelle</div>

        {items.length === 0 ? (
          <div className="col-span-3 text-[#B5BAC1]">Noch keine Einträge.</div>
        ) : (
          items.map((l) => (
            <div key={l.id} className="contents">
              <div className="text-white">{l.name || "—"}</div>
              <div className="text-[#B5BAC1]">{l.email}</div>
              <div className="text-[#B5BAC1]">{l.source || "—"}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
