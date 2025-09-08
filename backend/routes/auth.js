// routes/auth.js — Final (CJS kompatibel, aber als ESM importierbar)
import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";
const JWT_EXPIRES = process.env.JWT_EXPIRES || "7d";

// Hilfsfunktion Token
function signToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES }
  );
}

// ─────────────────────────── Register ───────────────────────────
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ ok: false, message: "Email & Passwort benötigt" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashed },
    });

    const token = signToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.COOKIE_SECURE === "true",
    });

    return res.json({ ok: true, token });
  } catch (err) {
    console.error("[auth/register] error", err);
    return res.status(500).json({ ok: false, message: "Fehler bei Registrierung" });
  }
});

// ─────────────────────────── Login ───────────────────────────
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ ok: false, message: "Ungültig" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ ok: false, message: "Ungültig" });

    const token = signToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.COOKIE_SECURE === "true",
    });

    return res.json({ ok: true, token });
  } catch (err) {
    console.error("[auth/login] error", err);
    return res.status(500).json({ ok: false, message: "Fehler bei Login" });
  }
});

// ─────────────────────────── Logout ───────────────────────────
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ ok: true, message: "Logout erfolgreich" });
});

export default router;
