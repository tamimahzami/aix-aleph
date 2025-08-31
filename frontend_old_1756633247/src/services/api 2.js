// src/services/api.js
import axios from "axios";

// Basis-URL aus .env oder Fallback
export const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5001";

// Gemeinsame Axios-Instanz
export const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
  withCredentials: false,
});

/* -------------------- Interceptors -------------------- */

// Request: Token automatisch mitsenden
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response: 401 global behandeln
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error?.response?.status === 401) {
      // Token entfernen & UI informieren
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      window.dispatchEvent(new CustomEvent("auth:unauthorized"));
      console.warn("Nicht autorisiert – Token entfernt. Bitte neu einloggen.");
    }
    return Promise.reject(error);
  }
);

/* -------------------- Fehler-Mapping -------------------- */
function getMsg(err) {
  if (err?.response?.data?.message) return err.response.data.message;
  if (err?.message) return err.message;
  return "Unbekannter Fehler";
}

/* -------------------- Öffentliche API -------------------- */
export async function getHealth() {
  try {
    const res = await api.get("/health");
    return res.data;
  } catch (e) {
    throw new Error(getMsg(e));
  }
}

export async function register(email, password) {
  try {
    const res = await api.post("/api/auth/register", { email, password });
    return res.data; // { message }
  } catch (e) {
    throw new Error(getMsg(e));
  }
}

export async function login(email, password) {
  try {
    const res = await api.post("/api/auth/login", { email, password });
    return res.data; // { token, email, message? }
  } catch (e) {
    throw new Error(getMsg(e));
  }
}

export async function getProtected() {
  try {
    const res = await api.get("/api/protected");
    return res.data; // { message }
  } catch (e) {
    throw new Error(getMsg(e));
  }
}

/* -------------------- Passwort-Reset -------------------- */

// Start: E-Mail absenden (DEV: Backend loggt Link & schickt devToken zurück)
export async function requestPasswordReset(email) {
  try {
    const res = await api.post("/api/auth/request-reset", { email });
    return res.data; // { message, devToken? }
  } catch (e) {
    throw new Error(getMsg(e));
  }
}

// Abschluss: Token + neues Passwort senden
export async function resetPassword(token, newPassword) {
  try {
    const res = await api.post("/api/auth/reset", { token, password: newPassword });
    return res.data; // { message }
  } catch (e) {
    throw new Error(getMsg(e));
  }
}

/* -------------------- Passkeys (WebAuthn) – Stubs -------------------- */
export async function beginPasskeyRegistration() {
  try {
    const res = await api.get("/api/auth/webauthn/register/options");
    return res.data; // später: PublicKeyCredentialCreationOptions
  } catch (e) {
    throw new Error(getMsg(e));
  }
}

export async function finishPasskeyRegistration(attestation) {
  try {
    const res = await api.post("/api/auth/webauthn/register/verify", attestation);
    return res.data; // { message }
  } catch (e) {
    throw new Error(getMsg(e));
  }
}

export async function beginPasskeyLogin() {
  try {
    const res = await api.get("/api/auth/webauthn/login/options");
    return res.data; // später: PublicKeyCredentialRequestOptions
  } catch (e) {
    throw new Error(getMsg(e));
  }
}

export async function finishPasskeyLogin(assertion) {
  try {
    const res = await api.post("/api/auth/webauthn/login/verify", assertion);
    return res.data; // { token }
  } catch (e) {
    throw new Error(getMsg(e));
  }
}

/* -------------------- OAuth – Stub -------------------- */
export function getOAuthUrl(provider = "google") {
  // Später: echte Provider-URL vom Backend holen
  return `${API_BASE}/api/auth/oauth/${encodeURIComponent(provider)}/url`;
}
