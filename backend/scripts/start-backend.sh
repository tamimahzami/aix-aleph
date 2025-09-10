#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ENV_FILE="$ROOT/.env"

# Default-Port, falls .env fehlt oder PORT nicht gesetzt
PORT_DEFAULT=5001
if [ -f "$ENV_FILE" ]; then
  # einfachen PORT-Parser: nimmt die letzte Zeile "PORT=..."
  PORT="$(grep -E '^PORT=' "$ENV_FILE" | tail -n1 | sed -E 's/^PORT="?([^"]*)"?/\1/')"
else
  PORT=""
fi
PORT="${PORT:-$PORT_DEFAULT}"

# existierenden Prozess auf dem Port abschießen (falls vorhanden)
PID="$(lsof -tiTCP:$PORT -sTCP:LISTEN || true)"
if [ -n "$PID" ]; then
  echo "Kill process on :$PORT (PID=$PID)"
  kill -9 "$PID" || true
fi

echo "Starting backend on :$PORT ..."
cd "$ROOT"
PORT="$PORT" node server.js
