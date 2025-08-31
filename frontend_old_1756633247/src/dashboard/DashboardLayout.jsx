import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function DashboardLayout({ theme, onToggleTheme }) {
  const linkStyle = ({ isActive }) => ({
    color: isActive ? "var(--primary)" : "inherit",
    fontWeight: isActive ? 700 : 600,
    textDecoration: "none",
    padding: "8px 10px",
    borderRadius: 10,
    display: "block",
  });

  return (
    <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", minHeight: "70vh", gap: 16 }}>
      <aside
        style={{
          background: "var(--card)",
          border: "1px solid #e5e7eb",
          borderRadius: 12,
          padding: 12,
          position: "sticky",
          top: 16,
          height: "fit-content",
        }}
      >
        <h3 style={{ marginTop: 0 }}>Dashboard</h3>
        <nav aria-label="Dashboard Navigation">
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 6 }}>
            <li><NavLink to="" end style={linkStyle}>Übersicht</NavLink></li>
            <li><NavLink to="monitoring" style={linkStyle}>Echtzeit-Monitoring</NavLink></li>
            <li><NavLink to="fleet" style={linkStyle}>Flotte</NavLink></li>
            <li><NavLink to="routing" style={linkStyle}>Routenplanung</NavLink></li>
            <li><NavLink to="energy" style={linkStyle}>Energie</NavLink></li>
            <li><NavLink to="maintenance" style={linkStyle}>Wartung</NavLink></li>
            <li><NavLink to="reports" style={linkStyle}>Reports</NavLink></li>
            <li><NavLink to="admin" style={linkStyle}>Admin</NavLink></li>
          </ul>
        </nav>
      </aside>

      <section style={{ display: "grid", gap: 16 }}>
        <Outlet />
      </section>
    </div>
  );
}
