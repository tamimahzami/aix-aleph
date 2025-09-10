#!/bin/sh
set -e

export DATABASE_URL="${DATABASE_URL:-file:/data/dev.db}"

echo "🗃️ Prisma migrate deploy…"
npx prisma migrate deploy || (echo "⚠️ migrate deploy fehlgeschlagen, fallback db push…" && npx prisma db push)

echo "🚀 Starte API…"
exec node server.js
