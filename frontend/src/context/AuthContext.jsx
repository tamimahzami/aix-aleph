import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

// Storage-Keys
const LS_USER   = "aix:user";
const LS_TOKEN  = "aix:token";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);      // { id, email, name } | null
  const [token, setToken] = useState(null);    // string | null
  const [booted, setBooted] = useState(false); // initial load guard

  // Beim Start evtl. Remember-Session ziehen
  useEffect(() => {
    try {
      const rawUser  = localStorage.getItem(LS_USER);
      const rawToken = localStorage.getItem(LS_TOKEN);
      if (rawUser && rawToken) {
        setUser(JSON.parse(rawUser));
        setToken(rawToken);
      }
    } catch {}
    setBooted(true);
  }, []);

  // ---- Fake API ----
  async function fakeLoginApi({ email, password }) {
    // Simulierter Server-Delay
    await new Promise(r => setTimeout(r, 500));
    // simple Fake-Validierung
    if (!email || !password) {
      const err = new Error("Missing credentials");
      err.code = "BAD_CREDENTIALS";
      throw err;
    }
    // „Token“ & Beispiel-User
    return {
      token: "demo-token-12345",
      user: { id: "u_demo", email, name: email.split("@")[0] || "User" },
    };
  }

  async function login({ email, password, remember }) {
    const { token, user } = await fakeLoginApi({ email, password });
    setUser(user);
    setToken(token);

    if (remember) {
      localStorage.setItem(LS_USER, JSON.stringify(user));
      localStorage.setItem(LS_TOKEN, token);
    } else {
      localStorage.removeItem(LS_USER);
      localStorage.removeItem(LS_TOKEN);
    }
    return user;
  }

  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem(LS_USER);
    localStorage.removeItem(LS_TOKEN);
  }

  const value = useMemo(() => ({
    user,
    token,
    booted,
    isAuthenticated: !!user && !!token,
    login,
    logout,
  }), [user, token, booted]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
