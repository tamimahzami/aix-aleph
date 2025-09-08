import React from "react";
import { Link, NavLink } from "react-router-dom";

const linkStyle: React.CSSProperties = { marginRight: 12, textDecoration: "none" };
const activeStyle: React.CSSProperties = { textDecoration: "underline" };

export default function Header() {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        background: "#fff",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "12px 24px", display: "flex", alignItems: "center", gap: 16 }}>
        <Link to="/" style={{ fontWeight: 700, fontSize: 18, color: "#0f172a", textDecoration: "none" }}>
          AIX ALEPH
        </Link>
        <nav style={{ marginLeft: "auto" }}>
          <NavLink to="/" end style={({ isActive }) => ({ ...linkStyle, color: "#0f172a", ...(isActive ? activeStyle : {}) })}>
            Home
          </NavLink>
          <NavLink to="/preise" style={({ isActive }) => ({ ...linkStyle, color: "#0f172a", ...(isActive ? activeStyle : {}) })}>
            Preise
          </NavLink>
          <NavLink to="/unternehmen" style={({ isActive }) => ({ ...linkStyle, color: "#0f172a", ...(isActive ? activeStyle : {}) })}>
            Unternehmen
          </NavLink>
          <NavLink to="/legal/datenschutz" style={({ isActive }) => ({ ...linkStyle, color: "#0f172a", ...(isActive ? activeStyle : {}) })}>
            Datenschutz
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
