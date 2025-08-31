#!/usr/bin/env bash
# scripts/smoke.sh
# Minimaler End-to-End-Check für das Frontend: Lint → Format-Check → Tests → Build
# Abbruch bei erstem Fehler.

set -euo pipefail

section() { echo -e "\n\033[1;36m▶ $1\033[0m"; }
ok()      { echo -e "\033[1;32m✔ $1\033[0m"; }
fail()    { echo -e "\033[1;31m✘ $1\033[0m"; }

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

section "Umgebungsinfo"
node -v
npm -v
ok "Node & npm vorhanden"

section "Basis-Dateien prüfen"
REQUIRED_FILES=(
  "package.json"
  "src/App.jsx"
  "src/index.js"
  "src/components/Header.jsx"
  "src/components/Footer.jsx"
  "src/styles/AppLayout.module.css"
  "src/setupTests.js"
)
for f in "${REQUIRED_FILES[@]}"; do
  if [[ ! -f "$f" ]]; then
    fail "Fehlt: $f"
    exit 1
  fi
done
ok "Alle Kern-Dateien gefunden"

section "ESLint (Lint)"
npm run -s lint || { fail "ESLint Fehler"; exit 1; }
ok "Lint fehlerfrei"

section "Prettier (Format-Check)"
# Wenn du ‚fmt‘ absichtlich schreibend nutzen willst, ersetze den Check durch: npm run fmt
npm run fmt || { fail "Prettier Format-Check fehlgeschlagen"; exit 1; }
ok "Prettier OK"

section "Jest (Unit/Component Tests)"
npm run -s test:ci || { fail "Tests fehlgeschlagen"; exit 1; }
ok "Tests OK"

section "React Build (Produktions-Build)"
# CI=true → quiet output; Build bricht bei echten Fehlern ab
CI=true npm run -s build || { fail "Build fehlgeschlagen"; exit 1; }
ok "Build OK"

section "Smoke erfolgreich 🎉"
echo "Alles sauber: Lint, Format, Tests und Build."
