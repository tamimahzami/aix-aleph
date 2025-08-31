// src/App.js
import React, { useEffect, useState, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

// Öffentliche Seiten
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import AGB from "./pages/AGB";
import Datenschutz from "./pages/Datenschutz";
import Impressum from "./pages/Impressum";
import Cookies from "./pages/Cookies";

// Dashboard (nur verwenden, wenn diese Dateien existieren)
import DashboardLayout from "./dashboard/DashboardLayout";
import Overview from "./dashboard/pages/Overview";
import Monitoring from "./dashboard/pages/Monitoring";
import Fleet from "./dashboard/pages/Fleet";
import Routing from "./dashboard/pages/Routing";
import Energy from "./dashboard/pages/Energy";
import Maintenance from "./dashboard/pages/Maintenance";
import Reports from "./dashboard/pages/Reports";
import Admin from "./dashboard/pages/Admin";

import { AuthContext } from "./context/AuthContext";

/* ---------- Theme ---------- */
function getInitialTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") return saved;
  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
  return prefersDark ? "dark" : "light";
}
function applyTheme(theme) {
  document.documentElement.classList.toggle("theme-dark", theme === "dark");
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.style.colorScheme = theme;
}

/* ---------- Geschützte Route ---------- */
function Protected({ children }) {
  const { isAuthed } = useContext(AuthContext);
  return isAuthed ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    applyTheme(theme);              // <- hier war der Fehler (Klammern fehlten)
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <div
      className={theme === "dark" ? "theme-dark" : ""}
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      {/* Header */}
      <Header theme={theme} onToggleTheme={toggleTheme} />

      {/* Inhalt */}
      <main className="page-container fade-up" style={{ flex: 1, maxWidth: 980, margin: "0 auto" }}>
        <Routes>
          {/* Öffentliche Seiten */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<ResetPassword />} />

          {/* Rechtliches */}
          <Route path="/agb" element={<AGB />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/cookies" element={<Cookies />} />

          {/* Dashboard (geschützt) */}
          <Route
            path="/dashboard/*"
            element={
              <Protected>
                <DashboardLayout theme={theme} onToggleTheme={toggleTheme} />
              </Protected>
            }
          >
            <Route index element={<Overview />} />
            <Route path="monitoring" element={<Monitoring />} />
            <Route path="fleet" element={<Fleet />} />
            <Route path="routing" element={<Routing />} />
            <Route path="energy" element={<Energy />} />
            <Route path="maintenance" element={<Maintenance />} />
            <Route path="reports" element={<Reports />} />
            <Route path="admin" element={<Admin />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
