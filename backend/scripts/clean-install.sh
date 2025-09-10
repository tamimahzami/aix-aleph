#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

echo "👉 Cleaning backend node_modules & lockfiles ..."
rm -rf node_modules package-lock.json pnpm-lock.yaml 2>/dev/null || true

# Corepack/Pnpm vorbereiten (Node 18+)
corepack enable >/dev/null 2>&1 || true
corepack prepare pnpm@9 --activate

echo "👉 Installing deps with pnpm ..."
pnpm install

echo "✅ Done. You can now run: pnpm start"
