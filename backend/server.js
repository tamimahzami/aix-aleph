// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// ── Config ──────────────────────────────────────────────
const PORT = Number(process.env.PORT || 4000);
const NODE_ENV = process.env.NODE_ENV || 'development';
const LOG_LEVEL = process.env.LOG_LEVEL || 'info';

function allowDevWildcard(origin) {
  if (!origin) return true; // curl/Postman
  try {
    const u = new URL(origin);
    return u.hostname === 'localhost' || u.hostname === '127.0.0.1';
  } catch {
    return false;
  }
}

const ALLOWED_ORIGINS = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

// ── Middleware ─────────────────────────────────────────
app.use(cors({
  origin(origin, cb) {
    if (NODE_ENV === 'development' && allowDevWildcard(origin)) return cb(null, true);
    if (!origin) return cb(null, true);
    if (ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
    return cb(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
}));
app.use(express.json());

// ── Routes ─────────────────────────────────────────────
app.get('/health', (_req, res) => res.json({ ok: true }));

app.get('/api/version', (_req, res) => {
  res.json({ name: 'aix-aleph-backend', version: '0.1.0', env: NODE_ENV });
});

app.post('/api/echo', (req, res) => {
  res.json({ received: req.body ?? null });
});

// 404
app.use((req, res) => res.status(404).json({ message: `Not Found: ${req.method} ${req.path}` }));

// Fehler-Handler
app.use((err, _req, res, _next) => {
  if (LOG_LEVEL === 'debug') console.error(err);
  res.status(500).json({ message: 'Internal Server Error' });
});

// ── Start ──────────────────────────────────────────────
app.listen(PORT, () => {
  const allow = NODE_ENV === 'development'
    ? '(dev wildcard: localhost/127.0.0.1 erlaubt)'
    : `CORS Origins: ${JSON.stringify(ALLOWED_ORIGINS)}`;
  console.log(`Backend läuft auf http://127.0.0.1:${PORT}`);
  console.log(allow);
});
