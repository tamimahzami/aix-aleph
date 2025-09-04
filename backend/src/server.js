// backend/src/server.js

import express from "express";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv";
import morgan from "morgan";
import pino from "pino";
import cors from "cors";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---------- Config ----------
const PORT = Number(process.env.PORT || 5001);
const ALLOWED_ORIGINS = (process.env.CORS_ORIGINS || "http://localhost:5173,http://localhost:4173")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

// ---------- Logger ----------
const logger = pino({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  transport: { target: "pino-pretty" },
});

// ---------- App + HTTP ----------
const app = express();
const httpServer = http.createServer(app);

// ---------- Middleware ----------
app.use(
  cors({
    origin: ALLOWED_ORIGINS,
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// favicon-Fehler in DEV vermeiden (204 No Content)
app.get('/favicon.ico', (_req, res) => res.status(204).end());

// --- API-Routen ---
const authRouter = express.Router();
authRouter.get("/", (_req, res) => res.json({ route: "auth", ok: true }));
const experimentsRouter = express.Router();
experimentsRouter.get("/", (_req, res) => res.json({ route: "experiments", ok: true }));
const leadsRouter = express.Router();
leadsRouter.get("/", (_req, res) => res.json({ route: "leads", ok: true }));

// Alle Router unter /api/* mounten
app.use("/api/auth", authRouter);
app.use("/api/experiments", experimentsRouter);
app.use("/api/leads", leadsRouter);

// ---------- API: Health ----------
app.get("/api/health", (_req, res) => {
  res.json({ ok: true, ts: new Date().toISOString() });
});

// ---------- Static (nur für PROD) ----------
// In PRODUCTION das gebaute Frontend ausliefern
if (process.env.NODE_ENV === "production") {
  const clientDist = path.join(__dirname, "..", "frontend", "dist");
  app.use(express.static(clientDist));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(clientDist, "index.html"));
  });
}

// ---------- Socket.IO (optional) ----------
const io = new SocketIOServer(httpServer, {
  cors: { origin: ALLOWED_ORIGINS, credentials: true },
});
io.on("connection", (socket) => {
  logger.info({ id: socket.id }, "socket connected");
  socket.on("disconnect", () => logger.info({ id: socket.id }, "socket disconnected"));
});

// ---------- Fehler-Handler ----------
app.use((err, _req, res, _next) => {
  logger.error(err);
  res.status(500).json({ ok: false, error: "internal_error" });
});

// ---------- Start ----------
httpServer.listen(PORT, () => {
  logger.info(`Server listening on http://localhost:${PORT}`);
});
