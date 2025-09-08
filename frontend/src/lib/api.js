// frontend/src/lib/api.js
// Zentrale API-Helpers (fetch-basiert) + kleine Mock-Endpunkte fürs UI

export const BASE_URL = (import.meta?.env?.VITE_API_BASE || "/api").replace(/\/+$/, "");

// -------- fetch Helper ----------
export async function http(method, path, body) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    const message = data?.message || `${res.status} ${res.statusText}`;
    const err = new Error(message);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

// -------- Backend-Endpoints ----------
export async function getHealth() {
  return http("GET", "/health");
}

export async function getAgentKeys() {
  return http("GET", "/agent/keys");
}

export async function askChat({ question, history = [], provider } = {}) {
  const payload = {
    mode: "chat",
    history,
    question,
    ...(provider ? { provider } : {}),
  };
  return http("POST", "/agent/ask", payload);
}

export async function analyzeTelemetry(telemetry = []) {
  const payload = { mode: "analyze", telemetry };
  return http("POST", "/agent/ask", payload);
}

// -------- Mock-Listen fürs UI ----------
export async function listLeads() {
  await new Promise((r) => setTimeout(r, 120));
  return Array.from({ length: 12 }, (_, i) => ({
    id: `lead-${i + 1}`,
    name: `Lead ${i + 1}`,
    email: `lead${i + 1}@example.com`,
    score: Math.round(50 + Math.random() * 50),
    createdAt: new Date(Date.now() - i * 86400000).toISOString(),
  }));
}

export async function listExperiments() {
  await new Promise((r) => setTimeout(r, 100));
  return [
    { id: "exp-1", title: "Prompt Tuning v1", status: "running" },
    { id: "exp-2", title: "RAG Baseline", status: "paused" },
  ];
}

// -------- Bequemer Default-Export (kompatibel zu `import { api } ...`)
export const api = {
  http,
  getHealth,
  getAgentKeys,
  askChat,
  analyzeTelemetry,
  listLeads,
  listExperiments,
};

export default api;
