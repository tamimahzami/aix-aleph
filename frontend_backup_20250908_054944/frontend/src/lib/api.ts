const BASE = import.meta.env.VITE_API_BASE || "";

async function http(path: string, opts: RequestInit & { body?: any } = {}) {
  const { body, headers, ...rest } = opts;
  const res = await fetch(`${BASE}${path}`, {
    ...rest,
    headers: { "Content-Type": "application/json", ...(headers || {}) },
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
  });
  const isJSON = res.headers.get("content-type")?.includes("application/json");
  const data = isJSON ? await res.json().catch(() => ({})) : await res.text();
  if (!res.ok) throw new Error((isJSON ? (data as any)?.message : (data as string)) || `HTTP ${res.status}`);
  return data as any;
}

/* ---- Real Backend ---- */
export const real = {
  listExperiments: () => http("/api/experiments"),
  listLeads:       () => http("/api/leads"),
  register: (payload: { name?: string; email: string; password: string }) =>
    http("/api/auth/register", { method: "POST", body: payload }),
  login: (payload: { email: string; password: string }) =>
    http("/api/auth/login", { method: "POST", body: payload }),
};

/* ---- Mock Fallback ---- */
export const mock = {
  async listExperiments() { return [{ id: 1, status: "DRAFT" }, { id: 2, status: "RUNNING" }]; },
  async listLeads() { return Array.from({ length: 6 }, (_, i) => ({ id: i + 1 })); },
  async register({ email }: { name?: string; email: string; password: string }) {
    await new Promise(r => setTimeout(r, 400));
    return { ok: true, userId: "demo-user-1", email, token: "demo-token" };
  },
  async login({ email }: { email: string; password: string }) {
    await new Promise(r => setTimeout(r, 300));
    return { ok: true, token: "demo-token", user: { id: "demo-user-1", email, role: "user" } };
  },
};

export const api = BASE ? real : mock;
