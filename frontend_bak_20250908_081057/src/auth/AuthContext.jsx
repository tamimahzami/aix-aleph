import { createContext, useContext, useState, useCallback } from "react";
import { api } from "../lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const logout = useCallback(async () => {
    // Falls du später ein echtes Logout-API hast: await api.logout()
    setUser(null);
  }, []);

  const value = { user, setUser, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  // Fallback verhindert Crashes, falls Provider mal fehlt
  return ctx ?? { user: null, setUser: () => {}, logout: () => {} };
}

// Von Header u.a. erwartet:
export function useLogout() {
  const { logout } = useAuth();
  return logout;
}

export default AuthContext;
