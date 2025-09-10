// routes/agent.js
import { Router } from "express";
import { askLLM, hasOpenAI, hasGemini, currentModels } from "../src/agent/providers.js";
import { analyzeKpis } from "../src/agent/metrics.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const router = Router();

// Debug/Meta
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const VERSION = `routes/agent.js v${new Date().toISOString().slice(0, 16)}Z`;

/** Health for this router */
router.get("/agent/_debug", (req, res) => {
  const models = currentModels();
  res.json({
    ok: true,
    file: __filename,
    version: VERSION,
    env: {
      defaultProvider: models.defaultProvider,
      gptModel: models.gpt,
      geminiModel: models.gemini,
    },
  });
});

/** Keys present? */
router.get("/agent/keys", (req, res) => {
  const models = currentModels();
  res.json({
    ok: true,
    hasOpenAI: hasOpenAI(),
    hasGemini: hasGemini(),
    defaultProvider: models.defaultProvider,
    models: { gpt: models.gpt, gemini: models.gemini },
  });
});

/** Simple inbox (optional – noop) */
router.post("/agent", async (req, res) => {
  // Falls du hier persistieren willst, kannst du req.body in eine Datei schreiben.
  res.json({ ok: true, id: Math.random().toString(36).slice(2) });
});

/** Haupt-Endpoint */
router.post("/agent/ask", async (req, res) => {
  try {
    const { mode, provider, model, history = [], question, telemetry } = req.body || {};

    if (mode === "analyze") {
      const result = analyzeKpis(Array.isArray(telemetry) ? telemetry : []);
      return res.json({ ok: true, result });
    }

    // default: chat
    const { answer, meta } = await askLLM({ provider, model, history, question });
    return res.json({ ok: true, answer, meta });
  } catch (err) {
    const message =
      err?.message ||
      "Internal error.";
    return res.status(200).json({ ok: false, message });
  }
});

export default router;
