import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children, fallback = null }) {
  const { isAuthed } = useContext(AuthContext);
  if (!isAuthed) return fallback ?? <p className="alert">Bitte einloggen, um fortzufahren.</p>;
  return children;
}
