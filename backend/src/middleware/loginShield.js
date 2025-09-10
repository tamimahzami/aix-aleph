// src/middleware/loginShield.js
// einfacher Login-Blocker nach X Fehlversuchen
const FAILS = new Map(); // key=email -> { fails, until }

const WINDOW_MS = 10 * 60 * 1000; // 10 Minuten
const LOCK_AFTER = 5;             // 5 Fehlversuche
const LOCK_MS = 15 * 60 * 1000;   // 15 Minuten Sperre

export function ensureNotLocked() {
  return (req, res, next) => {
    const email = (req.body?.email || "").trim().toLowerCase();
    if (!email) return next();
    const now = Date.now();
    const entry = FAILS.get(email);
    if (entry?.until && now < entry.until) {
      const secs = Math.ceil((entry.until - now) / 1000);
      return res.status(429).json({ ok: false, error: `Account locked. Try again in ${secs}s.` });
    }
    next();
  };
}

export function recordLoginFailure(email) {
  const key = (email || "").trim().toLowerCase();
  if (!key) return;
  const now = Date.now();
  let e = FAILS.get(key);
  if (!e || now > (e.windowStart || 0) + WINDOW_MS) {
    e = { fails: 0, windowStart: now, until: 0 };
  }
  e.fails += 1;
  if (e.fails >= LOCK_AFTER) {
    e.until = now + LOCK_MS;
  }
  FAILS.set(key, e);
}

export function recordLoginSuccess(email) {
  const key = (email || "").trim().toLowerCase();
  if (!key) return;
  FAILS.delete(key);
}
