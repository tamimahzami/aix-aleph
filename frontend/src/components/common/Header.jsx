import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth, useLogout } from "../../auth/AuthContext.jsx";

const linkBase =
  "px-3 py-2 rounded-md transition-colors duration-200 outline-none hover:text-[var(--color-primary)]";
const linkActive = "text-[var(--color-primary)]";
const linkInactive = "text-[var(--color-ink)]";

export default function Header() {
  const { isAuthenticated } = useAuth();
  const logout = useLogout?.();

  const NavA = ({ to, label, end }) => (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `${linkBase} ${isActive ? linkActive : linkInactive}`
      }
    >
      {label}
    </NavLink>
  );

  return (
    <header className="bg-[var(--color-bg)] border-b border-[var(--color-line)] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="font-extrabold text-[var(--color-primary)] tracking-tight">
          <Link to="/" className="outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded">
            AIX Aleph
          </Link>
        </div>

        <nav className="flex items-center gap-1">
          <NavA to="/dashboard" label="Dashboard" />
          <NavA to="/demo" label="Demo" />
          {!isAuthenticated ? (
            <>
              <NavA to="/login" label="Login" />
              <NavA to="/register" label="Register" />
            </>
          ) : (
            <button
              type="button"
              onClick={logout}
              className="px-3 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors duration-200"
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
