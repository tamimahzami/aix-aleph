// src/index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

const PORT = process.env.PORT || 5001;
const VALID_STATUS = ["DRAFT", "RUNNING", "COMPLETED", "CANCELLED"];

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: [/^http:\/\/localhost:\d+$/],
    credentials: false,
  })
);
app.use(express.json());

// ── Health ───────────────────────────────────────────────────────────────────
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    env: process.env.NODE_ENV || "development",
    base: `${req.protocol}://${req.get("host")}/api`,
    version: "v1.0.0",
  });
});

// ── Dashboard ────────────────────────────────────────────────────────────────
app.get("/api/dashboard", async (req, res) => {
  try {
    const [total, running, last] = await Promise.all([
      prisma.experiment.count(),
      prisma.experiment.count({ where: { status: "RUNNING" } }),
      prisma.experiment.findMany({
        orderBy: { createdAt: "desc" },
        take: 7,
        include: { arms: true },
      }),
    ]);

    res.json({
      backend: "OK",
      env: process.env.NODE_ENV || "development",
      base: `${req.protocol}://${req.get("host")}/api`,
      counts: { experiments: total, running },
      lastExperiments: last.map((e) => ({
        id: e.id,
        name: e.name,
        status: e.status,
        arms: (e.arms || []).map((a) => a.name).join(", "),
        createdAt: e.createdAt,
      })),
    });
  } catch (err) {
    console.error("GET /api/dashboard failed:", err);
    res.status(500).json({ error: "dashboard_failed" });
  }
});

// ── Experiments CRUD ─────────────────────────────────────────────────────────
app.get("/api/experiments", async (_req, res) => {
  try {
    const items = await prisma.experiment.findMany({
      orderBy: { createdAt: "desc" },
      include: { arms: true },
    });
    res.json(items);
  } catch (err) {
    console.error("GET /api/experiments failed:", err);
    res.status(500).json({ error: "list_failed" });
  }
});

app.get("/api/experiments/:id", async (req, res) => {
  try {
    const item = await prisma.experiment.findUnique({
      where: { id: req.params.id },
      include: { arms: true, metrics: true },
    });
    if (!item) return res.status(404).json({ error: "not_found" });
    res.json(item);
  } catch (err) {
    console.error("GET /api/experiments/:id failed:", err);
    res.status(500).json({ error: "get_failed" });
  }
});

app.post("/api/experiments", async (req, res) => {
  try {
    const {
      name,
      type = "AB",
      status = "DRAFT",
      strategy = "FIXED",
      arms = ["A", "B"],
    } = req.body || {};

    if (!name) return res.status(400).json({ error: "name_required" });
    if (status && !VALID_STATUS.includes(status))
      return res.status(400).json({ error: "invalid_status" });

    const item = await prisma.experiment.create({
      data: {
        name,
        type,
        status,
        strategy,
        arms: {
          create: arms.map((n) => ({
            name: typeof n === "string" ? n : n?.name ?? "A",
            weight:
              typeof n === "object" && typeof n.weight === "number"
                ? n.weight
                : 1 / Math.max(1, arms.length),
          })),
        },
      },
      include: { arms: true },
    });

    res.status(201).json(item);
  } catch (err) {
    console.error("POST /api/experiments failed:", err);
    res.status(500).json({ error: "create_failed" });
  }
});

app.patch("/api/experiments/:id", async (req, res) => {
  try {
    const { status, arms } = req.body || {};

    const exp = await prisma.experiment.findUnique({
      where: { id: req.params.id },
    });
    if (!exp) return res.status(404).json({ error: "not_found" });

    if (status && !VALID_STATUS.includes(status))
      return res.status(400).json({ error: "invalid_status" });

    const updated = await prisma.$transaction(async (tx) => {
      if (Array.isArray(arms)) {
        await tx.arm.deleteMany({ where: { experimentId: exp.id } });
        if (arms.length) {
          await tx.arm.createMany({
            data: arms.map((a) => ({
              experimentId: exp.id,
              name: typeof a === "string" ? a : a?.name ?? "A",
              weight:
                typeof a === "object" && typeof a.weight === "number"
                  ? a.weight
                  : 1 / Math.max(1, arms.length),
            })),
          });
        }
      }

      return tx.experiment.update({
        where: { id: exp.id },
        data: { status: status || undefined },
        include: { arms: true, metrics: true },
      });
    });

    res.json(updated);
  } catch (err) {
    console.error("PATCH /api/experiments/:id failed:", err);
    res.status(500).json({ error: "update_failed" });
  }
});

app.post("/api/experiments/:id/metrics", async (req, res) => {
  try {
    const { name, value } = req.body || {};
    if (!name || typeof value !== "number")
      return res.status(400).json({ error: "name_and_numeric_value_required" });

    const exp = await prisma.experiment.findUnique({
      where: { id: req.params.id },
    });
    if (!exp) return res.status(404).json({ error: "not_found" });

    const m = await prisma.metric.create({
      data: { name, value, experimentId: exp.id },
    });
    res.status(201).json(m);
  } catch (err) {
    console.error("POST /api/experiments/:id/metrics failed:", err);
    res.status(500).json({ error: "metric_failed" });
  }
});

app.delete("/api/experiments/:id", async (req, res) => {
  try {
    await prisma.experiment.delete({ where: { id: req.params.id } });
    res.json({ ok: true });
  } catch (err) {
    if (err?.code === "P2025") return res.status(404).json({ error: "not_found" });
    console.error("DELETE /api/experiments/:id failed:", err);
    res.status(500).json({ error: "delete_failed" });
  }
});

// ── 404 + Fehlerhandler (optional aber hilfreich) ────────────────────────────
app.use((req, res) => res.status(404).json({ error: "route_not_found" }));
app.use((err, _req, res, _next) => {
  console.error("unhandled_error", err);
  res.status(500).json({ error: "internal_error" });
});

// ── Start + sauberer Shutdown ────────────────────────────────────────────────
const server = app.listen(PORT, () => {
  console.log(`🚀 API ready on :${PORT}`);
});

const stop = async () => {
  try {
    await prisma.$disconnect();
  } finally {
    server.close(() => process.exit(0));
  }
};
process.on("SIGINT", stop);
process.on("SIGTERM", stop);
