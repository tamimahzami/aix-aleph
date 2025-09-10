// src/components/common/SearchBox.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

/**
 * Schlanke Header-Suche:
 * - Navigiert zu der aktuellen Seite mit ?q=...
 * - Du kannst später eine echte /search-Route anschließen.
 */
export default function SearchBox({ placeholder = "Suche…" }) {
  const nav = useNavigate();
  const loc = useLocation();
  const params = new URLSearchParams(loc.search);
  const [q, setQ] = useState(params.get("q") || "");

  function onSubmit(e) {
    e.preventDefault();
    const next = new URLSearchParams(loc.search);
    if (q) next.set("q", q);
    else next.delete("q");
    nav(`${loc.pathname}?${next.toString()}`);
  }

  return (
    <form onSubmit={onSubmit} className="hidden sm:flex items-center">
      <div className="relative">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={placeholder}
          className="w-56 md:w-72 rounded-lg bg-muted/70 border border-border px-9 py-2
                     focus:outline-none focus:ring-2 focus:ring-ring text-sm"
          aria-label="Suche"
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 select-none" aria-hidden>
          🔍
        </span>
        <button
          type="submit"
          className="absolute right-1 top-1/2 -translate-y-1/2 px-2 py-1 text-sm rounded-md
                     hover:bg-muted"
        >
          Suchen
        </button>
      </div>
    </form>
  );
}
