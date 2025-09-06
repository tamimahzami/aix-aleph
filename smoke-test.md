# 🛠️ AIX Aleph – Smoke Test Checkliste

## ✅ Backend
- [ ] Server startet (`npm run dev` im backend)
- [ ] Health-Route erreichbar: [http://localhost:5001/api/health](http://localhost:5001/api/health)
- [ ] Datenbankverbindung (Postgres) hergestellt
- [ ] Seed-Skript erfolgreich durchgelaufen (`npm run db:seed`)

## ✅ Frontend
- [ ] Dev-Server startet (`npm run dev` im frontend)
- [ ] Landing Page lädt auf [http://localhost:5173](http://localhost:5173)
- [ ] Header + Navigation sichtbar
- [ ] Login/Registrieren erreichbar
- [ ] Dashboard lädt nach erfolgreichem Login

## ✅ API-Integration
- [ ] Experiments-API liefert Daten
- [ ] Leads-API liefert Daten
- [ ] Auth-Flow (Login/Logout) funktioniert

## ✅ Zusätzliche Checks
- [ ] CORS zwischen Frontend und Backend korrekt konfiguriert
- [ ] JWT-Token wird im LocalStorage gesetzt
- [ ] Mobile Navigation (Burger-Menu) funktioniert
