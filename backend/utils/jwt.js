// backend/utils/jwt.js
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";
const JWT_EXPIRES = process.env.JWT_EXPIRES || "7d";
const COOKIE_NAME = process.env.COOKIE_NAME || "aix_sid";
const COOKIE_SECURE = (process.env.COOKIE_SECURE || "false") === "true";

export function signSession(payload, expires = JWT_EXPIRES) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: expires });
}

export function verifySession(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null; // invalid oder expired
  }
}

export function cookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax",
    secure: COOKIE_SECURE,
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 Tage
  };
}

export { COOKIE_NAME };
