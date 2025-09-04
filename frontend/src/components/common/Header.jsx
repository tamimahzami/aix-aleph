import React from "react";
import { Link, useLocation } from "react-router-dom";
import HealthBadge from "./HealthBadge.jsx";
import MobileNav from "./MobileNav.jsx";

export default function Header() {
  const location = useLocation();

  const linkCls = (path) =>
    `hover:text-[var(--color-primary)] ${
      location.pathname.startsWith(path) ? "text-[var(--color-primary)]" : ""
    }`;

  return (
    <header className="sticky top-0 z-50 bg-[var(--color-bg)]/80 backdrop-blur border-b border-[var(--color-line)]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 font-extrabold text-lg text-[var(--color-primary)]"
        >
          <span className="w-6 h-6 rounded-full bg-[var(--color-primary)]" />
          AIX Aleph
        </Link>

        {/* Desktop-Navigation */}
        <nav className="hidden md:flex gap-6 text-sm font-semibold">
          <Link to="/about" className={linkCls("/about")}>Über uns</Link>
          <Link to="/features" className={linkCls("/features")}>Funktionen</Link>
          <Link to="/pricing" className={linkCls("/pricing")}>Preise</Link>
          <Link to="/contact" className={linkCls("/contact")}>Kontakt</Link>
        </nav>

        {/* Rechts: Health, Auth, Mobile */}
        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <HealthBadge />
          </div>

          <div className="hidden md:flex gap-3">
            <Link to="/login" className="btn btn-ghost text-sm">Login</Link>
            <Link to="/register" className="btn btn-primary text-sm">Registrieren</Link>
          </div>

          {/* Mobile Burger (öffnet Drawer) */}
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

