// src/auth/GuestRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";

export default function GuestRoute() {
  const { loading, isAuthenticated } = useAuth();
  if (loading) return null; // oder ein Spinner wie im ProtectedRoute

  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />;
}
