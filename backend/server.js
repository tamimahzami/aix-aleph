// backend/server.js — Minimal-API (sauber & robust)

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

const PORT = Number(process.env.PORT || 5001);
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

// ---------- Middleware
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

// ---------- Helper
const ok = (res, data) => res.json(data);
const bad = (res, msg, code = 400) => res.status(code).json({ ok: false, error: msg });

// ---------- Auth-Utils
function signToken(user) {
  return jwt.sign(
    { sub: user.id, email: user.email, role: user.role, companyId: user.companyId ?? null },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

function ensureAuth(req, res, next) {
  try {
    const h = req.headers.authorization || "";
    const [, token] = h.split(" ");
    if (!token) return bad(res, "unauthorized", 401);
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    req.userId = payload.sub;
    next();
  } catch {
    return bad(res, "unauthorized", 401);
  }
}

// ---------- Status-Enum absichern (Legacy-Werte tolerieren)
const ALLOWED_STATUS = ["DRAFT","RUNNING","COMPLETED","SCHEDULED","PAUSED","ARCHIVED","FAILED"];
function normalizeStatus(s) {
  const v = (s || "DRAFT").toString().toUpperCase();
  return ALLOWED_STATUS.includes(v) ? v : "DRAFT";
}

// ---------- Health
app.get("/api/health", (_req, res) => ok(res, { ok: true, env: process.env.NODE_ENV || "development" }));

// ---------- Login
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return bad(res, "email and password required", 400);

    const user = await prisma.user.findUnique({
      where: { email: String(email) },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        companyId: true,
        passwordHash: true, // wichtig!
      },
    });

    if (!user) return bad(res, "invalid_credentials", 401);

    const valid = await bcrypt.compare(String(password), user.passwordHash);
    if (!valid) return bad(res, "invalid_credentials", 401);

    const token = signToken(user);
    return ok(res, { ok: true, token });
  } catch (err) {
    console.error("LOGIN_ERROR", err);
    return bad(res, "internal_error", 500);
  }
});

// ---------- Me
app.get("/api/me", ensureAuth, async (req, res) => {
  try {
    const me = await prisma.user.findUnique({
      where: { id: req.userId },
      select: { id: true, email: true, name: true, role: true, companyId: true, createdAt: true },
    });
    if (!me) return bad(res, "not_found", 404);
    return ok(res, { ok: true, user: me });
  } catch (err) {
    console.error("ME_ERROR", err);
    return bad(res, "internal_error", 500);
  }
});

// ---------- Utils: Varianten normalisieren (supports: variants[] oder arms[])
function normalizeVariants(body) {
  const raw = Array.isArray(body?.variants)
    ? body.variants
    : Array.isArray(body?.arms)
    ? body.arms
    : [];

  return raw.map((v, i) => {
    const name = (v?.name || v?.label || `Variant ${i + 1}`).toString();
    // bevorzugt weight, sonst initialSplit, sonst 0
    const weight = Number(v?.weight ?? v?.initialSplit ?? 0);
    return { name, weight: Number.isFinite(weight) ? weight : 0 };
  });
}

// ---------- Experiments: Liste (öffentlich)
app.get("/api/experiments", async (_req, res) => {
  try {
    const data = await prisma.experiment.findMany({
      include: { variants: true, metrics: true },
      orderBy: { createdAt: "desc" },
    });
    return ok(res, data);
  } catch (err) {
    console.error("LIST_EXPERIMENTS_ERROR", err);
    return bad(res, "internal_error", 500);
  }
});

// ---------- Experiments: anlegen (protected) — robust ggü. Feldnamen
app.post("/api/experiments", ensureAuth, async (req, res) => {
  try {
    const headerCompanyId = req.header("x-company-id");
    const companyId = headerCompanyId || req.user?.companyId;
    if (!companyId) return bad(res, "company_required", 400);

    const { name, type, status } = req.body || {};
    if (!name) return bad(res, "name_required", 400);

    const finalStatus = normalizeStatus(status);

    // 1) Experiment ohne Varianten anlegen
    const experiment = await prisma.experiment.create({
      data: {
        name: String(name),
        type: String(type || "AB"),
        status: finalStatus,
        company: { connect: { id: companyId } },
      },
    });

    // 2) Varianten anlegen (Schema-A/B automatisch erkennen)
    const variants = normalizeVariants(req.body);

    if (variants.length > 0) {
      // A) { name, weight, experimentId }
      const payloadA = variants.map(v => ({
        name: v.name,
        weight: v.weight,
        experimentId: experiment.id,
      }));

      try {
        await prisma.experimentVariant.createMany({ data: payloadA });
      } catch (eA) {
        // B) { name, initialSplit, experimentId }
        const payloadB = variants.map(v => ({
          name: v.name,
          initialSplit: v.weight,
          experimentId: experiment.id,
        }));
        try {
          await prisma.experimentVariant.createMany({ data: payloadB });
        } catch (eB) {
          console.error("CREATE_VARIANTS_FAILED", {
            primary: eA?.code || eA?.message,
            fallback: eB?.code || eB?.message,
          });
          // kein Hard-Fail: Experiment bleibt bestehen
        }
      }
    }

    // 3) Ergebnis mit Kindern zurückgeben
    const withChildren = await prisma.experiment.findUnique({
      where: { id: experiment.id },
      include: { variants: true, metrics: true },
    });

    return ok(res, { ok: true, experiment: withChildren });
  } catch (err) {
    console.error("CREATE_EXPERIMENT_ERROR_FATAL", { message: err?.message, code: err?.code, meta: err?.meta });
    return bad(res, "internal_error", 500);
  }
});

// ---------- Serverstart
app.listen(PORT, () => {
  console.log(`🚀 API ready on :${PORT}`);
});
