// backend/routes/agentRoutes.js
const express = require("express");
const router = express.Router();
const { askAgent } = require("../services/agentService");

router.post("/ask", async (req, res, next) => {
  try {
    const { question, history = [], provider } = req.body || {};
    if (!question || typeof question !== "string") {
      return res.status(400).json({ message: "question (string) wird benötigt" });
    }
    const { answer, providerUsed } = await askAgent({ question, history, provider });
    res.json({ answer, providerUsed });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
