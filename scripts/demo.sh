#!/usr/bin/env bash
set -euo pipefail

BASE="http://localhost:5001/api"

echo "1) Neues Experiment anlegen…"
RESP=$(
  curl -s -X POST "$BASE/experiments" \
    -H "Content-Type: application/json" \
    -d '{
      "name":"Demo Explicit",
      "status":"DRAFT",
      "arms":[{"name":"A","weight":0.5},{"name":"B","weight":0.5}]
    }'
)
echo "$RESP" | jq
ID=$(echo "$RESP" | jq -r '.id')
echo "ID=$ID"

echo "2) Status -> RUNNING…"
curl -s -X PATCH "$BASE/experiments/$ID" \
  -H "Content-Type: application/json" \
  -d '{"status":"RUNNING"}' | jq

echo "3) Metrik hinzufügen…"
curl -s -X POST "$BASE/experiments/$ID/metrics" \
  -H "Content-Type: application/json" \
  -d '{"name":"ctr","value":0.42}' | jq

echo "4) Dashboard:"
curl -s "$BASE/dashboard" | jq
