import React, { useEffect, useMemo, useState } from "react";

/**
 * Experiments Page
 * - nutzt FE-Proxy: relative Pfade auf /api/experiments
 * - optimistisches Delete + Fallback-Refetch
 * - defensive Fehlerbehandlung
 */

const API = {
  list: async (signal) => {
    const res = await fetch("/api/experiments", { signal });
    if (!res.ok) throw new Error(`List failed: ${res.status}`);
    return res.json();
  },
  create: async (payload) => {
    const res = await fetch("/api/experiments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      throw new Error(`Create failed: ${res.status} ${txt}`);
    }
    return res.json();
  },
  remove: async (id) => {
    const res = await fetch(`/api/experiments/${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    if (res.status === 404) {
      return { ok: true, id }; // treat as already deleted
    }
    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      throw new Error(`Delete failed: ${res.status} ${txt}`);
    }
    return res.json();
  },
};

function useExperiments() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const refetch = async () => {
    setLoading(true);
    setErr("");
    const ac = new AbortController();
    try {
      const data = await API.list(ac.signal);
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      setErr(e?.message || "Laden fehlgeschlagen");
    } finally {
      setLoading(false);
    }
    return () => ac.abort();
  };

  useEffect(() => {
    let mounted = true;
    const ac = new AbortController();
    (async () => {
      try {
        const data = await API.list(ac.signal);
        if (mounted) setItems(Array.isArray(data) ? data : []);
      } catch (e) {
        if (mounted) setErr(e?.message || "Laden fehlgeschlagen");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
      ac.abort();
    };
  }, []);

  return { items, setItems, loading, err, refetch };
}

export default function Experiments() {
  const { items, setItems, loading, err, refetch } = useExperiments();

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [creating, setCreating] = useState(false);
  const [createErr, setCreateErr] = useState("");

  const canCreate = useMemo(
    () => name.trim().length > 0 && !creating,
    [name, creating]
  );

  const onCreate = async (e) => {
    e?.preventDefault?.();
    if (!canCreate) return;

    setCreating(true);
    setCreateErr("");

    const payload = {
      name: name.trim(),
      description: desc.trim() || undefined,
      type: "AB",
      strategy: "FIXED",
      arms: [
        { name: "Champion", initialSplit: 50 },
        { name: "Challenger", initialSplit: 50 },
      ],
    };

    try {
      const created = await API.create(payload);
      setItems((prev) => [created, ...prev]); // prepend
      setName("");
      setDesc("");
    } catch (e) {
      setCreateErr(e?.message || "Erstellen fehlgeschlagen");
    } finally {
      setCreating(false);
    }
  };

  const onDelete = async (id) => {
    const prev = items;
    setItems((list) => list.filter((x) => x.id !== id)); // optimistic
    try {
      await API.remove(id);
      refetch(); // ensure sync
    } catch (e) {
      setItems(prev); // rollback
      alert(e?.message || "Löschen fehlgeschlagen");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <header className="flex items-end gap-4 flex-wrap">
        <div className="grow">
          <h1 className="text-2xl font-semibold">Experiments</h1>
          <p className="text-sm opacity-80">
            Lädt/erstellt/löscht via FE-Proxy auf <code>/api/experiments</code>.
          </p>
        </div>
        <button
          onClick={refetch}
          className="px-3 py-1.5 rounded border"
          disabled={loading}
          title="Neu laden"
        >
          {loading ? "Lädt…" : "Neu laden"}
        </button>
      </header>

      <section className="p-4 rounded border space-y-3">
        <h2 className="font-medium">Neu anlegen</h2>
        <form onSubmit={onCreate} className="grid gap-2 sm:grid-cols-2">
          <label className="sm:col-span-1">
            <div className="text-sm opacity-80 mb-1">Name *</div>
            <input
              className="w-full border rounded px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="z. B. Demo"
              required
            />
          </label>
          <label className="sm:col-span-1">
            <div className="text-sm opacity-80 mb-1">Beschreibung</div>
            <input
              className="w-full border rounded px-3 py-2"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="optional"
            />
          </label>
          <div className="sm:col-span-2 flex gap-2">
            <button
              type="submit"
              className="px-3 py-2 rounded bg-black text-white disabled:opacity-50"
              disabled={!canCreate}
            >
              {creating ? "Wird erstellt…" : "Erstellen"}
            </button>
            {createErr && (
              <span className="text-red-600 text-sm">{createErr}</span>
            )}
          </div>
        </form>
      </section>

      <section className="space-y-2">
        <h2 className="font-medium">Liste</h2>
        {err && <div className="text-red-600 text-sm">{err}</div>}
        {loading && items.length === 0 ? (
          <div className="opacity-70">Lade Experimente…</div>
        ) : items.length === 0 ? (
          <div className="opacity-70">Keine Einträge.</div>
        ) : (
          <ul className="divide-y border rounded">
            {items.map((exp) => (
              <li key={exp.id} className="p-4 flex flex-col gap-2 sm:flex-row sm:items-center">
                <div className="flex-1">
                  <div className="font-medium">{exp.name}</div>
                  <div className="text-sm opacity-80">
                    {exp.description || "—"} · {exp.type}/{exp.strategy} ·{" "}
                    {new Date(exp.createdAt).toLocaleString()}
                  </div>
                  {Array.isArray(exp.arms) && exp.arms.length > 0 && (
                    <div className="text-sm mt-1">
                      Arme:{" "}
                      {exp.arms
                        .map(
                          (a) =>
                            `${a.name} (${a.initialSplit}%${
                              a.isChampion ? ", champion" : ""
                            })`
                        )
                        .join(" · ")}
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => onDelete(exp.id)}
                    className="px-3 py-1.5 rounded border hover:bg-red-50"
                    title="Löschen"
                  >
                    Löschen
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
