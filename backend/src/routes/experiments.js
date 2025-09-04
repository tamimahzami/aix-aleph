// src/routes/experiments.js
import { Router } from "express";
import { prisma } from "../db/index.js";
import { successResponse, errorResponse } from "../utils.js";

export const experimentsRouter = Router();

// Alle Experimente
experimentsRouter.get("/", async (_req, res) => {
  const items = await prisma.experiment.findMany({ orderBy: { createdAt: "desc" } });
  successResponse(res, { items });
});

// Neues Experiment
experimentsRouter.post("/", async (req, res) => {
  try {
    const item = await prisma.experiment.create({ data: req.body });
    successResponse(res, { item });
  } catch (e) {
    errorResponse(res, 400, "Failed to create experiment");
  }
});

// Detail
experimentsRouter.get("/:id", async (req, res) => {
  const item = await prisma.experiment.findUnique({ where: { id: req.params.id } });
  if (!item) return errorResponse(res, 404, "Experiment not found");
  successResponse(res, { item });
});

// Update
experimentsRouter.put("/:id", async (req, res) => {
  try {
    const item = await prisma.experiment.update({
      where: { id: req.params.id },
      data: req.body,
    });
    successResponse(res, { item });
  } catch {
    errorResponse(res, 404, "Experiment not found");
  }
});

// Delete
experimentsRouter.delete("/:id", async (req, res) => {
  try {
    await prisma.experiment.delete({ where: { id: req.params.id } });
    successResponse(res, { message: "Experiment deleted" });
  } catch {
    errorResponse(res, 404, "Experiment not found");
  }
});
