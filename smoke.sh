#!/usr/bin/env bash
set -euo pipefail

echo "== Healthchecks =="
curl -s http://127.0.0.1:5001/api/health | jq .
curl -s http://127.0.0.1:3001/api/health | jq .

echo "== List (leer/aktuell) =="
curl -s http://127.0.0.1:5001/api/experiments | jq .

echo "== Create =="
NEW=$(curl -s -X POST http://127.0.0.1:5001/api/experiments \
  -H 'Content-Type: application/json' \
  -d '{"name":"Smoke Demo","description":"script","type":"AB","strategy":"FIXED","arms":[{"name":"Champion","initialSplit":50},{"name":"Challenger","initialSplit":50}]}')
echo "$NEW" | jq .

ID=$(echo "$NEW" | jq -r .id)

echo "== Verify list =="
curl -s http://127.0.0.1:5001/api/experiments | jq .

echo "== Delete =="
curl -s -X DELETE "http://127.0.0.1:5001/api/experiments/$ID" | jq .

echo "== Final list =="
curl -s http://127.0.0.1:5001/api/experiments | jq .

