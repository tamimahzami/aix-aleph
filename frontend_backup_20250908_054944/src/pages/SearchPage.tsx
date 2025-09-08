// src/pages/SearchPage.tsx
import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { api, type SearchItem } from "../lib/api";

export default function SearchPage() {
  const [params, setParams] = useSearchParams();
  const qParam = (params.get("q") || "").trim();
  const [q, setQ] = React.useState(qParam);
  const [items, setItems] = React.useState<SearchItem[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const navigate = useNavigate();
  const debounced = useDebounce(q, 250);

  React.useEffect(() => {
    let alive = true;
    const term = debounced.trim();
    setError(null);

    if (!term) {
      setItems([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    api
      .search(term)
      .then((res) => { if (alive) setItems(res as SearchItem[]); })
      .catch((e: any) => { if (alive) setError(e?.message || "Search failed"); })
      .finally(() => alive && setLoading(false));

    return () => { alive = false; };
  }, [debounced]);

  // Querystring aktuell halten (für Share/Back-Button)
  React.useEffect(() => {
    const current = (params.get("q") || "").trim();
    if (q.trim() !== current) {
      const next = new URLSearchParams(params);
      if (q.trim()) next.set("q", q.trim()); else next.delete("q");
      setParams(next, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const term = q.trim();
    if (!term) return;
    // Trigger sofortige Suche (debounce greift ohnehin)
    setQ(term);
  }

  return (
    <div className="max-w-[1100px] mx-auto px-4 py-6">
      <header className="mb-4">
        <h1 className="text-2xl font-bold">Suche</h1>
        <p className="text-white/60 text-sm">Ergebnisse für Daten, Professoren, Experimente & Seiten</p>
      </header>

      {/* Suchleiste */}
      <form onSubmit={onSubmit} className="mb-4">
        <div className="relative">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Suchen… (z.B. Ada, Charging, Settings)"
            className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 pr-11 text-sm text-white placeholder-white/50 outline-none focus:border-white/25 focus:ring-2 focus:ring-white/20"
            aria-label="Suchbegriff"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg border border-white/10 text-sm text-white/85 hover:bg-white/10 transition"
            aria-label="Suchen"
          >
            Suchen
          </button>
        </div>
      </form>

      {/* Status */}
      {loading && <div className="text-white/70">Lade…</div>}
      {error && <div className="text-red-400">{error}</div>}

      {/* Empty states */}
      {!loading && !error && !q.trim() && (
        <Empty hint="Gib oben einen Suchbegriff ein – wir finden Inhalte in Personen, Experimenten und Seiten." />
      )}
      {!loading && !error && q.trim() && items.length === 0 && (
        <Empty hint="Keine Treffer. Versuch es mit einem anderen Begriff." />
      )}

      {/* Trefferliste */}
      {!loading && !error && items.length > 0 && (
        <ul role="list" className="grid gap-2">
          {items.map((it) => (
            <li key={it.id}>
              <button
                onClick={() => navigate(it.href)}
                className="w-full text-left px-3 py-2 rounded-lg border border-white/10 hover:border-white/20 hover:bg-white/5 transition"
              >
                <div className="flex items-start gap-3">
                  <Badge kind={it.type} />
                  <div className="min-w-0">
                    <div className="font-medium truncate" dangerouslySetInnerHTML={{ __html: highlight(it.title, q) }} />
                    {it.subtitle && (
                      <div
                        className="text-xs text-white/60 truncate"
                        dangerouslySetInnerHTML={{ __html: highlight(it.subtitle, q) }}
                      />
                    )}
                    <div className="text-[11px] text-white/40 mt-1">{it.href}</div>
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* — Badge — */
function Badge({ kind }: { kind: string }) {
  const map: Record<string, string> = {
    professor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    experiment: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    page: "bg-white/10 text-white/80 border-white/20",
  };
  const cls = map[kind] || "bg-white/10 text-white/80 border-white/20";
  return (
    <span className={`inline-flex shrink-0 items-center border text-[10px] px-1.5 py-0.5 rounded-full ${cls}`}>
      {kind}
    </span>
  );
}

/* — Empty — */
function Empty({ hint }: { hint: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-white/70">
      {hint}
    </div>
  );
}

/* — simple highlighter (XSS-safe-ish via escape) — */
function highlight(text: string, query: string) {
  const q = query.trim();
  if (!q) return escapeHTML(text);
  try {
    const re = new RegExp(`(${escapeRegExp(q)})`, "ig");
    return escapeHTML(text).replace(re, "<mark class='bg-yellow-400/30'>$1</mark>");
  } catch {
    return escapeHTML(text);
  }
}
function escapeHTML(s: string) {
  return s.replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[m]!));
}
function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/* — debounce hook — */
function useDebounce<T>(value: T, delay = 300) {
  const [state, setState] = React.useState(value);
  React.useEffect(() => {
    const id = setTimeout(() => setState(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return state;
}
