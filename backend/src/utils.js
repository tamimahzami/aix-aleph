// src/utils.js

// Einheitliche Erfolg-Response
export function successResponse(res, data = {}, code = 200) {
  return res.status(code).json({ ok: true, ...data });
}

// Einheitliche Fehler-Response
export function errorResponse(res, code = 500, message = "Server error") {
  return res.status(code).json({ ok: false, error: message });
}

// Async-Wrapper, spart try/catch in Routen
export function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

// Primitive Feld-Validierung
export function requireFields(body, fields = []) {
  for (const field of fields) {
    if (
      body[field] === undefined ||
      body[field] === null ||
      (typeof body[field] === "string" && body[field].trim() === "")
    ) {
      throw new Error(`Missing required field: ${field}`);
    }
  }
}
