// src/components/routing/RequireAuth.jsx
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import { Navigate, useLocation } from "react-router-dom";

/** LocalStorage Keys */
const LS_USER = "aix:user";
const LS_TOKEN = "aix:token";

/** ========================
 *  Auth Context + Provider
 *  ======================== */
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [booted, setBooted] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Initial load from localStorage
  useEffect(() => {
    try {
      const u = localStorage.getItem(LS_USER);
      const t = localStorage.getItem(LS_TOKEN);
      if (u && t) {
        setUser(JSON.parse(u));
        setToken(t);
      }
    } catch {
      // ignore parse errors
    } finally {
      setBooted(true);
    }
  }, []);

  /** Fake-API – hier später echte API einhängen */
  const fakeLoginApi = useCallback(async ({ email, password }) => {
    await new Promise((r) => setTimeout(r, 500)); // simuliertes Delay
    if (!email || !password) {
      const err = new Error("Missing credentials");
      err.code = "BAD_CREDENTIALS";
      throw err;
    }
    return {
      token: "demo-token-12345",
      user: { id: "u_demo", email, name: email.split("@")[0] || "User" },
    };
  }, []);

  const login = useCallback(
    async ({ email, password, remember }) => {
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
    },
    [fakeLoginApi]
  );

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(LS_USER);
    localStorage.removeItem(LS_TOKEN);
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      booted,
      isAuthenticated: !!user && !!token,
      login,
      logout,
    }),
    [user, token, booted, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}

/** ========================
 *  Route Guards
 *  ======================== */

/** Schützt private Routen. Leitet auf /login um und merkt sich die Ziel-URL. */
export function RequireAuth({ children }) {
  const { isAuthenticated, booted } = useAuth();
  const location = useLocation();

  if (!booted) {
    // optional: Mini-Spinner/Placeholder
    return null;
  }
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ redirectTo: location.pathname + location.search }}
      />
    );
  }
  return children;
}

/** Für Seiten wie Login/Registrieren: bereits eingeloggte User ins Dashboard. */
export function GuestOnly({ children }) {
  const { isAuthenticated, booted } = useAuth();
  const location = useLocation();

  if (!booted) return null;
  if (isAuthenticated) {
    return (
      <Navigate
        to="/dashboard"
        replace
        state={{ from: location.pathname + location.search }}
      />
    );
  }
  return children;
}
