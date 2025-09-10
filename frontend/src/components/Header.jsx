import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="border-b bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-extrabold tracking-wide">
          ALIX <span className="text-blue-600">ALEPH</span>
        </Link>

        <nav className="flex items-center gap-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-2 py-1 rounded ${isActive ? "bg-blue-50 text-blue-700" : "text-gray-700"}`
            }
          >
            Home
          </NavLink>
          {user && (
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `px-2 py-1 rounded ${isActive ? "bg-blue-50 text-blue-700" : "text-gray-700"}`
              }
            >
              Dashboard
            </NavLink>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {!user ? (
            <>
              <Link to="/login" className="btn-outline">Login</Link>
              <Link to="/register" className="btn-primary">Registrieren</Link>
            </>
          ) : (
            <>
              <span className="text-sm text-gray-700">Hi, {user.name || user.email}</span>
              <button onClick={logout} className="btn-outline">Logout</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
