// src/auth/AuthContext.jsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const email = localStorage.getItem("email");
    if (token) {
      setUser({ id: "local", email: email || "user@example.com", role: role || "user", token });
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

  async function login({ email }) {
    const fakeToken = "demo-token";
    localStorage.setItem("token", fakeToken);
    localStorage.setItem("email", email || "user@example.com");
    localStorage.setItem("role", "user");
    setUser({ id: "local", email: email || "user@example.com", role: "user", token: fakeToken });
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    setUser(null);
  }

  const value = useMemo(
    () => ({ user, loading, login, logout, isAuthenticated: !!user }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}

export function useLogout() {
  const { logout } = useAuth();
  return logout;
}
