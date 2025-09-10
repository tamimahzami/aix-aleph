// src/routes/experiments.js
import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { asyncHandler, successResponse, errorResponse, requireFields } from "../utils.js";

const prisma = new PrismaClient();
export const experimentsRouter = Router();

// Liste
experimentsRouter.get(
  "/",
  asyncHandler(async (_req, res) => {
    const items = await prisma.experiment.findMany({ orderBy: { createdAt: "desc" } });
    return successResponse(res, { items });
  })
);

// Anlegen
experimentsRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    try {
      requireFields(req.body, ["name"]); // passe an dein Schema an
      const item = await prisma.experiment.create({ data: req.body });
      return successResponse(res, { item }, 201);
    } catch (e) {
      return errorResponse(res, 400, e.message || "Failed to create experiment");
    }
  })
);

// Detail
experimentsRouter.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const item = await prisma.experiment.findUnique({ where: { id: req.params.id } });
    if (!item) return errorResponse(res, 404, "Experiment not found");
    return successResponse(res, { item });
  })
);

// Update
experimentsRouter.put(
  "/:id",
  asyncHandler(async (req, res) => {
    try {
      const item = await prisma.experiment.update({
        where: { id: req.params.id },
        data: req.body,
      });
      return successResponse(res, { item });
    } catch {
      return errorResponse(res, 404, "Experiment not found");
    }
  })
);

// Delete
experimentsRouter.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    try {
      await prisma.experiment.delete({ where: { id: req.params.id } });
      return successResponse(res, { message: "Experiment deleted" });
    } catch {
      return errorResponse(res, 404, "Experiment not found");
    }
  })
);
