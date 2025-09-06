// src/routes/leads.js (CommonJS, passt zu deinem server.js)
const { Router } = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = Router();

// GET /api/leads  -> Liste aller Leads
router.get("/", async (_req, res) => {
  try {
    const items = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json({ items });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message || "Server error" });
  }
});

// POST /api/leads  -> neuen Lead anlegen (optional)
router.post("/", async (req, res) => {
  try {
    const { name, email, source } = req.body || {};
    if (!email) return res.status(400).json({ ok: false, error: "email required" });

    const item = await prisma.lead.upsert({
      where: { email },
      update: { name, source },
      create: { name: name ?? null, email, source: source ?? null },
    });
    res.status(201).json({ item });
  } catch (e) {
    res.status(400).json({ ok: false, error: e.message || "Bad request" });
  }
});

// DELETE /api/leads/:id  -> Lead löschen (optional)
router.delete("/:id", async (req, res) => {
  try {
    await prisma.lead.delete({ where: { id: req.params.id } });
    res.json({ ok: true });
  } catch {
    res.status(404).json({ ok: false, error: "Lead not found" });
  }
});

module.exports = router;
