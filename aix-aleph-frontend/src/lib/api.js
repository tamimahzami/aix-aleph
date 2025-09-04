// src/lib/api.js
const BASE = import.meta.env.VITE_API_URL || "http://localhost:5001";

function getToken() {
  try { return localStorage.getItem("AIX_TOKEN") || ""; } catch { return ""; }
}

async function http(path, init = {}) {
  const token = getToken();
  const res = await fetch(BASE + path, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init.headers || {}),
    },
    ...init,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} ${res.statusText} – ${text}`);
  }
  const ct = res.headers.get("content-type") || "";
  return ct.includes("application/json") ? res.json() : res.text();
}

export const api = {
  base: BASE,
  // health / experiments
  health() { return http("/api/health"); },
  listExperiments() { return http("/api/experiments"); },
  getExperiment(id) { return http(`/api/experiments/${id}`); },
  createExperiment(payload) {
    return http("/api/experiments", {
      method: "POST",
      body: JSON.stringify({ type: "AB", status: "DRAFT", strategy: "FIXED", ...payload }),
    });
  },
  patchExperimentStatus(id, status) {
    return http(`/api/experiments/${id}`, { method: "PATCH", body: JSON.stringify({ status }) });
  },
  updateArmSplits(id, arms) {
    return http(`/api/experiments/${id}`, { method: "PATCH", body: JSON.stringify({ arms }) });
  },
  addMetric(expId, metric) {
    return http(`/api/experiments/${expId}/metrics`, { method: "POST", body: JSON.stringify(metric) });
  },
  deleteExperiment(id) {
    return http(`/api/experiments/${id}`, { method: "DELETE" }).catch(e => {
      if (String(e.message).includes("HTTP 404")) return { ok: true, deleted: false };
      throw e;
    });
  },

  // AUTH
  async login({ email, password }) {
    const data = await http("/api/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
    if (data?.token) localStorage.setItem("AIX_TOKEN", data.token);
    if (data?.user) localStorage.setItem("AIX_USER", JSON.stringify(data.user));
    return data;
  },
  async register({ name, email, password }) {
    const data = await http("/api/auth/register", { method: "POST", body: JSON.stringify({ name, email, password }) });
    if (data?.token) localStorage.setItem("AIX_TOKEN", data.token);
    if (data?.user) localStorage.setItem("AIX_USER", JSON.stringify(data.user));
    return data;
  },
  logout() {
    try {
      localStorage.removeItem("AIX_TOKEN");
      localStorage.removeItem("AIX_USER");
    } catch {}
  },
  me() {
    try { return JSON.parse(localStorage.getItem("AIX_USER") || "null"); } catch { return null; }
  },
};

if (typeof window !== "undefined") window.api = api;
