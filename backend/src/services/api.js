// src/context/AuthContext.jsx
import React, { useMemo, useState, useCallback } from "react";
import { setAuthToken } from "../services/api";   // <-- wichtig

export const AuthContext = React.createContext({
  isAuthed: false,
  token: null,
  user: null,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  });

  const login = useCallback((newToken, newUser) => {
    setToken(newToken);
    setUser(newUser || null);
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(newUser || null));

    setAuthToken(newToken); // 👈 Axios immer mit Token
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setAuthToken(null); // 👈 Token wieder löschen
  }, []);

  const value = useMemo(
    () => ({ isAuthed: !!token, token, user, login, logout }),
    [token, user, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
