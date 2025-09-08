// frontend/src/lib/api.js
// Kleine API-Helper für dein Frontend (Axios optional, hier mit fetch umgesetzt)

const BASE_URL = (import.meta?.env?.VITE_API_BASE || "/api").replace(/\/+$/, "");

// --------- Helpers ----------
async function http(method, path, body) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
  });
  // Versuche JSON; wenn leerer Body, gib null zurück
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

// --------- Backend-Routen ----------
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

// --------- Beispiel-/Mock-Endpunkte für UI-Listen ----------
// (Nur Frontend-Dummy-Daten, damit Seiten rendern)

export async function listLeads() {
  // Simulierter Delay
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
  // Falls du später echte Daten hast: return http("GET", "/experiments");
  await new Promise((r) => setTimeout(r, 100));
  return [
    { id: "exp-1", title: "Prompt Tuning v1", status: "running" },
    { id: "exp-2", title: "RAG Baseline", status: "paused" },
  ];
}
