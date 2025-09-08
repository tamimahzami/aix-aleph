import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function GuestRoute() {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return token ? <Navigate to="/settings" replace /> : <Outlet />;
}
