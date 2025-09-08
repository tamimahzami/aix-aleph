// src/api.ts — zentrale API-Helfer

export const API_BASE =
  import.meta.env.VITE_API_BASE || "http://localhost:5001/api";

// ---- Token Store
let _token: string | null = null;

export function setToken(t: string | null) {
  _token = t;
  if (t) localStorage.setItem("token", t);
  else localStorage.removeItem("token");
}

export function getToken() {
  if (_token) return _token;
  _token = localStorage.getItem("token");
  return _token;
}

export function clearToken() {
  _token = null;
  localStorage.removeItem("token");
}

// ---- Fetch wrapper
export async function apiFetch<T = any>(path: string, opts: RequestInit = {}) {
  const headers = new Headers(opts.headers || {});
  headers.set("Content-Type", "application/json");

  const token = getToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_BASE}${path}`, {
    ...opts,
    headers,
    credentials: "include",
  });

  if (res.status === 401) {
    clearToken();
    throw new Error("unauthorized");
  }

  const text = await res.text();
  return text ? (JSON.parse(text) as T) : (null as T);
}

// ---- Convenience Endpoints
export const api = {
  health: () => apiFetch("/health"),
  login: (email: string, password: string) =>
    apiFetch<{ token: string }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  listExperiments: () => apiFetch("/experiments"),
  createExperiment: (payload: any) =>
    apiFetch("/experiments", { method: "POST", body: JSON.stringify(payload) }),
};
