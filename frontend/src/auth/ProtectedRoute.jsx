// src/auth/ProtectedRoute.jsx
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";

function Spinner() {
  return (
    <div className="flex items-center justify-center py-16 text-sm text-muted">
      Lädt …
    </div>
  );
}

/**
 * Schutz für private Bereiche.
 * Props:
 *  - roles?: string[]  → optionales Rollen-Whitelisting (z.B. ["admin"])
 */
export default function ProtectedRoute({ roles }) {
  const { loading, isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (loading) return <Spinner />;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (Array.isArray(roles) && roles.length > 0) {
    const userRole = user?.role ?? null;
    if (!roles.includes(userRole)) {
      // Kein Zugriff → optional auf 403-Seite oder Dashboard
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <Outlet />;
}
