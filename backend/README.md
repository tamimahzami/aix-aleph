# AIX Aleph Backend

## 🚀 Setup

### 1. Installation
```bash
cd backend
npm install

# UW_PICO_5.09 – Backend

Backend-Service für **AIX Aleph MVP** (Experiments / Arms / Metrics) mit **Express + Prisma + SQLite**.

---

## 🚀 Quickstart

### Lokale Entwicklung
```bash
cd backend
npm install
npx prisma format
npm run prisma:generate
npm run prisma:dbpush
npm run dev   # startet auf PORT=5001 (oder PORT=5002 mit Override)
