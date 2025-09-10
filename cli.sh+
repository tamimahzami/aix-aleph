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
