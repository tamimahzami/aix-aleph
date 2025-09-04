// src/utils.js
export function successResponse(res, data = {}, status = 200) {
  return res.status(status).json({ ok: true, ...data });
}
export function errorResponse(res, status = 400, message = "Bad Request") {
  return res.status(status).json({ ok: false, error: message });
}
