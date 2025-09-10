// src/auth/AuthContext.jsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);       // { id, name, roles } oder null
  const [loading, setLoading] = useState(true); // Simulierter Initial-Load

  // Beispiel: Lade User aus localStorage (oder ersetze durch echten API-Call)
  useEffect(() => {
    try {
      const raw = localStorage.getItem("auth:user");
      if (raw) setUser(JSON.parse(raw));
    } catch {}
    setLoading(false);
  }, []);

  const login = async (data) => {
    // TODO: echten Login machen (API)
    setUser(data);
    localStorage.setItem("auth:user", JSON.stringify(data));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth:user");
  };

  const value = useMemo(() => ({ user, loading, login, logout }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
