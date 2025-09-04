import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../lib/auth";

export default function Sidebar() {
  const { user } = useAuth();
  return (
    <aside className="p-4 space-y-3">
      <Link className="block text-sm px-3 py-2 rounded-lg hover:bg-white/50 dark:hover:bg-white/10" to="/">Home</Link>
      <Link className="block text-sm px-3 py-2 rounded-lg hover:bg-white/50 dark:hover:bg-white/10" to="/demo">Demo</Link>
      {user ? (
        <>
          <Link className="block text-sm px-3 py-2 rounded-lg hover:bg-white/50 dark:hover:bg-white/10" to="/dashboard">Dashboard</Link>
          <Link className="block text-sm px-3 py-2 rounded-lg hover:bg-white/50 dark:hover:bg-white/10" to="/experiments">Experiments</Link>
        </>
      ) : (
        <>
          <Link className="block text-sm px-3 py-2 rounded-lg hover:bg-white/50 dark:hover:bg-white/10" to="/login">Login</Link>
          <Link className="block text-sm px-3 py-2 rounded-lg hover:bg-white/50 dark:hover:bg-white/10" to="/register">Registrieren</Link>
        </>
      )}
    </aside>
  );
}
