// src/components/RequireAuth.tsx — FINAL
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../state/AuthContext";

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const { token, loading } = useAuth();
  const loc = useLocation();

  if (loading) return <div className="p-6">Lade…</div>;
  if (!token) return <Navigate to="/login" state={{ from: loc }} replace />;

  return children;
}
