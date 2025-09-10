#!/bin/bash
set -e

echo "== Pfad & Node/NPM =="
pwd; node -v; npm -v; echo

echo "== Zuletzt geänderte Dateien (Top 20, ohne node_modules/build) =="
find . -type f -not -path "*/node_modules/*" -not -path "*/build/*" -not -path "*/dist/*" \
 -exec stat -f "%m %N" {} \; 2>/dev/null | sort -nr | head -20 \
 | awk '{ cmd="date -r "$1" +\"%Y-%m-%d %H:%M:%S\""; cmd|getline d; close(cmd); $1=""; sub(/^ /,""); print d"  "$0 }'
echo

echo "== Backups & DB =="
[ -f backend/prisma/dev.db ] && ls -lh backend/prisma/dev.db || echo "WARN: backend/prisma/dev.db fehlt"
[ -d backend/backups ] && (echo "-- backups/ (neueste 10) --"; ls -lht backend/backups | sed '1,1d' | head -10) || echo "Kein backups/ Ordner"
echo

echo "== Backend package.json (Ausschnitt) =="
[ -f backend/package.json ] && head -n 40 backend/package.json || echo "WARN: backend/package.json fehlt"
echo

echo "== server.js vorhanden & app.listen vorhanden? =="
[ -f backend/server.js ] && (head -n 40 backend/server.js; echo; grep -n "app.listen" backend/server.js || true) || echo "WARN: backend/server.js fehlt"
echo

echo "== .env Backend =="
[ -f backend/.env ] && head -n 20 backend/.env || echo "WARN: backend/.env fehlt"
echo

echo "== Prisma Validate/Generate =="
( cd backend && npx prisma validate || true; cd backend && npx prisma generate || true )
echo

echo "== Port 5001 belegt? =="
lsof -i :5001 || echo "Port 5001 frei"
echo

echo "== Frontend Struktur =="
[ -d frontend/src ] && (find frontend/src -maxdepth 2 -type f | sort | head -n 40) || echo "WARN: frontend/src fehlt"
echo

echo "== Frontend package.json (Ausschnitt) =="
[ -f frontend/package.json ] && head -n 40 frontend/package.json || echo "WARN: frontend/package.json fehlt"
echo

echo "== Wichtige Frontend Dateien =="
for f in frontend/src/index.js frontend/src/App.jsx frontend/src/pages/Home.jsx frontend/src/components/Footer.jsx frontend/src/context/RegionContext.jsx frontend/src/i18n.js ; do
  if [ -f "$f" ]; then echo "OK: $f"; else echo "FEHLT: $f"; fi
done
echo

echo "== Leaflet Icon-Patch vorhanden? =="
[ -f frontend/src/map/leafletIcons.js ] && (echo "OK: leafletIcons.js"; head -n 20 frontend/src/map/leafletIcons.js) || echo "WARN: frontend/src/map/leafletIcons.js fehlt"
echo "==== QUICKSCAN fertig ===="
