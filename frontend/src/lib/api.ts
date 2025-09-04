import type {} from "react";

const BASE = import.meta.env.VITE_API_BASE || "/api";

type JsonInit = Omit<RequestInit, "body"> & { headers?: HeadersInit };
type WithBody = JsonInit & { body?: unknown };

async function requestJSON<T>(path: string, init?: WithBody): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
    body: init?.body != null ? JSON.stringify(init.body) : undefined,
    credentials: "include",
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} ${res.statusText} – ${text}`);
  }
  return (await res.json()) as T;
}

export const api = {
  getJSON<T>(path: string, init?: JsonInit) {
    return requestJSON<T>(path, { method: "GET", ...(init || {}) });
  },
  postJSON<T>(path: string, body?: unknown, init?: JsonInit) {
    return requestJSON<T>(path, { method: "POST", body, ...(init || {}) });
  },
  putJSON<T>(path: string, body?: unknown, init?: JsonInit) {
    return requestJSON<T>(path, { method: "PUT", body, ...(init || {}) });
  },
  delJSON<T>(path: string, init?: JsonInit) {
    return requestJSON<T>(path, { method: "DELETE", ...(init || {}) });
  },

  health(): Promise<{ ok: boolean; ts: string }> {
    return this.getJSON("/health");
  },

  // Placeholder – nur verwenden, wenn dein Backend /api/leads bereitstellt
  leads(): Promise<Array<{ id: string; name?: string; email: string; source?: string }>> {
    return this.getJSON("/leads");
  },
};
