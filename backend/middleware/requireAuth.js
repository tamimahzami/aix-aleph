// backend/middleware/requireAuth.js
const jwt = require("jsonwebtoken");

function requireAuth(req, res, next) {
  try {
    const secret = process.env.JWT_SECRET || "dev-secret";
    const header = req.headers.authorization || "";
    const [, token] = header.split(" ");
    if (!token) return res.status(401).json({ message: "Nicht autorisiert" });
    const decoded = jwt.verify(token, secret);
    req.user = decoded; // { sub, email, role, account_type, ... }
    return next();
  } catch {
    return res.status(401).json({ message: "Ungültiges oder abgelaufenes Token" });
  }
}

function ensureNotDemoWrite(req, res, next) {
  if (req.user?.account_type === "demo") {
    return res.status(403).json({ ok: false, message: "Demo: nur Lesezugriff" });
  }
  return next();
}

module.exports = { requireAuth, ensureNotDemoWrite };
