import React, { createContext, useContext, useEffect, useState } from "react";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Token aus localStorage “rehydraten”
  useEffect(() => {
    const token = localStorage.getItem("token");
    // Fake-User, wenn Token existiert (hier kannst du /me callen)
    setUser(token ? { id: "me", role: "user" } : null);
    setLoading(false);
  }, []);

  const login = (token, userData = { id: "me", role: "user" }) => {
    localStorage.setItem("token", token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthCtx.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
