// scripts/list-pages.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ---- Settings ----
const PAGE_ROOTS = [
  "src/pages",         // rekursiv
  "src/pages/auth",
  "src/pages/legal",
  "src/pages/company",
  "src/pages/tech",
];

const EXT_REGEX = /\.(jsx|tsx)$/i;
const INDEX_REGEX = /\/index\.(jsx|tsx)$/i;

// ---- Helpers ----
function scanRecursive(dirAbs, acc = []) {
  if (!fs.existsSync(dirAbs)) return acc;
  for (const entry of fs.readdirSync(dirAbs, { withFileTypes: true })) {
    const entryPath = path.join(dirAbs, entry.name);
    if (entry.isDirectory()) {
      scanRecursive(entryPath, acc);
    } else if (EXT_REGEX.test(entry.name)) {
      acc.push(entryPath);
    }
  }
  return acc;
}

function toRel(p) {
  return path.relative(path.join(__dirname, ".."), p).replaceAll("\\", "/");
}

function fileToRoute(relPath) {
  // src/pages/legal/Impressum.jsx -> /legal/impressum
  let route = relPath.replace(/^src\/pages/i, "");
  route = route.replace(INDEX_REGEX, "/");       // /foo/index.jsx -> /foo/
  route = route.replace(EXT_REGEX, "");          // /foo/Bar.jsx -> /foo/Bar
  route = route.replace(/\/+/g, "/");
  if (route === "") route = "/";
  route = route.toLowerCase();
  // Sauberkeit: ohne trailing slash außer root
  if (route !== "/" && route.endsWith("/")) route = route.slice(0, -1);
  return route;
}

async function loadNav() {
  const navPath = path.join(__dirname, "..", "src", "nav.config.js");
  if (!fs.existsSync(navPath)) return { routes: [] };
  const nav = await import(navPath);
  return nav;
}

// ---- Main ----
(async () => {
  // 1) Alle Page-Dateien sammeln
  const absFiles = PAGE_ROOTS.flatMap(p =>
    scanRecursive(path.join(__dirname, "..", p))
  );
  const files = absFiles.map(toRel).sort();

  // 2) Routen aus nav.config.js laden
  const nav = await loadNav();
  const navRoutes = Array.isArray(nav.routes) ? nav.routes : [];
  const definedPaths = new Set(navRoutes.map(r => String(r.path || "").toLowerCase()));

  // 3) Mapping file -> inferred route
  const inferred = files.map(f => ({ file: f, route: fileToRoute(f) }));

  // 4) Fehlliste bestimmen (Dateien ohne exakte Route)
  const missing = inferred.filter(({ route }) => !definedPaths.has(route));

  const asJson = process.argv.includes("--json");

  if (asJson) {
    console.log(JSON.stringify({
      foundFiles: files,
      inferredRoutes: inferred,
      navRoutes: navRoutes.map(r => ({ path: r.path, label: r.label })),
      missing: missing,
    }, null, 2));
  } else {
    console.log("Gefundene Page-Dateien:\n");
    for (const f of files) console.log(" -", f);

    console.log(`\nRouten in nav.config.js: ${navRoutes.length}`);
    if (navRoutes.length) {
      console.log("Beispiele:");
      for (const r of navRoutes.slice(0, 6)) {
        console.log(` - ${r.path}  ${r.label ? `(${r.label})` : ""}`);
      }
      if (navRoutes.length > 6) console.log("   …");
    }

    if (missing.length) {
      console.log("\n⚠️  Dateien ohne (exakte) Route in nav.config.js:");
      for (const m of missing) {
        console.log(` - ${m.file}  →  Vorschlag: ${m.route}`);
      }
      console.log("\nTipp: Ergänze die fehlenden Pfade in src/nav.config.js.");
    } else {
      console.log("\n✅ Alle Dateien scheinen in nav.config.js abgebildet zu sein (exakter Vergleich).");
    }
  }

  // 5) Exit-Code für CI/Pre-commit
  process.exit(missing.length ? 1 : 0);
})();
