// server.js — Minimal-API (ESM, modular)

import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { prisma } from "./src/db/index.js";
import { successResponse, errorResponse } from "./src/utils.js";
import { experimentsRouter } from "./src/routes/experiments.js"; // bereits vorhanden

const app = express();

const PORT = Number(process.env.PORT || 5001);
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

// ---------- Middleware
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

// ---------- Auth-Utils (unverändert, nur als ESM)
function signToken(user) {
  return jwt.sign(
    { sub: user.id, email: user.email, role: user.role ?? null, companyId: user.companyId ?? null },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

function ensureAuth(req, res, next) {
  try {
    const h = req.headers.authorization || "";
    const [, token] = h.split(" ");
    if (!token) return errorResponse(res, 401, "unauthorized");
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    req.userId = payload.sub;
    next();
  } catch {
    return errorResponse(res, 401, "unauthorized");
  }
}

// ---------- Health
app.get("/api/health", (_req, res) =>
  successResponse(res, { env: process.env.NODE_ENV || "development" })
);

// ---------- Router mounten
app.use("/api/experiments", experimentsRouter);

// (Optional) Beispiel: geschützte Route
app.get("/api/me", ensureAuth, async (req, res) => {
  const me = await prisma.user.findUnique({ where: { id: req.userId } });
  if (!me) return errorResponse(res, 404, "User not found");
  successResponse(res, { user: me });
});

// ---------- Start
app.listen(PORT, () => {
  console.log(`[api] listening on http://localhost:${PORT}`);
});
