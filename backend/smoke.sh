#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${BASE_URL:-http://127.0.0.1:5001}"

# Globale Antwort-Variablen
RESP_STATUS=""
RESP_BODY=""

request() {
  local method="$1"; shift
  local url="$1"; shift || true
  local data="${1-}"

  local tmp; tmp="$(mktemp)"
  local status
  if [[ -n "${data}" ]]; then
    status="$(curl -sS -L -X "${method}" "${url}" \
      -H 'Content-Type: application/json' \
      --data "${data}" -o "${tmp}" -w '%{http_code}')"
  else
    status="$(curl -sS -L -X "${method}" "${url}" \
      -o "${tmp}" -w '%{http_code}')"
  fi

  RESP_STATUS="${status}"
  RESP_BODY="$(cat "${tmp}")"
  rm -f "${tmp}"
}

pretty() {
  if jq -e . >/dev/null 2>&1 <<<"$RESP_BODY"; then
    jq <<<"$RESP_BODY"
  else
    printf '%s\n' "$RESP_BODY"
  fi
}

echo "== Healthchecks =="
request GET "${BASE_URL}/api/health"
if [[ "${RESP_STATUS}" == "200" ]]; then pretty; else echo "HTTP ${RESP_STATUS}"; fi

echo "== List (leer/aktuell) =="
request GET "${BASE_URL}/api/experiments"; pretty

echo "== Create =="
create='{"name":"Smoke Demo","type":"AB","strategy":"FIXED","arms":[{"name":"Champion","initialSplit":50,"isChampion":true},{"name":"Challenger","initialSplit":50}]}'
request POST "${BASE_URL}/api/experiments" "${create}"; pretty
id="$(jq -r '.id' <<<"$RESP_BODY")"

echo "== Verify list =="
request GET "${BASE_URL}/api/experiments"; pretty

echo "== Delete =="
request DELETE "${BASE_URL}/api/experiments/${id}"; pretty

echo "== Final list =="
request GET "${BASE_URL}/api/experiments"; pretty

echo "============================================"
