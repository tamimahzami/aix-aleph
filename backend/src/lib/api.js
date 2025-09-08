// src/lib/api.js
// Zentrale HTTP-Hilfen + API-Endpunkte für das Frontend

const BASE = (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_API_BASE) || "";

/**
 * http(method, path, body?)
 * - wirft Error mit .status und .data bei !res.ok
 */
export async function http(method, path, body) {
  const res = await fetch(BASE + path, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
  });

  // tolerant gegenüber leeren Bodies
  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch (_) {
    // falls Backend mal Text statt JSON schickt
    data = { raw: text };
  }

  if (!res.ok) {
    const err = new Error((data && (data.message || data.error)) || `${res.status} ${res.statusText}`);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

/* ---------------- Backend-Endpoints ---------------- */

export async function getHealth() {
  return http("GET", "/health");
}

export async function getAgentKeys() {
  return http("GET", "/agent/keys");
}

/**
 * askChat({ question, history = [], provider }?)
 * Erwartet Backend-Route: POST /agent/ask
 * Body: { mode:"chat", question, history:[{role,text}], provider? }
 * Antwort: { answer: string } (oder { text: string })
 */
export async function askChat({ question, history = [], provider } = {}) {
  const payload = {
    mode: "chat",
    question,
    history,
    ...(provider ? { provider } : {}),
  };
  return http("POST", "/agent/ask", payload);
}

/**
 * analyzeTelemetry(telemetry[])
 * POST /agent/ask { mode:"analyze", telemetry }
 */
export async function analyzeTelemetry(telemetry = []) {
  return http("POST", "/agent/ask", { mode: "analyze", telemetry });
}

/* --------- Kleine Mock-Listen fürs UI (lokal) --------- */

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

/* ---------------- Bequemer Namespace ---------------- */

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
