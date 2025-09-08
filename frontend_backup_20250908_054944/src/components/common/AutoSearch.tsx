// src/components/common/AutoSearch.tsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { api, type SearchItem } from "../../lib/api";

type Props = {
  lang: "de" | "en" | "tr";
  compact?: boolean;
};

export default function AutoSearch({ lang, compact = false }: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  const [value, setValue] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [items, setItems] = React.useState<SearchItem[]>([]);
  const [activeIndex, setActiveIndex] = React.useState(-1);

  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const listRef = React.useRef<HTMLUListElement | null>(null);

  const debounced = useDebounce(value, 250);

  React.useEffect(() => {
    setOpen(false);
    setActiveIndex(-1);
  }, [location.pathname]);

  React.useEffect(() => {
    let alive = true;
    const q = debounced.trim();
    if (!q) {
      setItems([]);
      setOpen(false);
      return;
    }
    setLoading(true);
    api
      .search(q)
      .then((res: SearchItem[]) => {
        if (!alive) return;
        setItems(res);
        setOpen(res.length > 0);
      })
      .catch(() => {
        if (!alive) return;
        setItems([]);
        setOpen(false);
      })
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [debounced]);

  // Close on click outside
  React.useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) {
        setOpen(false);
        setActiveIndex(-1);
      }
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  function onSubmitOrNavigate(target?: SearchItem) {
    if (target) {
      navigate(target.href);
      setOpen(false);
      return;
    }
    // Fallback: zu /search weiterleiten
    const q = value.trim();
    if (q) navigate(`/search?q=${encodeURIComponent(q)}`);
    setOpen(false);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      setOpen(items.length > 0);
      return;
    }
    if (!open) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % Math.max(items.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + Math.max(items.length, 1)) % Math.max(items.length, 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const sel = items[activeIndex];
      onSubmitOrNavigate(sel);
    } else if (e.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
    }
  }

  React.useEffect(() => {
    if (!open || activeIndex < 0 || !listRef.current) return;
    const el = listRef.current.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, open]);

  return (
    <div
      ref={rootRef}
      className={`relative flex-1 ${compact ? "max-w-none" : "max-w-xl"} `}
      role="combobox"
      aria-expanded={open}
      aria-owns="aix-search-listbox"
      aria-haspopup="listbox"
    >
      <label className="sr-only">{t("search", lang)}</label>
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => items.length && setOpen(true)}
        onKeyDown={onKeyDown}
        placeholder={t("searchPlaceholder", lang)}
        aria-autocomplete="list"
        aria-controls="aix-search-listbox"
        aria-activedescendant={activeIndex >= 0 ? `aix-opt-${activeIndex}` : undefined}
        className="w-full rounded-full bg-white/5 border border-white/10 px-4 py-2.5 pr-10 text-sm text-white placeholder-white/50 outline-none focus:border-white/25 focus:ring-2 focus:ring-white/20"
      />
      {/* icon */}
      <svg
        aria-hidden="true"
        className="absolute right-3 top-1/2 -translate-y-1/2"
        width="18"
        height="18"
        viewBox="0 0 24 24"
      >
        <path
          d="M11 19a8 8 0 1 1 5.293-14.293A8 8 0 0 1 11 19Zm10 2-4.35-4.35"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 mt-2 w-full rounded-xl border border-white/10 bg-[var(--color-bg)] shadow-xl">
          <ul
            id="aix-search-listbox"
            role="listbox"
            ref={listRef}
            className="max-h-72 overflow-auto py-1"
          >
            {items.map((it, idx) => (
              <li
                key={it.id}
                id={`aix-opt-${idx}`}
                data-index={idx}
                role="option"
                aria-selected={idx === activeIndex}
                onMouseEnter={() => setActiveIndex(idx)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => onSubmitOrNavigate(it)}
                className={[
                  "px-3 py-2 cursor-pointer",
                  idx === activeIndex ? "bg-white/10 text-white" : "text-white/85 hover:bg-white/5",
                ].join(" ")}
              >
                <div className="flex items-center gap-2">
                  <Badge kind={it.type} />
                  <div className="min-w-0">
                    <div className="font-medium truncate">{it.title}</div>
                    {it.subtitle && (
                      <div className="text-xs text-white/60 truncate">{it.subtitle}</div>
                    )}
                  </div>
                </div>
              </li>
            ))}

            {loading && (
              <li className="px-3 py-2 text-white/60 text-sm">{t("loading", lang)}</li>
            )}
            {!loading && items.length === 0 && debounced.trim() && (
              <li className="px-3 py-2 text-white/60 text-sm">{t("noResults", lang)}</li>
            )}
          </ul>

          {/* Footer row */}
          <div className="flex items-center justify-between px-3 py-1.5 border-t border-white/10 text-[11px] text-white/50">
            <div>{t("searchHint", lang)}</div>
            <button
              className="px-2 py-1 rounded-md border border-white/10 hover:bg-white/5"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => onSubmitOrNavigate()}
            >
              {t("openSearchPage", lang)}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* — kleine Badge für Typen — */
function Badge({ kind }: { kind: string }) {
  const map: Record<string, string> = {
    professor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    experiment: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    page: "bg-white/10 text-white/80 border-white/20",
  };
  const cls = map[kind] || "bg-white/10 text-white/80 border-white/20";
  return (
    <span className={`shrink-0 inline-flex items-center border text-[10px] px-1.5 py-0.5 rounded-full ${cls}`}>
      {kind}
    </span>
  );
}

/* — i18n — */
function t(key: string, lang: "de" | "en" | "tr") {
  const dict: Record<string, Record<typeof lang, string>> = {
    search: { de: "Suche", en: "Search", tr: "Arama" },
    searchPlaceholder: {
      de: "Suchen… (Daten, Professoren, Experimente)",
      en: "Search… (data, professors, experiments)",
      tr: "Ara… (veriler, profesörler, deneyler)",
    },
    loading: { de: "Lade…", en: "Loading…", tr: "Yükleniyor…" },
    noResults: { de: "Keine Treffer", en: "No results", tr: "Sonuç yok" },
    searchHint: {
      de: "↑/↓ wählen • Enter öffnen • Esc schließen",
      en: "↑/↓ select • Enter open • Esc close",
      tr: "↑/↓ seç • Enter aç • Esc kapat",
    },
    openSearchPage: { de: "Alle Ergebnisse", en: "All results", tr: "Tüm sonuçlar" },
  };
  return dict[key]?.[lang] ?? key;
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
