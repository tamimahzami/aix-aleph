🚀 AIX Aleph – Dev Environment
Diese Anleitung hilft dir, die Entwicklungsumgebung für das AIX Aleph Frontend-Projekt einzurichten.

📦 Requirements
Node.js 22+

npm 10+

PostgreSQL (lokal oder in Docker)

Docker Desktop (für die Datenbank)

🔧 Setup
1. Projekt klonen & Abhängigkeiten installieren

# Im Terminal
git clone <REPO_URL> aix-aleph
cd aix-aleph/backend
npm install
cd ../frontend
npm install

2. Datenbank aufsetzen

# Im Projekt-Root-Verzeichnis (aix-aleph)
cp .env.example .env
# In .env DATABASE_URL anpassen
docker compose up -d postgres
# Warte kurz, bis der Container läuft, dann:
docker compose exec -T postgres psql -U postgres -v ON_ERROR_STOP=1 -c "CREATE USER aix WITH PASSWORD 'aixpass'; CREATE DATABASE aixaleph OWNER aix;"
cd backend
npx prisma db push
npm run db:seed

3. Server starten

# In einem Terminal
cd backend
npm run dev

# In einem zweiten Terminal
cd frontend
npm run dev

🔍 API aus dem UI testen
Diese Befehle kannst du in der Browser-Konsole auf http://localhost:5173/ eingeben, um die Verbindung zum Backend zu prüfen.

Health-Check: fetch("http://localhost:5001/api/health").then(r => r.json()).then(console.log)

Manifesto abrufen: fetch("http://localhost:5001/api/manifesto").then(r => r.json()).then(console.log)

Leads abrufen: fetch("http://localhost:5001/api/leads").then(r => r.json()).then(console.log)


