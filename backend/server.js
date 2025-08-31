// server.js – minimal & korrekt
const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();
const PORT = Number(process.env.PORT || 5001);

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

// Health
app.get("/health", (_req, res) => res.status(200).json({ ok: true }));
app.get("/api/health", (_req, res) =>
  res.json({ ok: true, env: process.env.NODE_ENV || "development" })
);

// Helpers
const ok = (res, data) => res.json(data);
const bad = (res, msg, code = 400) => res.status(code).json({ ok: false, error: msg });

// List
app.get("/api/experiments", async (_req, res) => {
  try {
    const data = await prisma.experiment.findMany({
      include: { arms: true, metrics: true },
      orderBy: { createdAt: "desc" }
    });
    ok(res, data);
  } catch (e) {
    console.error(e);
    bad(res, "internal_error", 500);
  }
});

// Details
app.get("/api/experiments/:id", async (req, res) => {
  try {
    const exp = await prisma.experiment.findUnique({
      where: { id: String(req.params.id) },
      include: { arms: true, metrics: true }
    });
    if (!exp) return bad(res, "not_found", 404);
    ok(res, exp);
  } catch (e) {
    console.error(e);
    bad(res, "internal_error", 500);
  }
});

// Create
app.post("/api/experiments", async (req, res) => {
  try {
    const {
      name,
      description = null,
      type = "AB",
      status = "DRAFT",
      strategy = "FIXED",
      startTime = null,
      endTime = null,
      notes = null,
      decision = null,
      decisionReason = null,
      arms = []
    } = req.body || {};

    if (!name || typeof name !== "string" || !name.trim()) {
      return bad(res, "name is required");
    }
    if (!Array.isArray(arms) || arms.length === 0) {
      return bad(res, "arms must be a non-empty array");
    }

    const armsData = arms.map((a) => {
      if (!a || !a.name || !String(a.name).trim()) {
        throw new Error("each arm needs a non-empty name");
      }
      const initialSplit =
        a.initialSplit == null ? null : Number(a.initialSplit);
      if (
        initialSplit != null &&
        (!Number.isFinite(initialSplit) || initialSplit < 0 || initialSplit > 100)
      ) {
        throw new Error("initialSplit must be between 0 and 100");
      }
      return {
        name: String(a.name),
        aiModelId: a.aiModelId ?? null,
        initialSplit,
        minSplit: a.minSplit ?? null,
        maxSplit: a.maxSplit ?? null,
        isChampion: !!a.isChampion
      };
    });

    const created = await prisma.experiment.create({
      data: {
        name: String(name),
        description,
        type,
        status,
        strategy,
        startTime,
        endTime,
        notes,
        decision,
        decisionReason,
        arms: { create: armsData }
      },
      include: { arms: true, metrics: true }
    });

    return res.status(201).json(created);
  } catch (e) {
    console.error("POST /api/experiments failed:", e);
    if (e.message?.includes("arm")) return bad(res, e.message, 400);
    return bad(res, "internal_error", 500);
  }
});

// Update (klein)
app.patch("/api/experiments/:id", async (req, res) => {
  try {
    const id = String(req.params.id);
    const { name, description, status, notes, decision, decisionReason } = req.body || {};

    const updated = await prisma.experiment.update({
      where: { id },
      data: {
        ...(name != null ? { name: String(name) } : {}),
        ...(description !== undefined ? { description } : {}),
        ...(status != null ? { status: String(status) } : {}),
        ...(notes !== undefined ? { notes } : {}),
        ...(decision !== undefined ? { decision } : {}),
        ...(decisionReason !== undefined ? { decisionReason } : {})
      },
      include: { arms: true, metrics: true }
    });

    ok(res, updated);
  } catch (e) {
    if (e.code === "P2025") return bad(res, "not_found", 404);
    console.error(e);
    bad(res, "internal_error", 500);
  }
});

// Delete
app.delete("/api/experiments/:id", async (req, res) => {
  try {
    const id = String(req.params.id);
    await prisma.metric.deleteMany({ where: { experimentId: id } });
    await prisma.arm.deleteMany({ where: { experimentId: id } });
    await prisma.experiment.delete({ where: { id } });
    ok(res, { ok: true });
  } catch (e) {
    if (e.code === "P2025") return bad(res, "not_found", 404);
    console.error(e);
    bad(res, "internal_error", 500);
  }
});

// Metric hinzufügen
app.post("/api/experiments/:id/metrics", async (req, res) => {
  try {
    const experimentId = String(req.params.id);
    const { armId = null, key, value } = req.body || {};
    if (!key) return bad(res, "key is required");
    const num = Number(value);
    if (!Number.isFinite(num)) return bad(res, "value must be numeric");

    const created = await prisma.metric.create({
      data: { experimentId, armId: armId ?? null, key: String(key), value: num }
    });
    res.status(201).json(created);
  } catch (e) {
    console.error(e);
    bad(res, "internal_error", 500);
  }
});

app.listen(PORT, () => {
  console.log(`🚀 API ready on :${PORT}`);
});
