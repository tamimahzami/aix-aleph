#!/usr/bin/env bash
set -euo pipefail

API="${API:-http://localhost:5001}"
EMAIL="${1:-user1@example.com}"
PASS="${2:-Passw0rd!}"

echo "Health:"
curl -s "$API/health" | jq .

echo "Register (${EMAIL}):"
curl -s -X POST "$API/api/auth/register" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"${EMAIL}\",\"password\":\"${PASS}\"}" | jq .

echo "Login:"
TOKEN="$(curl -s -X POST "$API/api/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"${EMAIL}\",\"password\":\"${PASS}\"}" | jq -r .token || true)"

if [[ -z "${TOKEN}" || "${TOKEN}" == "null" ]]; then
  echo "Login fehlgeschlagen – kein Token erhalten." >&2
  exit 1
fi

echo "TOKEN=${TOKEN}"

echo "Protected:"
curl -s "$API/api/protected" -H "Authorization: Bearer ${TOKEN}" | jq .
