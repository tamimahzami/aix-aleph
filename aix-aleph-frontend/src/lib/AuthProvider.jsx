// src/lib/auth.jsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "./api";
import { useNavigate, Navigate } from "react-router-dom";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  // api.me() liefert synchron user|null aus dem LocalStorage
  const [user, setUser] = useState(() =>
    typeof window !== "undefined" ? api.me() : null
  );
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Optional: /api/auth/me callen, falls Backend-Endpoint vorhanden.
    // Für jetzt: sofort "ready"
    setReady(true);
  }, []);

  const navigate = useNavigate();

  const value = useMemo(
    () => ({
      user,
      ready,

      // benutzt api.login aus api.js (setzt AIX_TOKEN & AIX_USER)
      async login({ email, password }) {
        const res = await api.login({ email, password });
        setUser(res?.user || null);
        navigate("/dashboard");
        return res;
      },

      // benutzt api.register aus api.js (setzt AIX_TOKEN & AIX_USER)
      async register({ name, email, password }) {
        const res = await api.register({ name, email, password });
        setUser(res?.user || null);
        navigate("/dashboard");
        return res;
      },

      logout() {
        api.logout();        // entfernt AIX_TOKEN & AIX_USER
        setUser(null);
        navigate("/login");
      },
    }),
    [navigate, user, ready]
  );

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  return useContext(AuthCtx);
}

// Guarded Route
export function ProtectedRoute({ children }) {
  const { user, ready } = useAuth();
  if (!ready) return null;                // oder Loader/Spinner
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
