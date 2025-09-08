// src/lib/api.js
const BASE = import.meta?.env?.VITE_API_BASE || "";

export async function http(method, path, body) {
  const res = await fetch(BASE + path, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
  });
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) {
    const err = new Error(data?.message || `${res.status} ${res.statusText}`);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

// Agent-Chat Request
export function askChat({ question, history = [], provider = "auto" }) {
  return http("POST", "/agent/ask", { question, history, provider });
}
