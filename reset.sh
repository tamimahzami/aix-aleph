#!/usr/bin/env bash
set -euo pipefail

# -------------------------------------------------------
# Konfiguration
# -------------------------------------------------------
# Für den Smoke-Test sprechen wir direkt das Backend an,
# damit Proxy-Probleme (Nginx) den Test nicht verfälschen.
API_URL="${API_URL:-http://localhost:5001}"  # :5001 direkt Backend
HEALTH_BACKEND="${HEALTH_BACKEND:-http://localhost:5001/api/health}"
HEALTH_FRONTEND="${HEALTH_FRONTEND:-http://localhost:3000/api/health}"

# -------------------------------------------------------
# Helper: warten bis Endpoint HTTP 200 liefert
# -------------------------------------------------------
wait_for() {
  local url="$1"
  local name="${2:-service}"
  local tries=60
  local sleep_s=1

  echo "⏳ Warte auf $name ($url)…"
  for i in $(seq 1 "$tries"); do
    code="$(curl -sS -o /dev/null -w '%{http_code}' "$url" || true)"
    if [ "$code" = "200" ]; then
      echo "✅ $name erreichbar."
      return 0
    fi
    sleep "$sleep_s"
  done

  echo "❌ $name wurde nicht gesund in ${tries}s (last status: ${code})."
  return 1
}

# -------------------------------------------------------
# Down + lokale Dev-Ports freiräumen
# -------------------------------------------------------
echo "🔧 Stoppe Docker-Stack…"
docker compose down -v || true

echo "🧹 Räume lokale Dev-Ports (5173/5174) auf…"
pkill -f "vite --host" 2>/dev/null || true
lsof -ti :5173 | xargs kill -9 2>/dev/null || true
lsof -ti :5174 | xargs kill -9 2>/dev/null || true

# -------------------------------------------------------
# CLI & Makefile sicherstellen
# -------------------------------------------------------
echo "📝 Stelle CLI & Makefile sicher…"

# cli.sh (kleiner Helper für manuelle Tests; standard: via Proxy :3000)
cat > cli.sh <<'EOS'
#!/usr/bin/env bash
set -euo pipefail

API_URL=${API_URL:-http://localhost:3000}  # via Nginx-Proxy

usage() {
  cat <<HELP
Usage: ./cli.sh <command> [args]

Commands:
  list                          Listet Experimente
  create                        Erstellt Smoke-Test-Experiment
  patch <ID>                    Setzt Status auf RUNNING
  metric <ID>                   Fügt Beispiel-Metrik an
  get <ID>                      Holt ein Experiment
  delete <ID>                   Löscht ein Experiment
HELP
}

cmd="${1:-}"; shift || true

case "${cmd}" in
  list)
    curl -sS "$API_URL/api/experiments" | jq
    ;;

  create)
    curl -sS -X POST "$API_URL/api/experiments" \
      -H 'Content-Type: application/json' \
      -d '{"name":"Smoke Test","description":"via cli","type":"AB","status":"DRAFT","strategy":"FIXED","arms":[{"name":"A","initialSplit":50,"isChampion":true},{"name":"B","initialSplit":50}]}' | jq
    ;;

  patch)
    ID="${1:-}"; [ -n "${ID}" ] || { echo "Fehlende ID"; exit 2; }
    curl -sS -X PATCH "$API_URL/api/experiments/$ID" \
      -H 'Content-Type: application/json' \
      -d '{"status":"RUNNING"}' | jq
    ;;

  metric)
    ID="${1:-}"; [ -n "${ID}" ] || { echo "Fehlende ID"; exit 2; }
    curl -sS -X POST "$API_URL/api/experiments/$ID/metrics" \
      -H 'Content-Type: application/json' \
      -d '{"key":"ctr","value":0.42}' | jq
    ;;

  get)
    ID="${1:-}"; [ -n "${ID}" ] || { echo "Fehlende ID"; exit 2; }
    curl -sS "$API_URL/api/experiments/$ID" | jq
    ;;

  delete)
    ID="${1:-}"; [ -n "${ID}" ] || { echo "Fehlende ID"; exit 2; }
    curl -sS -X DELETE "$API_URL/api/experiments/$ID" | jq
    ;;

  *)
    usage
    exit 1
    ;;
