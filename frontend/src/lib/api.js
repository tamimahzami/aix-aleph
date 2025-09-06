// src/lib/api.js
// Thin Fetch-Client ohne JSX

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, "") ||
  "http://localhost:5001/api";

async function request(path, { method = "GET", body, headers } = {}) {
  const url = path.startsWith("http") ? path : `${BASE_URL}${path}`;
  const opts = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    credentials: "include", // falls Cookies/Sessions genutzt werden
  };
  if (body !== undefined) {
    opts.body = typeof body === "string" ? body : JSON.stringify(body);
  }

  const res = await fetch(url, opts);
  const isJson = res.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await res.json().catch(() => null) : await res.text();

  if (!res.ok) {
    const err = new Error(
      (data && data.message) || `HTTP ${res.status} ${res.statusText}`
    );
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

function get(path, options) {
  return request(path, { ...options, method: "GET" });
}
function post(path, body, options) {
  return request(path, { ...options, method: "POST", body });
}
function put(path, body, options) {
  return request(path, { ...options, method: "PUT", body });
}
function del(path, options) {
  return request(path, { ...options, method: "DELETE" });
}

// Optionale Convenience-Endpunkte
const health = () => get("/legal/health"); // Beispiel: dein /api/legal/health

export const api = { get, post, put, del, health, BASE_URL };
