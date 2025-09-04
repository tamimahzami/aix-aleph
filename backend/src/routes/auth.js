// src/routes/auth.js
import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { prisma } from "../db/index.js";
import { successResponse, errorResponse } from "../utils.js";
import { rateLimit } from "../middleware/rateLimit.js";
import {
  ensureNotLocked,
  recordLoginFailure,
  recordLoginSuccess,
} from "../middleware/loginShield.js";

export const authRouter = Router();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.warn("[auth] JWT_SECRET fehlt – nutze dev fallback");
}

const LoginSchema = z.object({
  email: z.string().email().max(254),
  password: z.string().min(8).max(200),
});

const RegisterSchema = z.object({
  email: z.string().email().max(254),
  password: z.string().min(8).max(200),
});

const jwtOpts = {
  expiresIn: "1h",
  issuer: "aix-aleph",
  audience: "aix-aleph-web",
};

// Rate-Limit für Login
authRouter.use(
  "/login",
  rateLimit({
    windowMs: 60_000,
    max: 10,
    keyGenerator: (req) => `${req.ip}:login`,
  })
);

// Rate-Limit für Registrierung
authRouter.use(
  "/register",
  rateLimit({
    windowMs: 60_000,
    max: 5,
    keyGenerator: (req) => `${req.ip}:register`,
  })
);

authRouter.post("/login", ensureNotLocked(), async (req, res) => {
  try {
    const { email, password } = LoginSchema.parse(req.body);
    const normalizedEmail = email.trim().toLowerCase();

    const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (!user) {
      recordLoginFailure(normalizedEmail);
      return errorResponse(res, 401, "Invalid credentials");
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      recordLoginFailure(normalizedEmail);
      return errorResponse(res, 401, "Invalid credentials");
    }

    recordLoginSuccess(normalizedEmail);

    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET || "dev-secret",
      { ...jwtOpts, subject: user.id }
    );

    return successResponse(res, {
      token,
      expiresIn: jwtOpts.expiresIn,
      user: { id: user.id, email: user.email },
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return errorResponse(res, 400, "Invalid input", { issues: err.flatten() });
    }
    return errorResponse(res, 500, "Internal error");
  }
});

authRouter.post("/register", async (req, res) => {
  try {
    const { email, password } = RegisterSchema.parse(req.body);
    const normalizedEmail = email.trim().toLowerCase();

    const exists = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (exists) return errorResponse(res, 409, "Email already registered");

    const hash = await bcrypt.hash(password, 10);
    const created = await prisma.user.create({
      data: { email: normalizedEmail, password: hash },
      select: { id: true, email: true },
    });

    const token = jwt.sign(
      { id: created.id, email: created.email },
      JWT_SECRET || "dev-secret",
      { ...jwtOpts, subject: created.id }
    );

    return successResponse(res, { token, user: created, expiresIn: jwtOpts.expiresIn });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return errorResponse(res, 400, "Invalid input", { issues: err.flatten() });
    }
    return errorResponse(res, 500, "Internal error");
  }
});

authRouter.get("/me", async (req, res) => {
  try {
    const authHeader = req.headers.authorization || "";
    const [, token] = authHeader.split(" ");
    if (!token) return errorResponse(res, 401, "No token provided");

    const payload = jwt.verify(token, JWT_SECRET || "dev-secret", {
      issuer: jwtOpts.issuer,
      audience: jwtOpts.audience,
    });

    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      select: { id: true, email: true, createdAt: true },
    });
    if (!user) return errorResponse(res, 404, "User not found");

    return successResponse(res, { user });
  } catch {
    return errorResponse(res, 401, "Invalid token");
  }
});
