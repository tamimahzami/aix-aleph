import { Router } from "express";

const legalPdfRouter = Router();

// Health-Check: GET /api/legal/health
legalPdfRouter.get("/health", (_req, res) => {
  res.json({ ok: true, area: "legal-pdf" });
});

// Platzhalter PDF: GET /api/legal/pdf/:doc
legalPdfRouter.get("/pdf/:doc", (req, res) => {
  const { doc } = req.params;
  res.status(501).json({
    ok: false,
    error: "PDF generation is disabled in this build.",
    doc,
  });
});

export default legalPdfRouter;
