# AIX Aleph – Monorepo (Frontend + Backend)

Ein kleines, fokussiertes Monorepo mit React/Vite im **Frontend** und Node/Express im **Backend**.  
Ziel: schnelle Experimente, schlanke Auth, klare Struktur.

---

## Inhalt

- [Technologien](#technologien)
- [Projektstruktur](#projektstruktur)
- [Schnellstart](#schnellstart)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Environment Variablen](#environment-variablen)
- [Authentifizierung (AuthContext)](#authentifizierung-authcontext)
- [Routen & Navigation](#routen--navigation)
- [Nützliche NPM-Skripte](#nützliche-npm-skripte)
- [Troubleshooting](#troubleshooting)
- [.gitignore & Hygiene](#gitignore--hygiene)
- [Lizenz](#lizenz)

---

## Technologien

**Frontend**
- React 18 + Vite
- React Router
- Zod (Form-Validierung)
- Tailwind/Utility-Styles (leichtgewichtig; per CSS Variablen)
- (optional) MapLibre

**Backend**
- Node.js + Express
- Clean Routes (z. B. `/api/legal/health`, `/api/manifesto`)

---

## Projektstruktur

# AIX Aleph — Dev Setup

Ein Monorepo mit **Frontend (React/Vite)** und **Backend (Node/Express)**.  
Ziel: schnelles Prototyping & klare Struktur.

---

## Start mit Docker

```bash
docker compose up -d --build
