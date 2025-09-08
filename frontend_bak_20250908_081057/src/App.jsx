// src/App.jsx
import React, { Suspense, lazy } from "react";
import { Routes, Route, Outlet, Navigate, useLocation } from "react-router-dom";

import Header from "./components/common/Header.jsx";
import Footer from "./components/common/Footer.jsx";
import { useAuth } from "./auth/AuthContext.jsx";

/* ── Pages (lazy) ─────────────────────────────────────────────
   Nur Seiten importieren, die aktuell existieren.
   Aliases/Redirects lösen Legacy-Links ab (siehe Routen unten).
*/
const Landing    = lazy(() => import("./pages/Landing.jsx"));
const Login      = lazy(() => import("./pages/Login.jsx"));
const Register   = lazy(() => import("./pages/Register.jsx"));
const Dashboard  = lazy(() => import("./pages/Dashboard.jsx"));
const NotFound   = lazy(() => import("./pages/NotFound.jsx"));
const StaticPage = lazy(() => import("./pages/StaticPage.jsx"));

const Preise     = lazy(() => import("./pages/Preise.jsx"));
const Demo       = lazy(() => import("./pages/Demo.jsx"));           // falls Demo vorhanden
const Unternehmen= lazy(() => import("./pages/Unternehmen.jsx"));    // wurde wiederhergestellt
const Kontakt    = lazy(() => import("./pages/Kontakt.jsx"));        // existiert laut Build-Assets
const Manifest   = lazy(() => import("./pages/Manifest.jsx"));       // existiert laut Build-Assets

// Legal
const Datenschutz = lazy(() => import("./pages/legal/Datenschutz.jsx"));
// Hinweis: Für Impressum/AGB nutzen wir zunächst Redirects zu /info/:slug,
// bis die dedizierten Seiten wieder angelegt sind.

/* ── Kleine Helfer ─────────────────────────────────────────── */
function Loader() {
  return <div className="p-8 text-center text-muted" role="status" aria-live="polite">Lade Inhalte…</div>;
}

// Scrollt bei Routenwechsel nach oben
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

/* ── Layouts ───────────────────────────────────────────────── */
function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)] text-[var(--color-ink)] font-sans">
      <Header />
      <ScrollToTop />
      <main className="flex-1">
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

function ProtectedLayout() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />;
}

function GuestLayout() {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? <Outlet /> : <Navigate to="/dashboard" replace />;
}

/* ── App Root (Routing) ────────────────────────────────────── */
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        {/* Öffentlich */}
        <Route index element={<Landing />} />
        <Route path="preise" element={<Preise />} />
        <Route path="unternehmen" element={<Unternehmen />} />
        <Route path="demo" element={<Demo />} />
        <Route path="kontakt" element={<Kontakt />} />
        <Route path="manifest" element={<Manifest />} />

        {/* Info-CMS (slug-basiert) */}
        <Route path="info/:slug" element={<StaticPage />} />

        {/* Legal */}
        <Route path="legal/datenschutz" element={<Datenschutz />} />
        {/* Aliases/Redirects für Legacy-Links */}
        <Route path="privacy" element={<Navigate to="/legal/datenschutz" replace />} />
        <Route path="datenschutz" element={<Navigate to="/legal/datenschutz" replace />} />
        <Route path="impressum" element={<Navigate to="/info/impressum" replace />} />
        <Route path="agb" element={<Navigate to="/info/agb" replace />} />

        {/* Nur Gäste */}
        <Route element={<GuestLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* Geschützt */}
        <Route element={<ProtectedLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
