// src/middleware/rateLimit.js
// sehr simpler In-Memory-Rate-Limiter (prozesslokal)
const buckets = new Map();

export function rateLimit({ windowMs = 60_000, max = 60, keyGenerator = (req) => req.ip } = {}) {
  return (req, res, next) => {
    const key = keyGenerator(req);
    const now = Date.now();
    let b = buckets.get(key);
    if (!b || now > b.reset) {
      b = { count: 0, reset: now + windowMs };
      buckets.set(key, b);
    }
    b.count += 1;
    if (b.count > max) {
      res.setHeader("Retry-After", Math.ceil((b.reset - now) / 1000));
      return res.status(429).json({ ok: false, error: "Too many requests" });
    }
    next();
  };
}
