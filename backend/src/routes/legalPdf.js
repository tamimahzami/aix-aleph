// src/routes/legalPdf.js
import { Router } from "express";

export const legalPdfRouter = Router();

/**
 * Platzhalter-Endpunkte, bis echte PDF-Generierung aktiv ist.
 */
legalPdfRouter.get("/pdf/:doc", (req, res) => {
  const { doc } = req.params;
  res.status(501).json({
    ok: false,
    error: "PDF generation is disabled in this build.",
    doc,
  });
});

legalPdfRouter.get("/health", (_req, res) => {
  res.json({ ok: true, area: "legal-pdf" });
});
