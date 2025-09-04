import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

/* ──────────────────────────────────────────────────────────────
   LAYOUT
   - Header und Footer sind global (oben/unten)
   - <main className="flex-1"> nimmt den restlichen Platz ein
   ────────────────────────────────────────────────────────────── */
import Header from "./components/common/Header.jsx";
import Footer from "./components/common/Footer.jsx";

/* ──────────────────────────────────────────────────────────────
   CORE PAGES (App-Seiten)
   ────────────────────────────────────────────────────────────── */
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import NotFound from "./pages/NotFound.jsx";

/* Statische Info-/Legal-Seiten via Slug, z.B. /info/privacy, /info/imprint */
import StaticPage from "./pages/StaticPage.jsx";

/* ──────────────────────────────────────────────────────────────
   AUTH-GUARD
   - Einfache Gatekeeper-Komponente
   - Prüft, ob es einen Token in localStorage gibt
   - Wenn nein → redirect auf /login
   ────────────────────────────────────────────────────────────── */
function RequireAuth({ children }) {
  const isAuthed = !!localStorage.getItem("token");
  return isAuthed ? children : <Navigate to="/login" replace />;
}

/* ──────────────────────────────────────────────────────────────
   APP ROOT
   - Rahmen: dunkles Theme via CSS-Tokens
   - Globaler Header + Footer
   - Alle Routen zentral an einer Stelle
   ────────────────────────────────────────────────────────────── */
export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)] text-[var(--color-ink)]">
      {/* Oben: globale Navigation */}
      <Header />

      {/* Mitte: Routenbereich */}
      <main className="flex-1">
        <Routes>
          {/* Landing / Marketing */}
          <Route path="/" element={<Landing />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Geschützte App-Zone */}
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />

          {/* Statische Inhalte per Slug (Legal/Info) */}
          {/* Beispiele: /info/privacy, /info/imprint, /info/terms */}
          <Route path="/info/:slug" element={<StaticPage />} />

          {/* Fallback 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Unten: globaler Footer */}
      <Footer />
    </div>
  );
}
