#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${BASE_URL:-http://127.0.0.1:5001}"

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

echo "============================================"
echo
echo "== Healthcheck (${BASE_URL}) =="
request GET "${BASE_URL}/api/health"
if [[ "${RESP_STATUS}" == "200" ]]; then pretty; else echo "HTTP ${RESP_STATUS}"; fi

echo
echo "============================================"
echo
echo "== Aktuelle Liste (vorher) =="
request GET "${BASE_URL}/api/experiments"; pretty

echo
echo "============================================"
echo
echo "== Create =="
create='{"name":"Smoke Demo","description":"script","type":"AB","strategy":"FIXED","arms":[{"name":"Champion","initialSplit":60,"isChampion":true},{"name":"Challenger","initialSplit":40}]}'
request POST "${BASE_URL}/api/experiments" "${create}"; pretty
exp_id="$(jq -r '.id' <<<"$RESP_BODY")"

echo
echo "============================================"
echo
echo "== Update (optional, via PATCH) =="
patch='{"status":"RUNNING","notes":"Started via smoke"}'
request PATCH "${BASE_URL}/api/experiments/${exp_id}" "${patch}"; pretty

echo
echo "============================================"
echo
echo "== Metric hinzufügen =="
metric='{"key":"ctr","value":0.42}'
request POST "${BASE_URL}/api/experiments/${exp_id}/metrics" "${metric}"; pretty

echo
echo "============================================"
echo
echo "== Metrics Liste =="
request GET "${BASE_URL}/api/experiments/${exp_id}/metrics"; pretty

echo
echo "============================================"
echo
echo "== Delete (ID: ${exp_id}) =="
request DELETE "${BASE_URL}/api/experiments/${exp_id}"; pretty

echo
echo "============================================"
echo
echo "== Finale Liste =="
request GET "${BASE_URL}/api/experiments"; pretty

echo
echo "✅ Fertig."
