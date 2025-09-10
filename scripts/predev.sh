#!/usr/bin/env bash
# scripts/predev.sh — killt alte Dev-Prozesse auf 3001 (FE) & 5001 (BE)

set -e

kill_port() {
  PORT="$1"
  if lsof -ti tcp:"$PORT" >/dev/null 2>&1; then
    echo "⚠️  Port $PORT belegt – beende Prozess(e)…"
    lsof -ti tcp:"$PORT" | xargs -r kill -9 || true
  fi
}

kill_port 3001
kill_port 5001

echo "✅ Ports 3001/5001 sind frei."
