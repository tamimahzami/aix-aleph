// src/auth/ProtectedRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Während wir noch nicht wissen, ob der User eingeloggt ist
  if (loading) {
    return (
      <div className="min-h-[40vh] grid place-items-center text-muted">
        Lädt …
      </div>
    );
  }

  // Nicht eingeloggt → auf Login, und ursprünglichen Pfad merken
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Eingeloggt → Seite rendern
  return children;
}
