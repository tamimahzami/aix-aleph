import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function GuestRoute() {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div className="p-6">Lade…</div>;
  return isAuthenticated ? <Navigate to="/settings" replace /> : <Outlet />;
}
