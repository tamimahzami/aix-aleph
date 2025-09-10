// src/routes/professors.js
import { Router } from "express";
import { prisma } from "../db/index.js";
import { successResponse, errorResponse } from "../utils.js";

export const professorsRouter = Router();

function toInt(v, d) {
  const n = parseInt(v, 10);
  return Number.isFinite(n) ? n : d;
}

professorsRouter.get("/", async (req, res) => {
  try {
    const q = (req.query.q || "").toString().trim();
    const limit = Math.min(Math.max(toInt(req.query.limit, 12), 1), 100);
    const offset = Math.max(toInt(req.query.offset, 0), 0);
    const order = (req.query.order || "desc").toString().toLowerCase(); // createdAt asc/desc
    const orderBy = { createdAt: order === "asc" ? "asc" : "desc" };

    const or = q
      ? [
          { name: { contains: q, mode: "insensitive" } },
          { title: { contains: q, mode: "insensitive" } },
          { university: { contains: q, mode: "insensitive" } },
          { department: { contains: q, mode: "insensitive" } },
          { tagsCsv: { contains: q, mode: "insensitive" } },
          { bio: { contains: q, mode: "insensitive" } },
        ]
      : undefined;

    const [total, items] = await Promise.all([
      prisma.professor.count({ where: or ? { OR: or } : {} }),
      prisma.professor.findMany({
        where: or ? { OR: or } : {},
        orderBy,
        take: limit,
        skip: offset,
      }),
    ]);

    return successResponse(res, { total, limit, offset, items });
  } catch (err) {
    console.error("GET /api/professors error:", err);
    return errorResponse(res, 500, "Internal Server Error");
  }
});

professorsRouter.get("/:id", async (req, res) => {
  try {
    const item = await prisma.professor.findUnique({ where: { id: req.params.id } });
    if (!item) return errorResponse(res, 404, "Professor not found");
    return successResponse(res, { item });
  } catch (err) {
    console.error("GET /api/professors/:id error:", err);
    return errorResponse(res, 500, "Internal Server Error");
  }
});
