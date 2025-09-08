// backend/routes/agent.js
import { Router } from "express";
import { askChat } from "../services/agentService.js";

const router = Router();

/**
 * POST /agent/ask
 * Body: { message: "Text vom User", provider?: "gpt"|"gemini"|"auto" }
 */
router.post("/ask", async (req, res) => {
  const { message, provider } = req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const reply = await askChat(message, provider);
    res.json({ ok: true, reply });
  } catch (err) {
    console.error("Agent route error:", err);
    res.status(500).json({ error: "Agent failed", detail: err.message });
  }
});

export default router;
