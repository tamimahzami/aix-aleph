// src/auth/RequireRole.jsx
import React from "react";
import { useAuth } from "./AuthContext.jsx";

export default function RequireRole({ roles = [], fallback = null, children }) {
  const { user } = useAuth();
  const role = user?.role ?? null;

  if (roles.length === 0 || roles.includes(role)) {
    return children;
  }
  return fallback ?? null;
}
