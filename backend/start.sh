#!/bin/sh
set -e

echo "🔧 Prisma Migration/Schema Sync..."
# Versuche, vorhandene Migrationen zu deployen
if ! npx prisma migrate deploy; then
  echo "⚠️ migrate deploy fehlgeschlagen, fallback auf db push"
  npx prisma db push
fi

# Optional Seeds (falls du Seeds eingerichtet hast)
# npx prisma db seed || true

echo "🚀 Starte Backend (server.js)..."
exec node server.jso

