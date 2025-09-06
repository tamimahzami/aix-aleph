// src/components/common/Header.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

import NavItem from "../header/NavItem.jsx";
import MobileNav from "./MobileNav.jsx";
import { useAuth, useLogout } from "../../auth/AuthContext.jsx"; // Imports wurden hier angepasst
import { NAV } from "../../nav.config.js";

export default function Header() {
  const { isAuthenticated } = useAuth();
  const logout = useLogout();
  const { pathname } = useLocation();

  const cfg = NAV?.de ?? { primary: [{ label: "Home", to: "/" }], cta: null };

  const isRouteActive = (to) => {
    if (!to) return false;
    const norm = (s) => (s || "").replace(/\/+$/, "") || "/";
    const a = norm(to);
    const b = norm(pathname);
    if (a === "/") return b === "/";
    return b === a || b.startsWith(a + "/");
  };

  return (
    <header className="bg-[var(--color-bg)] border-b border-[var(--color-border)] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex-shrink-0 font-bold text-[var(--color-primary)]">
          <Link to="/" aria-label="Startseite" className="outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded">
            AIX Aleph
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-4" aria-label="Hauptnavigation">
          {(cfg.primary || []).map((item, i) => (
            <NavItem key={item.id || item.label || item.to || i} group={item} isActive={isRouteActive(item.to)} />
          ))}

          {isAuthenticated ? (
            <button
              type="button"
              onClick={logout}
              className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-red-400"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="px-4 py-2 rounded-md text-[var(--color-ink)] hover:text-[var(--color-primary)] transition-colors duration-200">
                Login
              </Link>
              <Link to="/register" className="px-4 py-2 rounded-md bg-[var(--color-primary)] text-white hover:opacity-90 transition-opacity duration-200">
                Register
              </Link>
            </>
          )}
        </nav>

        <div className="md:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
