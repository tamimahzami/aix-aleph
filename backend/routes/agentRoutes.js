// routes/agentRoutes.js (ESM)
import { Router } from 'express';
import { askAgent } from '../services/agentService.js';

const router = Router();

router.post('/ask', async (req, res, next) => {
  try {
    const { question, history = [], provider } = req.body || {};
    if (!question || typeof question !== 'string') {
      return res.status(400).json({ message: 'question (string) wird benötigt' });
    }
    const { answer, providerUsed } = await askAgent({ question, history, provider });
    res.json({ answer, providerUsed });
  } catch (err) {
    next(err);
  }
});

export default router; // <<<<<< WICHTIG: default export

