// src/lib/api.js
const rawBase = import.meta?.env?.VITE_API_BASE ?? "http://localhost:5001/api";
const API_BASE = String(rawBase).replace(/\/+$/, "");

function joinUrl(path) {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE}${p}`;
}

export async function apiFetch(path, opts = {}) {
  const headers = new Headers(opts.headers || {});
  // JSON nur setzen, wenn Body vorhanden UND kein Content-Type gesetzt
  const hasBody = opts.body != null && opts.method && opts.method !== "GET";
  if (hasBody && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");
  if (!headers.has("Accept")) headers.set("Accept", "application/json");

  const token = localStorage.getItem("token");
  if (token) headers.set("Authorization", `Bearer ${token}`);

  let res;
  try {
    res = await fetch(joinUrl(path), { ...opts, headers, credentials: "include" });
  } catch (e) {
    throw new Error(e?.message || "Network error");
  }

  if (res.status === 401) {
    localStorage.removeItem("token");
    throw new Error("unauthorized");
  }
  if (res.status === 204) return null;

  let text;
  try {
    text = await res.text();
  } catch {
    text = "";
  }

  let data = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      if (!res.ok) throw new Error(text);
    }
  }
  if (!res.ok) {
    const msg = data?.error || data?.message || `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return data;
}

export const api = {
  health: () => apiFetch("/health"),
  listExperiments: () => apiFetch("/experiments"),
  listLeads: () => apiFetch("/leads"),
};
