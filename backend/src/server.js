
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

// Router-Module (jeder Router verwaltet einen eigenen Teil der API)
import { experimentsRouter } from "./routes/experiments.js";
import { leadsRouter } from "./routes/leads.js";
import legalPdfRouter from "./routes/legalPdf.js";
import manifestoRouter from "./routes/manifesto.js";

const app = express();
const PORT = Number(process.env.PORT || 5001);

// ──────────────────────────────────────────────────────────────
// Globale Sicherheits- und Logging-Middleware
// (Muss am Anfang der Kette stehen, um alle Anfragen zu verarbeiten)
// ──────────────────────────────────────────────────────────────

// Opt-in Logging für den Entwicklungsmodus
if (process.env.NODE_ENV !== "production") {
  app.use((req, _res, next) => {
    console.log(`[${req.method}] ${req.url}`);
    next();
  });
}

// Basis-Middleware
app.set("trust proxy", 1); // Vertrauen auf den ersten Proxy-Server (für Rate-Limiter)
app.use(express.json({ limit: "1mb" }));

// Dynamische CORS-Konfiguration
const origins = process.env.CORS_ORIGINS?.split(",").map(s => s.trim());
app.use(cors({ origin: origins?.length ? origins : true, credentials: true }));

app.use(helmet({ crossOriginResourcePolicy: false }));

// Rate Limiting zum Schutz vor Brute-Force-Angriffen
app.use(rateLimit({ 
  windowMs: 60 * 1000, // 1 Minute
  max: 300, // Max. 300 Anfragen pro IP pro Minute
  standardHeaders: true, // `RateLimit-` Header aktivieren
  legacyHeaders: false, // X-RateLimit-* Header deaktivieren
  message: { ok: false, error: "Too many requests, please try again later." }
}));

// ──────────────────────────────────────────────────────────────
// Health-Check-Endpunkte & Root-Informationen
// (Hilfreich für Überwachung und Entwickler)
// ──────────────────────────────────────────────────────────────

// Root-Endpunkt für menschliche/automatische Pings
app.get("/", (_req, res) => {
  res.json({ ok: true, service: "aix-aleph-backend", hint: "see /api/health" });
});

// Verhindert 404-Pings auf Favicon
app.get("/favicon.ico", (_req, res) => res.status(204).end());

// API-Index-Endpunkt
app.get("/api", (_req, res) => {
  res.json({
    ok: true,
    message: "AIX Aleph API",
    endpoints: ["/api/health", "/api/manifesto", "/api/leads", "/api/experiments", "/api/legal/health"],
  });
});

// Spezifischer Health-Check-Endpunkt
app.get("/api/health", (_req, res) => res.json({ ok: true, env: process.env.NODE_ENV || "development" }));

// ──────────────────────────────────────────────────────────────
// API-Router-Middleware
// (Hier werden alle spezifischen API-Pfade an die jeweiligen Router geleitet)
// ──────────────────────────────────────────────────────────────

app.use("/api/experiments", experimentsRouter);
app.use("/api/leads", leadsRouter);
app.use("/api/legal", legalPdfRouter);
app.use("/api/manifesto", manifestoRouter);

// ──────────────────────────────────────────────────────────────
// API-Fallback-Endpunkte
// (Nachdem alle Router versucht haben, die Anfrage zu verarbeiten)
// ──────────────────────────────────────────────────────────────

// 404 für unbekannte /api-* Pfade
app.use("/api", (_req, res) => res.status(404).json({ ok:false, error:"Not Found" }));

// ──────────────────────────────────────────────────────────────
// Globaler Fehler-Fallback (muss am Ende der Middleware-Kette stehen)
// ──────────────────────────────────────────────────────────────

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ ok: false, error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`[server] listening on http://localhost:${PORT}`);
});

