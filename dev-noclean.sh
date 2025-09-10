#!/usr/bin/env bash
set -euo pipefail

for p in 5001 5173; do
  P=$(lsof -ti :$p || true)
  [ -n "$P" ] && kill -9 $P || true
done

# Backend & Frontend in den Hintergrund
(cd ~/Desktop/UW_PICO_5.09/backend && npm run dev) > /tmp/aix-backend.log 2>&1 &
(cd ~/Desktop/UW_PICO_5.09/frontend && npm run dev) > /tmp/aix-frontend.log 2>&1 &

echo "Backend:  http://localhost:5001/api"
echo "Frontend: http://localhost:5173/"
echo "Logs:     tail -f /tmp/aix-backend.log /tmp/aix-frontend.log"