esac
EOS
chmod +x cli.sh

# Makefile (Convenience Targets)
cat > Makefile <<'EOS'
SHELL := /bin/bash

.PHONY: up down logs be fe smoke

up:
	docker compose up -d --build

down:
	docker compose down -v

logs:
	docker compose logs -f

be:
	curl -sS http://localhost:5001/api/health | jq

fe:
	curl -sS http://localhost:3000/api/health | jq

smoke:
	API_URL=http://localhost:5001 ./cli.sh create
EOS

# -------------------------------------------------------
# Build & Up
# -------------------------------------------------------
echo "🚀 Baue & starte neu…"
docker compose up -d --build

# -------------------------------------------------------
# Health Checks
# -------------------------------------------------------
wait_for "$HEALTH_BACKEND"  "Backend"
wait_for "$HEALTH_FRONTEND" "Frontend"

echo "✅ Checks:"
curl -sS "$HEALTH_BACKEND"  || true
curl -sS "$HEALTH_FRONTEND" || true
echo

# -------------------------------------------------------
# Smoke-Test (create → patch → metric → delete) direkt ans Backend
# -------------------------------------------------------
echo "🧪 Starte Smoke-Test (create → patch → metric → delete) über ${API_URL} …"

# 1) create (mit Debug-Ausgabe)
CREATE_RESP="$(
  curl -sS -w '\n%{http_code}' -X POST "$API_URL/api/experiments" \
    -H 'Content-Type: application/json' \
    -d '{"name":"Smoke Test","description":"via reset.sh","type":"AB","status":"DRAFT","strategy":"FIXED","arms":[{"name":"A","initialSplit":50,"isChampion":true},{"name":"B","initialSplit":50}]}'
)"
CREATE_BODY="$(printf "%s" "$CREATE_RESP" | sed '$d')"
CREATE_CODE="$(printf "%s" "$CREATE_RESP" | tail -n1 || true)"
EXP_ID="$(printf "%s" "$CREATE_BODY" | jq -r '.id // empty' || true)"

if [ -z "${EXP_ID:-}" ]; then
  echo "❌ Smoke-Test: create fehlgeschlagen."
  echo "HTTP $CREATE_CODE, Antwort:"
  echo "$CREATE_BODY" | jq . 2>/dev/null || echo "$CREATE_BODY"
  exit 1
fi
echo "   ➤ created: $EXP_ID"

# 2) patch
PATCH_BODY="$(
  curl -sS -X PATCH "$API_URL/api/experiments/$EXP_ID" \
    -H 'Content-Type: application/json' \
    -d '{"status":"RUNNING"}'
)"
STATUS_NOW="$(printf "%s" "$PATCH_BODY" | jq -r '.status // empty' || true)"
if [ "$STATUS_NOW" != "RUNNING" ]; then
  echo "❌ Smoke-Test: patch fehlgeschlagen."
  echo "$PATCH_BODY" | jq . 2>/dev/null || echo "$PATCH_BODY"
  exit 1
fi
echo "   ➤ patched → RUNNING"

# 3) metric
METRIC_BODY="$(
  curl -sS -X POST "$API_URL/api/experiments/$EXP_ID/metrics" \
    -H 'Content-Type: application/json' \
    -d '{"key":"ctr","value":0.42}'
)"
MID="$(printf "%s" "$METRIC_BODY" | jq -r '.id // empty' || true)"
if [ -z "$MID" ]; then
  echo "❌ Smoke-Test: metric fehlgeschlagen."
  echo "$METRIC_BODY" | jq . 2>/dev/null || echo "$METRIC_BODY"
  exit 1
fi
echo "   ➤ metric added (id: $MID)"

# 4) delete
DEL_BODY="$(curl -sS -X DELETE "$API_URL/api/experiments/$EXP_ID")"
OK_DEL="$(printf "%s" "$DEL_BODY" | jq -r '.ok // empty' || true)"
if [ "$OK_DEL" != "true" ]; then
  echo "❌ Smoke-Test: delete fehlgeschlagen."
  echo "$DEL_BODY" | jq . 2>/dev/null || echo "$DEL_BODY"
  exit 1
fi
echo "   ➤ deleted"

echo "🎉 Smoke-Test erfolgreich abgeschlossen."
