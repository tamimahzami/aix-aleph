// src/components/common/Header.jsx
import React from "react";
import { NavLink, Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header-root">
      <div className="header-inner">
        {/* Brand */}
        <Link to="/" className="brand" aria-label="Zur Startseite">
          <span className="brand-mark" aria-hidden="true" />
          <span className="brand-text">AIX Aleph</span>
        </Link>

        {/* Navigation */}
        <nav className="nav" aria-label="Hauptnavigation">
          <NavLink to="/dashboard" className="cockpit-btn">
            Dashboard
          </NavLink>
          <NavLink to="/login" className="cockpit-btn">
            Login
          </NavLink>
          <NavLink to="/start" className="cockpit-btn cockpit-btn--start">
            Start
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
