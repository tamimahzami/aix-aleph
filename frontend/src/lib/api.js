// src/lib/api.js
const BASE = import.meta.env.VITE_API_BASE || "";

async function http(path, { method = "GET", body, headers } = {}) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(headers || {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
  });

  const isJSON = res.headers.get("content-type")?.includes("application/json");
  const data = isJSON ? await res.json().catch(() => ({})) : await res.text();

  if (!res.ok) {
    const msg = (isJSON ? data?.message : data) || `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return data;
}

// --- Real endpoints (if provided by backend) ---
const real = {
  register: (payload) => http("/api/auth/register", { method: "POST", body: payload }),
  login: (payload) => http("/api/auth/login", { method: "POST", body: payload }),
  verifyEmail: (token) => http(`/api/auth/verify-email?token=${encodeURIComponent(token)}`, { method: "POST" }),
  requestPasswordReset: (email) => http("/api/auth/request-password-reset", { method: "POST", body: { email } }),

  listExperiments: () => http("/api/experiments"),
  listLeads:       () => http("/api/leads"),
};

// --- Fallback Mock (if no backend is available) ---
const mock = {
  async register({ name, email }) {
    console.info("[mock] register", { name, email });
    await new Promise(r => setTimeout(r, 400));
    return { ok: true, userId: "demo-user-1", emailVerified: false };
  },
  async login({ email }) {
    console.info("[mock] login", { email });
    await new Promise(r => setTimeout(r, 300));
    return { ok: true, token: "demo-token" };
  },
  async verifyEmail() { return { ok: true }; },
  async requestPasswordReset() { return { ok: true }; },

  async listExperiments() { return [{ id: 1 }, { id: 2 }, { id: 3 }]; },
  async listLeads()       { return new Array(12).fill(0).map((_, i) => ({ id: i+1 })); },
};

export const api = BASE ? real : mock;
