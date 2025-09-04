// src/routes/leads.js
import { Router } from "express";
import { prisma } from "../db/index.js";
import { successResponse, errorResponse } from "../utils.js";

export const leadsRouter = Router();

// Public: Lead erfassen
leadsRouter.post("/", async (req, res) => {
  const { email, name } = req.body || {};
  if (!email) return errorResponse(res, 400, "Email is required");
  const existing = await prisma.lead.findUnique({ where: { email } });
  if (existing) return errorResponse(res, 409, "Email already exists");
  const item = await prisma.lead.create({ data: { email, name } });
  successResponse(res, { item });
});

// Protected in server.js via authMiddleware
leadsRouter.get("/", async (_req, res) => {
  const items = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });
  successResponse(res, { items });
});
