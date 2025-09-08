// src/context/Auth.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { postJSON } from "../lib/api";

type User = { id: string; email: string } | null;
type AuthCtx = {
  user: User; token: string | null; loading: boolean;
  login(email: string, password: string): Promise<void>;
  logout(): void;
};

const Ctx = createContext<AuthCtx>(null!);
export const useAuth = () => useContext(Ctx);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) return setUser(null);
    setUser({ id: "me", email: "admin@example.com" }); // simpel; Backend bietet (noch) kein /me
  }, [token]);

  async function login(email: string, password: string) {
    setLoading(true);
    try {
      const res = await postJSON<{ ok: boolean; token: string; user: { id: string; email: string } }>("/auth/login", { email, password });
      localStorage.setItem("token", res.token);
      setToken(res.token);
      setUser(res.user);
    } finally { setLoading(false); }
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  }

  return <Ctx.Provider value={{ user, token, loading, login, logout }}>{children}</Ctx.Provider>;
}
