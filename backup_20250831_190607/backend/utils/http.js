// backend/utils/http.js
function toHttpError(res, status, message) {
  return res.status(status).json({ message });
}
module.exports = { toHttpError };
