// src/context/AuthContext.js
import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";

const TOKEN_KEY = "token";
const EMAIL_KEY = "email";

function readToken() {
  return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY) || "";
}
function readEmail() {
  return localStorage.getItem(EMAIL_KEY) || sessionStorage.getItem(EMAIL_KEY) || "";
}
function clearStorages() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(EMAIL_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(EMAIL_KEY);
}

export const AuthContext = createContext({
  token: "",
  userEmail: "",
  isAuthed: false,
  remember: false,
  login: (_token, _email, _opts) => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  const [token, setToken] = useState(readToken);
  const [userEmail, setUserEmail] = useState(readEmail);
  const [remember, setRemember] = useState(() => !!localStorage.getItem(TOKEN_KEY));

  const isAuthed = !!token;

  // Login: Token/Email speichern (localStorage bei remember, sonst sessionStorage)
  const login = useCallback((newToken, email, options = { remember: false }) => {
    const rem = !!options.remember;
    clearStorages();
    const store = rem ? localStorage : sessionStorage;
    store.setItem(TOKEN_KEY, newToken);
    store.setItem(EMAIL_KEY, email || "");
    setToken(newToken);
    setUserEmail(email || "");
    setRemember(rem);
  }, []);

  // Logout: alles löschen
  const logout = useCallback(() => {
    clearStorages();
    setToken("");
    setUserEmail("");
    setRemember(false);
  }, []);

  // Auf 401-Events aus dem Axios-Interceptor reagieren -> automatisch abmelden
  useEffect(() => {
    const onUnauthorized = () => logout();
    window.addEventListener("auth:unauthorized", onUnauthorized);
    return () => window.removeEventListener("auth:unauthorized", onUnauthorized);
  }, [logout]);

  // Cross-Tab-Synchronisierung
  useEffect(() => {
    function onStorage(ev) {
      if (ev.key === TOKEN_KEY || ev.key === EMAIL_KEY) {
        setToken(readToken());
        setUserEmail(readEmail());
        setRemember(!!localStorage.getItem(TOKEN_KEY));
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const value = useMemo(
    () => ({ token, userEmail, isAuthed, remember, login, logout }),
    [token, userEmail, isAuthed, remember, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
