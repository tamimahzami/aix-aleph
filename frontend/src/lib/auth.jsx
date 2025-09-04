// src/lib/auth.jsx
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Navigate, useNavigate } from "react-router-dom";

/**
 * Erwartete API:
 * - api.me():    { user } | null
 * - api.login({ email, password }): { user }
 * - api.register(payload): { user }
 * - api.logout(): void
 *
 * Passe die Funktionen unten an deine echte API an,
 * falls du keine src/lib/api.js verwendest.
 */
const api = {
  me() {
    try {
      const raw = localStorage.getItem("auth:user");
      return raw ? { user: JSON.parse(raw) } : null;
    } catch {
      return null;
    }
  },
  async login(credentials) {
    // TODO: echten API-Call einbauen
    // const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, ...)
    const fakeUser = { id: "u1", email: credentials.email };
    return { user: fakeUser };
  },
  async register(payload) {
    // TODO: echten API-Call einbauen
    const fakeUser = { id: "u2", email: payload.email, name: payload.name };
    return { user: fakeUser };
  },
  logout() {
    // TODO: echten API-Call einbauen falls nötig
  },
};

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => api.me()?.user ?? null);
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();

  // Optional: beim Mount aktuellen Nutzer verifizieren (z.B. /auth/me)
  useEffect(() => {
    const bootstrap = async () => {
      try {
        const res = api.me(); // ggf. await fetch('/me')
        setUser(res?.user ?? null);
      } catch {
        setUser(null);
      } finally {
        setReady(true);
      }
    };
    bootstrap();
  }, []);

  // Persistiere User in localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("auth:user", JSON.stringify(user));
    } else {
      localStorage.removeItem("auth:user");
    }
  }, [user]);

  const login = useCallback(
    async (credentials) => {
      const res = await api.login(credentials);
      setUser(res.user ?? null);
      navigate("/dashboard");
      return res;
    },
    [navigate]
  );

  const register = useCallback(
    async (payload) => {
      const res = await api.register(payload);
      setUser(res.user ?? null);
      navigate("/dashboard");
      return res;
    },
    [navigate]
  );

  const logout = useCallback(() => {
    try {
      api.logout();
    } finally {
      setUser(null);
      navigate("/login");
    }
  }, [navigate]);

  const value = useMemo(
    () => ({ user, ready, login, register, logout }),
    [user, ready, login, register, logout]
  );

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) {
    throw new Error("useAuth muss innerhalb von <AuthProvider> verwendet werden.");
  }
  return ctx;
}

export function ProtectedRoute({ children }) {
  const { user, ready } = useAuth();
  if (!ready) return null; // optional: Loader
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
