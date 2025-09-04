#!/usr/bin/env bash
set -euo pipefail

DOCKER_MODE="${1:-}"

echo "⛔ Ports räumen…"
for p in 5001 5173; do
  P=$(lsof -ti :$p || true)
  if [ -n "$P" ]; then
    echo "• Kille Prozess auf Port $p (PID $P)…"
    kill -9 $P || true
  fi
done

if [ "$DOCKER_MODE" = "--docker" ]; then
  echo "🐳 Starte Backend via Docker…"
  if ! docker info >/dev/null 2>&1; then
    echo "❌ Docker läuft nicht. Bitte Docker Desktop starten und erneut versuchen."
    exit 1
  fi
  docker compose up -d backend
  echo "⏳ Warte auf Backend Health…"
  until curl -fsS http://localhost:5001/api/health >/dev/null; do sleep 1; done
  echo "✓ Backend OK: http://localhost:5001/api/health"
else
  echo "🟣 Starte lokales Backend…"
  (cd ~/Desktop/UW_PICO_5.09/backend && npm run dev) > /tmp/aix-backend.log 2>&1 &
  echo "⏳ Warte auf Backend Health…"
  until curl -fsS http://localhost:5001/api/health >/dev/null; do sleep 1; done
  echo "✓ Backend OK: http://localhost:5001/api/health"
fi

echo "🎨 Starte Frontend…"
(cd ~/Desktop/UW_PICO_5.09/frontend && npm run dev) > /tmp/aix-frontend.log 2>&1 &

echo "⏳ Warte auf Frontend…"
# Warten wir einfach kurz, Vite braucht nur einen Moment
sleep 2
echo "✓ Frontend startet (Vite)."

echo "🧪 API Quickcheck…"
curl -s http://localhost:5001/api/health | jq || true
curl -s http://localhost:5001/api/experiments | jq || true

echo "🌐 Öffne UI…"
echo "✅ Dev-Umgebung läuft!"
echo "   Backend:  http://localhost:5001/api"
echo "   Frontend: http://localhost:5173/"
echo "   Logs:     tail -f /tmp/aix-backend.log /tmp/aix-frontend.log"
echo
echo "❗ Beende mit STRG+C – dann wird aufgeräumt."

cleanup() {
  echo "→ Cleanup: beende Dev-Prozesse…"
  for p in 5001 5173; do
    P=$(lsof -ti :$p || true)
    [ -n "$P" ] && kill -9 $P || true
  done
  if [ "$DOCKER_MODE" = "--docker" ]; then
    docker compose down --remove-orphans || true
  fi
}
trap cleanup EXIT

# Blockieren, bis der User abbricht:
tail -f /dev/null
