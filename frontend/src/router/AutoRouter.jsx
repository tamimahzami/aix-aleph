import React, { lazy, useMemo } from "react";

// Alle Pages: .jsx und .tsx
const modules = import.meta.glob("../pages/**/*.{jsx,tsx}");

const PREFERRED_EXT = [".tsx", ".jsx"];
const SPECIALS = new Map([
  ["landing", "/"],
  ["home", "/"],
  ["homepage", "/"],
  ["impressum", "/legal/impressum"],
  ["datenschutz", "/legal/datenschutz"],
  ["agb", "/legal/agb"],
  ["cookies", "/legal/cookies"],
]);

function toPath(fileKey) {
  let path = fileKey
    .replace("../pages", "")
    .replace(/\/index\.(jsx|tsx)$/i, "/")
    .replace(/\.(jsx|tsx)$/i, "")
    .replace(/\/+/g, "/");
  const base = path.split("/").pop()?.toLowerCase() ?? "";
  if (SPECIALS.has(base)) path = SPECIALS.get(base);
  return (path || "/").toLowerCase();
}
function extOf(key){ const m = key.match(/\.(jsx|tsx)$/i); return m ? "."+m[1].toLowerCase() : ""; }

/** Gibt ein Array von <Route>-Elementen zurück (ohne eigenen <Routes>-Wrapper) */
export default function AutoRouter({ exclude = [] }) {
  const EXCLUDE = new Set(exclude.map(p => p.toLowerCase()));

  const routes = useMemo(() => {
    const candidates = new Map();
    for (const [key, loader] of Object.entries(modules)) {
      const path = toPath(key);
      if (EXCLUDE.has(path) || path === "/notfound") continue;
      const ext = extOf(key);
      const cur = candidates.get(path);
      if (!cur) candidates.set(path, { loader, ext });
      else {
        const curIdx = PREFERRED_EXT.indexOf(cur.ext);
        const newIdx = PREFERRED_EXT.indexOf(ext);
        if (newIdx !== -1 && (curIdx === -1 || newIdx < curIdx)) {
          candidates.set(path, { loader, ext });
        }
      }
    }
    const arr = Array.from(candidates.entries()).map(([path, { loader }]) => ({
      path, Component: lazy(loader),
    }));
    arr.sort((a, b) => (a.path === "/" ? -1 : b.path === "/" ? 1 : a.path.localeCompare(b.path)));
    if (import.meta.env.DEV) {
      console.info("[AutoRouter] Routen:", arr.map(r => r.path));
    }
    return arr;
  }, [exclude.join("|")]);

  // ACHTUNG: Hier KEIN <Routes>, nur die Route-Elemente zurückgeben.
  return routes.map(({ path, Component }) => (
    <Route key={path} path={path} element={<Component />} />
  ));
}
