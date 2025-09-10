import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../lib/auth";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        if (token) {
          const data = await auth.me(token);
          setUser(data.user || data);
        }
      } catch {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  const login = async (email, password) => {
    const data = await auth.login(email, password);
    if (data.token) {
      localStorage.setItem("token", data.token);
      setToken(data.token);
    }
    setUser(data.user || null);
    return data;
  };

  const register = async (name, email, password) => {
    const data = await auth.register(name, email, password);
    if (data.token) {
      localStorage.setItem("token", data.token);
      setToken(data.token);
    }
    setUser(data.user || null);
    return data;
  };

  const logout = async () => {
    try {
      if (token) await auth.logout(token);
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
    }
  };

  return (
    <AuthCtx.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}

export const useAuth = () => useContext(AuthCtx);
