import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();

  function handleLogout() {
    logout();
    // zurück zur letzten öffentlichen Seite
    if (loc.pathname.startsWith("/experiments") || loc.pathname.startsWith("/professors") || loc.pathname.startsWith("/settings")) {
      nav("/", { replace: true });
    }
  }

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[var(--color-bg)]/80 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link to="/" className="font-extrabold tracking-tight">
          AIX Aleph
        </Link>

        <nav className="flex items-center gap-4">
          {/* Öffentliche Links */}
          <Link to="/" className="text-sm hover:underline">Home</Link>

          {/* Auth-abhängig */}
          {user ? (
            <>
              <Link to="/experiments" className="text-sm hover:underline">Experiments</Link>
              <Link to="/professors" className="text-sm hover:underline">Professors</Link>
              <Link to="/settings" className="text-sm hover:underline">Settings</Link>

              <button
                onClick={handleLogout}
                className="ml-2 rounded-full border border-white/15 px-3 py-1 text-sm hover:bg-white/10"
                aria-label="Logout"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm hover:underline">Login</Link>
              <Link
                to="/register"
                className="rounded-full bg-[var(--color-primary)] px-3 py-1 text-sm font-semibold hover:bg-[var(--color-primary-strong)]"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
