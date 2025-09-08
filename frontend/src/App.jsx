import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";

import Header from "./components/common/Header.jsx";
import Footer from "./components/common/Footer.jsx";
import { AuthProvider, useAuth } from "./auth/AuthContext.jsx";

/* ── Helpers ───────────────────────────────────────────────── */
function Loader() {
  return <div className="p-8 text-center text-[var(--color-ink-muted)]">Lade Inhalte…</div>;
}

// Sicherer Lazy-Import: Wenn die Datei (noch) fehlt, wird eine Platzhalter-Seite angezeigt.
function safeLazy(importer, title = "Seite") {
  return lazy(() =>
    importer().catch(() => ({
      default: () => (
        <main className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-[var(--color-ink-muted)] mt-2">
            Diese Seite ist noch nicht implementiert. (Platzhalter über safeLazy)
          </p>
        </main>
      ),
    }))
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

/* ── Layouts ───────────────────────────────────────────────── */
function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)] text-[var(--color-ink)]">
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

function Protected() {
  const { user } = useAuth() || {};
  const isAuthenticated = !!user;
  const location = useLocation();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />;
}

/* ── Pages (lazy) ──────────────────────────────────────────── */
// Core
const Landing            = safeLazy(() => import("./pages/Landing.jsx"), "AIX Aleph – Start");
const Demo               = safeLazy(() => import("./pages/Demo.jsx"), "Demo");
const Login              = safeLazy(() => import("./pages/Login.jsx"), "Login");
const Register           = safeLazy(() => import("./pages/Register.jsx"), "Register");
const Dashboard          = safeLazy(() => import("./pages/Dashboard.jsx"), "Dashboard");
const Preise             = safeLazy(() => import("./pages/Preise.jsx"), "Preise");
const Manifest           = safeLazy(() => import("./pages/Manifest.jsx"), "Manifest");

// Legal
const Cookies            = safeLazy(() => import("./pages/legal/Cookies.jsx"), "Cookie-Einstellungen");
const AGB                = safeLazy(() => import("./pages/legal/AGB.jsx"), "AGB");
const Datenschutz        = safeLazy(() => import("./pages/legal/Datenschutz.jsx"), "Datenschutz");
const Impressum          = safeLazy(() => import("./pages/legal/Impressum.jsx"), "Impressum");

// Tech
const TechOverview       = safeLazy(() => import("./pages/tech/Overview.jsx"), "Tech · Overview");
const NeuralArchitecture = safeLazy(() => import("./pages/tech/NeuralArchitecture.jsx"), "Tech · Neural Architecture");
const Realtime           = safeLazy(() => import("./pages/tech/RealtimeAnalytics.jsx"), "Tech · Realtime Analytics");

// Company
const Karriere           = safeLazy(() => import("./pages/company/Karriere.jsx"), "Karriere");
const Partner            = safeLazy(() => import("./pages/company/Partner.jsx"), "Partner");
const Blog               = safeLazy(() => import("./pages/company/Blog.jsx"), "Blog");
const InvestorRelations  = safeLazy(() => import("./pages/company/InvestorRelations.jsx"), "Investor Relations");
const PartnerLogin       = safeLazy(() => import("./pages/company/PartnerLogin.jsx"), "Partner Login");
const Kontakt            = safeLazy(() => import("./pages/company/Kontakt.jsx"), "Kontakt");

// Fallback
const NotFound           = () => (
  <main className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
    <h1 className="text-2xl font-bold">Seite nicht gefunden</h1>
    <p className="text-[var(--color-ink-muted)] mt-2">Bitte prüfe die URL oder gehe zurück zur Startseite.</p>
  </main>
);

/* ── Router ───────────────────────────────────────────────── */
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            {/* Public */}
            <Route index element={<Landing />} />
            <Route path="demo" element={<Demo />} />
            <Route path="preise" element={<Preise />} />
            <Route path="manifesto" element={<Manifest />} />

            {/* Auth (nur Gäste) */}
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />

            {/* Legal */}
            <Route path="cookies" element={<Cookies />} />
            <Route path="agb" element={<AGB />} />
            <Route path="datenschutz" element={<Datenschutz />} />
            <Route path="impressum" element={<Impressum />} />

            {/* Tech */}
            <Route path="tech">
              <Route path="overview" element={<TechOverview />} />
              <Route path="neural-architecture" element={<NeuralArchitecture />} />
              <Route path="realtime" element={<Realtime />} />
            </Route>

            {/* Company */}
            <Route path="karriere" element={<Karriere />} />
            <Route path="partner" element={<Partner />} />
            <Route path="blog" element={<Blog />} />
            <Route path="investor-relations" element={<InvestorRelations />} />
            <Route path="partner-login" element={<PartnerLogin />} />
            <Route path="kontakt" element={<Kontakt />} />

            {/* Protected */}
            <Route element={<Protected />}>
              <Route path="dashboard" element={<Dashboard />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
