// src/components/common/Header.jsx
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth, useLogout } from "../../auth/AuthContext.jsx";

function NavA({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "px-3 py-2 rounded-md text-sm font-medium transition-colors",
          isActive
            ? "text-[var(--color-primary)]"
            : "text-[var(--color-ink)] hover:text-[var(--color-primary)]",
        ].join(" ")
      }
    >
      {children}
    </NavLink>
  );
}

export default function Header() {
  const { isAuthenticated } = useAuth();
  const logout = useLogout();
  const [open, setOpen] = React.useState(false);

  // Schließe das Mobile-Menü beim Routenwechsel
  React.useEffect(() => {
    const handler = () => setOpen(false);
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-[var(--color-bg)]/95 backdrop-blur border-b border-[var(--color-line)]">
      <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="font-extrabold tracking-tight text-[var(--color-ink)] hover:text-[var(--color-primary)]"
            aria-label="AIX Aleph – Startseite"
          >
            AIX&nbsp;ALEPH
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-2">
          <NavA to="/demo">Demo</NavA>
          <NavA to="/dashboard">Dashboard</NavA>

          {!isAuthenticated ? (
            <>
              <NavA to="/login">Login</NavA>
              <Link
                to="/register"
                className="ml-1 px-4 py-2 rounded-full text-sm font-semibold bg-[var(--color-primary)] text-white hover:opacity-90 transition-opacity"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              type="button"
              onClick={logout}
              className="ml-2 px-4 py-2 rounded-full text-sm font-semibold bg-red-500 text-white hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          )}
        </nav>

        {/* Mobile Toggle */}
        <button
          type="button"
          aria-label="Menü öffnen"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md hover:bg-[var(--color-surface)]/60"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" className="text-[var(--color-ink)]">
            {open ? (
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 6h16M4 12h16M4 18h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="md:hidden border-t border-[var(--color-line)] bg-[var(--color-bg)]">
          <div className="px-4 py-3 flex flex-col gap-1">
            <NavA to="/demo">Demo</NavA>
            <NavA to="/dashboard">Dashboard</NavA>

            {!isAuthenticated ? (
              <>
                <NavA to="/login">Login</NavA>
                <Link
                  to="/register"
                  className="mt-1 px-4 py-2 inline-flex items-center justify-center rounded-full text-sm font-semibold bg-[var(--color-primary)] text-white hover:opacity-90 transition-opacity"
                >
                  Register
                </Link>
              </>
            ) : (
              <button
                type="button"
                onClick={logout}
                className="mt-1 px-4 py-2 inline-flex items-center justify-center rounded-full text-sm font-semibold bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
