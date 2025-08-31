// backend/routes/auth.js
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// In-Memory Stores (für Produktion DB/Redis verwenden)
const users = new Map();      // email -> { id, email, passHash, createdAt }
const resetTokens = new Map();// token -> { email, expiresAt }

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";
const signToken = (payload, opts = {}) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: opts.expiresIn || "2h" });

const validateEmail = (email) => typeof email === "string" && /\S+@\S+\.\S+/.test(email);
const validatePassword = (pw) =>
  typeof pw === "string" && pw.length >= 8 && /[A-Za-z]/.test(pw) && /\d/.test(pw);

// Register
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!validateEmail(email)) return res.status(400).json({ message: "Ungültige E-Mail" });
    if (!validatePassword(password))
      return res.status(400).json({ message: "Passwort zu schwach (8+, 1 Buchstabe, 1 Zahl)" });

    const key = email.toLowerCase();
    if (users.has(key)) return res.status(409).json({ message: "Benutzer existiert bereits" });

    const passHash = await bcrypt.hash(password, 10);
    const user = { id: crypto.randomUUID(), email: key, passHash, createdAt: new Date().toISOString() };
    users.set(key, user);
    return res.status(201).json({ ok: true, user: { id: user.id, email: user.email } });
  } catch (e) {
    console.error("Register error:", e);
    return res.status(500).json({ message: "Interner Serverfehler" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!validateEmail(email) || typeof password !== "string")
      return res.status(400).json({ message: "E-Mail oder Passwort fehlt/ungültig" });

    const user = users.get(email.toLowerCase());
    if (!user) return res.status(400).json({ message: "Ungültige Anmeldedaten" });

    const ok = await bcrypt.compare(password, user.passHash);
    if (!ok) return res.status(400).json({ message: "Ungültige Anmeldedaten" });

    const token = signToken({ sub: user.id, email: user.email, role: "user", account_type: "full" }, { expiresIn: "2h" });
    return res.json({ ok: true, token, user: { id: user.id, email: user.email, role: "user" } });
  } catch (e) {
    console.error("Login error:", e);
    return res.status(500).json({ message: "Interner Serverfehler" });
  }
});

// Passwort-Reset anfordern
router.post("/reset-password", async (req, res) => {
  const { email } = req.body || {};
  const generic = { ok: true, message: "Falls ein Konto existiert, wurde ein Reset-Link gesendet." };
  try {
    const key = (email || "").toLowerCase();
    if (!validateEmail(key)) return res.json(generic);

    const user = users.get(key);
    if (!user) return res.json(generic);

    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = Date.now() + 15 * 60 * 1000; // 15 Min
    resetTokens.set(token, { email: key, expiresAt });

    const frontendBase = process.env.FRONTEND_URL || "http://localhost:3001";
    const link = `${frontendBase}/confirm-reset?token=${token}`;
    console.log(`[reset] Link für ${key}: ${link}`);

    return res.json(generic);
  } catch (e) {
    console.error("reset-password error:", e);
    return res.json(generic);
  }
});

// Passwort-Reset bestätigen
router.post("/confirm-reset", async (req, res) => {
  try {
    const { token: rawToken, newPassword } = req.body || {};
    const token = rawToken?.trim();
    if (!token || !newPassword) {
      return res.status(400).json({ ok: false, message: "Token und neues Passwort erforderlich" });
    }
    if (!validatePassword(newPassword)) {
      return res.status(400).json({ ok: false, message: "Passwort zu schwach (8+, 1 Buchstabe, 1 Zahl)" });
    }

    const item = resetTokens.get(token);
    const now = Date.now();
    if (!item || item.expiresAt < now) {
      resetTokens.delete(token);
      return res.status(400).json({ ok: false, message: "Ungültiger oder abgelaufener Token" });
    }

    const user = users.get(item.email);
    if (!user) {
      resetTokens.delete(token);
      return res.status(400).json({ ok: false, message: "Ungültiger Token" });
    }

    user.passHash = await bcrypt.hash(newPassword, 10);
    resetTokens.delete(token);
    return res.json({ ok: true, message: "Passwort erfolgreich aktualisiert" });
  } catch (e) {
    console.error("confirm-reset error:", e);
    return res.status(500).json({ ok: false, message: "Fehler beim Zurücksetzen" });
  }
});

// Demo Login
router.post("/demo", (req, res) => {
  try {
    const nowSec = Math.floor(Date.now() / 1000);
    const expSec = nowSec + 14 * 24 * 60 * 60;
    const payload = {
      sub: "demo-user",
      email: "demo@aix-aleph.io",
      account_type: "demo",
      role: "demo",
      iat: nowSec,
      exp: expSec,
    };
    const token = jwt.sign(payload, JWT_SECRET);
    return res.json({ ok: true, token, user: { id: "demo-user", email: "demo@aix-aleph.io", role: "demo" } });
  } catch (e) {
    console.error("Demo-Login error:", e);
    return res.status(500).json({ message: "Demo-Login fehlgeschlagen" });
  }
});

module.exports = router;
