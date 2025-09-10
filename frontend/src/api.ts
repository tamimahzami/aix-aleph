// src/api.ts
const base = ((import.meta.env.VITE_API_BASE as string) ?? "http://localhost:5001/api").replace(/\/+$/,'');
export const API_BASE = base;

/* =========================
 * Token Helpers
 * =======================*/
export function getToken() {
  return localStorage.getItem("token");
}
export function clearToken() {
  localStorage.removeItem("token");
}
export function setToken(token: string) {
  localStorage.setItem("token", token);
}

/* =========================
 * Kleine JWT-Helfer
 * =======================*/
function b64UrlToB64(s: string) {
  const replaced = s.replace(/-/g, "+").replace(/_/g, "/");
  const padLen = (4 - (replaced.length % 4)) % 4;
  return replaced + "=".repeat(padLen);
}
export function getEmailFromToken(token: string | null): string | null {
  if (!token) return null;
  try {
    const part = token.split(".")[1];
    if (!part) return null;
    const json = JSON.parse(atob(b64UrlToB64(part)));
    return json?.email ?? null;
  } catch {
    return null;
  }
}

/* =========================
 * Typen
 * =======================*/
export type Experiment = {
  id: string;
  name: string;
  status: string;
  arms: number;
  createdAt: string;
};
export type Lead = {
  id: string;
  email: string;
  name?: string | null;
  createdAt: string;
};
export type ProfessorDto = {
  id: string;
  name: string;
  title?: string | null;
  university?: string | null;
  department?: string | null;
  bio?: string | null;
  avatarUrl?: string | null;
  tagsCsv?: string | null;
};

export type ListResponse<T> = {
  ok: boolean;
  total?: number;
  limit?: number;
  offset?: number;
  items: T[];
};
export type ItemResponse<T> = {
  ok: boolean;
  item: T;
};

/* =========================
 * Fetch Wrapper mit Timeout
 * =======================*/
export async function apiFetch<T = any>(path: string, opts: RequestInit = {}): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s Timeout

  try {
    const headers = new Headers(opts.headers);
    
    // Content-Type nur setzen, wenn wir offensichtlich JSON senden
    const hasBody = opts.body !== undefined && opts.body !== null;
    const isFormData = typeof FormData !== "undefined" && opts.body instanceof FormData;
    if (hasBody && !isFormData && !headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }

    const token = getToken();
    if (token) headers.set("Authorization", `Bearer ${token}`);

    const res = await fetch(`${API_BASE}${path}`, {
      ...opts,
      headers,
      credentials: "include",
      signal: controller.signal,
    });

    if (res.status === 401) {
      clearToken();
      throw new Error("unauthorized");
    }
    if (!res.ok) {
      const ct = res.headers.get("content-type") || "";
      const raw = await res.text().catch(() => "");
      if (ct.includes("application/json")) {
        try {
          const j = raw ? JSON.parse(raw) : null;
          throw new Error(j?.error || j?.message || `HTTP ${res.status}`);
        } catch {
          throw new Error(raw || `HTTP ${res.status}`);
        }
      }
      throw new Error(raw || `HTTP ${res.status}`);
    }

    if (res.status === 204) return null as T;

    const ct = res.headers.get("content-type") || "";
    if (!ct.includes("application/json")) {
      const raw = await res.text().catch(() => "");
      return (raw as unknown) as T;
    }
    return (await res.json()) as T;

  } catch (err: any) {
    if (err?.name === "AbortError") throw new Error("Request timed out");
    throw new Error(err?.message ? `Network error: ${err.message}` : "Network error");
  } finally {
    clearTimeout(timeoutId);
  }
}

/* =========================
 * Convenience Endpoints
 * =======================*/
export const api = {
  health: () => apiFetch("/health"),
  login: (email: string, password: string) =>
    apiFetch<{ token: string }>("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }),
  listExperiments: () => apiFetch<ListResponse<Experiment>>("/experiments"),
  createExperiment: (payload: Partial<Experiment>) =>
    apiFetch<ItemResponse<Experiment>>("/experiments", { method: "POST", body: JSON.stringify(payload) }),
  listLeads: () => apiFetch<ListResponse<Lead>>("/leads"),
  createLead: (email: string, name?: string) =>
    apiFetch<ItemResponse<Lead>>("/leads", { method: "POST", body: JSON.stringify({ email, name }) }),
  listProfessors: (params?: { q?: string; limit?: number; offset?: number; order?: "asc" | "desc" }) =>
    apiFetch<ListResponse<ProfessorDto>>(withQuery("/professors", params)),
  getProfessor: (id: string) => apiFetch<ItemResponse<ProfessorDto>>(`/professors/${id}`),
};

function withQuery(path: string, params?: Record<string, any>): string {
  const u = new URL(API_BASE + path);
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      if (v !== undefined && v !== null && v !== "") {
        u.searchParams.set(k, String(v));
      }
    }
  }
  return u.pathname + u.search;
}
