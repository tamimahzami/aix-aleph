// src/routes/predict.js
import { Router } from "express";
import { z } from "zod";
import { successResponse, errorResponse } from "../utils.js";
import { logger } from "../lib/logger.js";

const PY_ML_BASE = process.env.PY_ML_BASE || "http://localhost:8000";
export const predictRouter = Router();

const SmartChargeSchema = z.object({
  userEmail: z.string().email(),
  horizonHours: z.number().int().min(1).max(72),
});

const RouteSchema = z.object({
  userEmail: z.string().email(),
  origin: z.tuple([z.number(), z.number()]),        // [lat, lng]
  destination: z.tuple([z.number(), z.number()]),   // [lat, lng]
  departAt: z.string().datetime().optional(),
});

// kleiner Helper mit Timeout
async function postJson(url, body, timeoutMs = 10000) {
  const ctrl = new AbortController();
  const to = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: ctrl.signal,
    });
    const text = await res.text();
    const data = text ? JSON.parse(text) : null;
    if (!res.ok) {
      const msg = (data && (data.error || data.message)) || `HTTP ${res.status}`;
      const err = new Error(msg);
      err.status = res.status;
      throw err;
    }
    return data;
  } finally {
    clearTimeout(to);
  }
}

predictRouter.post("/smart-charge", async (req, res) => {
  const parsed = SmartChargeSchema.safeParse(req.body);
  if (!parsed.success) return errorResponse(res, 400, "Invalid input", { issues: parsed.error.flatten() });
  try {
    const data = await postJson(`${PY_ML_BASE}/smart_charge`, parsed.data);
    return successResponse(res, { result: data });
  } catch (error) {
    logger.error({ error: error.message || String(error) }, "ML Service error");
    return errorResponse(res, (error.status === 404 ? 502 : 500), "ML service unavailable");
  }
});

predictRouter.post("/route", async (req, res) => {
  const parsed = RouteSchema.safeParse(req.body);
  if (!parsed.success) return errorResponse(res, 400, "Invalid input", { issues: parsed.error.flatten() });
  try {
    const data = await postJson(`${PY_ML_BASE}/route`, parsed.data);
    return successResponse(res, { result: data });
  } catch (error) {
    logger.error({ error: error.message || String(error) }, "ML Service error");
    return errorResponse(res, (error.status === 404 ? 502 : 500), "ML service unavailable");
  }
});
