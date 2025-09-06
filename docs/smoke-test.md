# AIX Aleph – Smoke-Test Checkliste

> Ziel: Schnell prüfen, ob Frontend/Backend lokal sauber laufen.

## 1) Navbar & Routing
- Öffnen: `http://localhost:5173/`
- Logo klickt zu `/`, Menüs sichtbar, **CTA „Demo“** vorhanden.
- Routen testen: `/dashboard`, `/experiments`, `/leads`, `/professors`, `/info/impressum`.
- Fenster schmal ziehen → **MobileNav** klappt auf, Links funktionieren.

## 2) Auth-Flow
- Auf `/login` gehen.
- (Falls noch kein echter Login) Konsole: `localStorage.setItem("token","dev")` → Seite neu laden.
- Erwartung: Mit Token sind geschützte Routen erreichbar; ohne Token Redirect nach `/login`.

## 3) Dashboard – UI
- Seite `/dashboard` öffnen.
- **HealthBadge/HealthBadgeLive** wird angezeigt (Statusfarben).
- **WorldMap/Karte** rendert ohne Fehler.
- DevTools Console: keine roten Errors.

## 4) Backend / API
- Backend läuft auf `http://localhost:5001` (Terminal-Output: `listening on http://localhost:5001`).
- Test im Browser:
  - `http://localhost:5001/health` → Antwort OK.
- CORS: Keine CORS-Fehler in Console. Falls doch → Backend `.env`:  
  `CORS_ORIGINS=http://localhost:5173,http://localhost:4173`

## 5) Feature-Seiten
- `/experiments`, `/leads`, `/professors` laden ohne Crash.
- Falls API-Daten fehlen → leere Zustände/Dummy-Content, aber keine Fehler.

## 6) Navigation-Konfig
- `nav.config.js` Links prüfen (de/en/fr).
- **desktopOnly**-Links nur am Desktop sichtbar.
- **CTA** führt zum konfigurierten Pfad.

## 7) Mobile & Reloads
- MobileNav mehrfach öffnen/schließen, Links klicken → Seiten laden korrekt.
- **Hard Reload** (⌘+Shift+R / Ctrl+F5): Keine 404/Import-Fehler.

## 8) Local Storage
- DevTools → Application → Local Storage:
  - `token` vorhanden nach Login/Mock.
  - `token` löschen → Aufruf `/dashboard` → Redirect zu `/login`.

## 9) Styles
- Tailwind-Variablen greifen (Hintergrund/Primärfarbe).
- Hover-States auf Nav/CTA ok.

---

## Troubleshooting (Quick-Fixes)
- Vite-Cache: `rm -rf node_modules/.vite` → `npm run dev`.
- Module-Mismatch: `rm -rf node_modules package-lock.json` → `npm i` → `npm run dev`.
- Falscher Import:
  - In `Header.jsx` & `MobileNav.jsx`: `import cfg from "../../nav.config.js";`
- CORS-Probleme: `CORS_ORIGINS` im Backend `.env` ergänzen, Backend neu starten.
- Token-Guard für Tests: `localStorage.setItem("token","dev")` (später wieder entfernen).
