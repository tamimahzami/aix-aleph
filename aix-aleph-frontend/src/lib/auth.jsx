// src/lib/auth.jsx
import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { api } from "./api.js";

/**
 * Auth-Context
 */
const AuthCtx = createContext(null);

/**
 * Provider kapselt Login/Logout/Registrierung und den eingeloggten Nutzer.
 * - Lädt den aktuellen Nutzer beim Mount (api.me()).
 * - Hält einen "ready"-Status, damit Routen sauber warten können.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();

  // Nutzer beim Start laden
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const me = await api.me?.();
        if (!alive) return;
        // akzeptiert { user } oder direkt den Nutzer
        const u = me?.user ?? me ?? null;
        setUser(u);
      } catch {
        setUser(null);
      } finally {
        if (alive) setReady(true);
      }
    })();
    return () => { alive = false; };
  }, []);

  // Stabile Callbacks (verhindert HMR-Warnungen)
  const login = useCallback(async (credentials) => {
    const res = await api.login(credentials);
    const u = res?.user ?? null;
    setUser(u);
    navigate("/dashboard", { replace: true });
    return res;
  }, [navigate]);

  const register = useCallback(async (payload) => {
    const res = await api.register(payload);
    const u = res?.user ?? null;
    setUser(u);
    navigate("/dashboard", { replace: true });
    return res;
  }, [navigate]);

  const logout = useCallback(() => {
    try { api.logout?.(); } catch {}
    setUser(null);
    navigate("/login", { replace: true });
  }, [navigate]);

  const value = useMemo(() => ({
    user,
    ready,
    login,
    register,
    logout,
  }), [user, ready, login, register, logout]);

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

/**
 * Hook zum Zugriff auf den Auth-Context.
 */
export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) {
    throw new Error("useAuth muss innerhalb von <AuthProvider> verwendet werden.");
  }
  return ctx;
}

/**
 * Route-Guard:
 * - Wartet bis `ready === true`
 * - Leitet nicht eingeloggte Nutzer auf /login um (mit Rücksprungziel)
 */
export function ProtectedRoute({ children }) {
  const location = useLocation();
  const { user, ready } = useAuth();

  if (!ready) return null; // oder Loader-Komponente

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}
