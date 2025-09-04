// src/pages/Logout.tsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth";

export default function Logout() {
  const { logout } = useAuth();
  const nav = useNavigate();
  useEffect(() => { logout(); nav("/"); }, []);
  return <p>Abgemeldet…</p>;
}
