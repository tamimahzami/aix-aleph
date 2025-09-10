// src/routes/telemetry.js
import { Router } from "express";
import { prisma } from "../db/index.js";
import { successResponse, errorResponse } from "../utils.js";

export const telemetryRouter = Router();

// POST telemetry event
telemetryRouter.post("/", async (req, res) => {
  const { userEmail, event, payload } = req.body || {};
  if (!userEmail || !event) return errorResponse(res, 400, "userEmail and event required");

  const item = await prisma.telemetry.create({
    data: { userEmail, event, payload: payload ?? {}, ts: new Date() },
  });
  successResponse(res, { item });
});

// GET telemetry (optional filter by userEmail)
telemetryRouter.get("/", async (req, res) => {
  const { userEmail } = req.query;
  const items = await prisma.telemetry.findMany({
    where: userEmail ? { userEmail: String(userEmail) } : undefined,
    orderBy: { ts: "desc" },
    take: 200,
  });
  successResponse(res, { items });
});
