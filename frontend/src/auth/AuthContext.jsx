import { createContext, useContext, useState, useMemo } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (data) => setUser(data || { id: "demo-user" });
  const logout = () => setUser(null);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      login,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext) || { user: null, isAuthenticated: false, login: () => {}, logout: () => {} };
}

export function useLogout() {
  const { logout } = useAuth();
  return logout;
}

export default AuthContext;
