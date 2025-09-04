import React, { createContext, useContext, useMemo, useState } from "react";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  });

  async function login({ email, password }) {
    // → HIER ggf. deinen API-Call nutzen. Für jetzt: Demo-Login
    // const res = await api.login(email, password);
    // const jwt = res.token;
    const jwt = "demo.jwt.token"; // Demo
    const u = { email };

    localStorage.setItem("token", jwt);
    localStorage.setItem("user", JSON.stringify(u));
    setToken(jwt);
    setUser(u);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  }

  const value = useMemo(() => ({ token, user, login, logout }), [token, user]);
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  return useContext(AuthCtx);
}
