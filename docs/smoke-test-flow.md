# 🚦 AIX Aleph – Smoke-Test Flow (Commands & Reihenfolge)

## 0) Einmalige Vorbereitung
```bash
# im Projektwurzelordner
cd backend
cp .env.example .env   # falls noch nicht vorhanden
# im .env: JWT_SECRET setzen, DATABASE_URL prüfen

# DB vorbereiten
npm install
npm run db:push        # Prisma schema anwenden
npm run db:seed        # optionale Testdaten
