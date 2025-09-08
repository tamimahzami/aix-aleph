// server.js (ESM)
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import agentRoutes from './routes/agentRoutes.js'; // default export

const app = express();
const PORT = process.env.PORT || 4000;

// CORS
const ORIGINS = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

app.use(express.json({ limit: '1mb' }));
app.use(cors({
  origin(origin, cb) {
    if (!origin) return cb(null, true);
    if (ORIGINS.length === 0 || ORIGINS.includes(origin)) return cb(null, true);
    return cb(new Error('Not allowed by CORS: ' + origin), false);
  },
  credentials: true,
}));

// Health
app.get('/health', (_req, res) => res.json({ ok: true }));

// Agent API
app.use('/agent', agentRoutes);

// 404 JSON
app.use((req, res) => {
  res.status(404).json({ message: `Not Found: ${req.method} ${req.originalUrl}` });
});

// Fehler-Handler
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  const status = err.status || 500;
  res.status(status).json({ message: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
