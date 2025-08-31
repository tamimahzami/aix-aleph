// backend/routes/protected.js
const router = require("express").Router();
const { requireAuth, ensureNotDemoWrite } = require("../middleware/requireAuth");

router.get("/", requireAuth, (req, res) => {
  res.json({ ok: true, user: req.user, data: "Top secret ✨ – nur mit gültigem Token sichtbar." });
});

router.post("/test-write", requireAuth, ensureNotDemoWrite, (req, res) => {
  res.json({ ok: true, message: "Schreibzugriff erfolgreich" });
});

module.exports = router;
