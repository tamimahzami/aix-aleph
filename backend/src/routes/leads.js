// src/routes/leads.js
import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { asyncHandler, successResponse, errorResponse, requireFields } from "../utils.js";

const prisma = new PrismaClient();
export const leadsRouter = Router();

// Liste
leadsRouter.get(
  "/",
  asyncHandler(async (_req, res) => {
    const items = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });
    return successResponse(res, { items });
  })
);

// Anlegen
leadsRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    try {
      requireFields(req.body, ["email"]);
      const item = await prisma.lead.upsert({
        where: { email: req.body.email },
        update: req.body,
        create: req.body,
      });
      return successResponse(res, { item }, 201);
    } catch (e) {
      return errorResponse(res, 400, e.message || "Failed to create lead");
    }
  })
);
