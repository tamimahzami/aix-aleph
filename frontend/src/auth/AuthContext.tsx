import React, {createContext, useContext, useEffect, useMemo, useState} from "react";

type User = { id: string; email: string; role?: string; token?: string } | null;
type Ctx = {
  user: User;
  loading: boolean;
  isAuthenticated: boolean;
  login: (u: { email: string; token?: string }) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<Ctx | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    if (token && email) setUser({ id: "local", email, role: "user", token });
    setLoading(false);
  }, []);

  async function login({ email, token }: { email: string; token?: string }) {
    const t = token ?? "demo-token";
    localStorage.setItem("token", t);
    localStorage.setItem("email", email);
    setUser({ id: "local", email, role: "user", token: t });
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setUser(null);
  }

  const value = useMemo(
    () => ({ user, loading, isAuthenticated: !!user, login, logout }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
