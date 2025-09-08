import { createContext, useContext, useMemo, useState } from "react";
import { api } from "../lib/api";

type User = { id: string; email: string; name?: string | null; role?: string };

type AuthCtx = {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => void;
};

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  async function login(email: string, password: string) {
    const res = await api.login({ email, password });
    setUser(res.user);
    setToken(res.token);
  }
  async function register(email: string, password: string, name?: string) {
    const res = await api.register({ email, password, name });
    setUser(res.user);
    setToken(res.token);
  }
  function logout() {
    setUser(null);
    setToken(null);
  }

  const value = useMemo(() => ({ user, token, login, register, logout }), [user, token]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAuth must be used within <AuthProvider>");
  return v;
}
