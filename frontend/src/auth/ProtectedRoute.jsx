// src/auth/ProtectedRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";

/**
 * <ProtectedRoute roles={['admin','manager']} />
 * Wenn roles fehlt -> nur Login nötig.
 */
export default function ProtectedRoute({ roles }) {
  const { user, loading } = useAuth();

  if (loading) return <div style={{ padding: "2rem" }}>Lade…</div>;
  if (!user) return <Navigate to="/login" replace />;

  if (roles?.length && !roles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
