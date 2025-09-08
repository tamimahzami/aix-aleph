// src/AuthContext.tsx
import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { getToken, setToken as saveToken, clearToken as wipeToken, getEmailFromToken } from "./api";

type User = { email: string };
type AuthContextType = {
  token: string | null;
  user: User | null;
  isLoggedIn: boolean;
  login: (newToken: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hilfsfunktionen
function decodeExp(token: string): number | null {
  try {
    const part = token.split(".")[1];
    if (!part) return null;
    const payload = JSON.parse(atob(part.replace(/-/g, "+").replace(/_/g, "/")));
    return typeof payload?.exp === "number" ? payload.exp : null; // exp in Sekunden (Unix)
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  // Initial laden
  useEffect(() => {
    const t = getToken();
    if (!t) return;
    const email = getEmailFromToken(t);
    const exp = decodeExp(t);
    // Wenn abgelaufen, direkt aufräumen
    if (exp && exp * 1000 <= Date.now()) {
      wipeToken();
      return;
    }
    setToken(t);
    if (email) setUser({ email });
  }, []);

  // Optional: sanfter Auto-Logout, wenn exp erreicht
  useEffect(() => {
    if (!token) return;
    const exp = decodeExp(token);
    if (!exp) return;
    const ms = exp * 1000 - Date.now();
    if (ms <= 0) {
      logout();
      return;
    }
    const id = setTimeout(() => logout(), ms);
    return () => clearTimeout(id);
  }, [token]);

  // Cross-Tab Sync (z. B. anderer Tab loggt aus)
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== "token") return;
      const t = localStorage.getItem("token");
      if (!t) {
        setToken(null);
        setUser(null);
      } else {
        setToken(t);
        const email = getEmailFromToken(t);
        setUser(email ? { email } : null);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const login = (newToken: string) => {
    saveToken(newToken);
    setToken(newToken);
    const email = getEmailFromToken(newToken);
    setUser(email ? { email } : null);
  };

  const logout = () => {
    wipeToken();
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({ token, user, isLoggedIn: !!token, login, logout }),
    [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth muss innerhalb eines AuthProvider verwendet werden");
  return ctx;
}
