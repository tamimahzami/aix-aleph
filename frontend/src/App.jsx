// src/App.jsx
import React, { Suspense, lazy } from "react";
import { Routes, Route, Outlet, Navigate, useLocation } from "react-router-dom";
import Header from "./components/common/Header.jsx";
import Footer from "./components/common/Footer.jsx";
import ScrollToTop from "./components/common/ScrollToTop.jsx";
import { useAuth } from "./auth/AuthContext.jsx";

const Landing   = lazy(() => import("./pages/Landing.jsx"));
const Login     = lazy(() => import("./pages/Login.jsx"));
const Register  = lazy(() => import("./pages/Register.jsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));
const NotFound  = lazy(() => import("./pages/NotFound.jsx"));

const Preise    = lazy(() => import("./pages/Preise.jsx"));
const Demo      = lazy(() => import("./pages/Demo.jsx"));           // read-only Demo
const StaticPage= lazy(() => import("./pages/StaticPage.jsx"));     // /info/:slug

const About     = lazy(() => import("./pages/About.jsx"));
const Manifest  = lazy(() => import("./pages/Manifest.jsx"));
const Kontakt   = lazy(() => import("./pages/Kontakt.jsx"));

function Loader() {
  return <div className="p-8 text-center text-muted" role="status" aria-live="polite">Lade Inhalte…</div>;
}

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

function ProtectedLayout() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />;
}

function GuestLayout() {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? <Outlet /> : <Navigate to="/dashboard" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        {/* Öffentlich */}
        <Route index element={<Landing />} />
        <Route path="demo" element={<Demo />} />
        <Route path="preise" element={<Preise />} />
        <Route path="info/:slug" element={<StaticPage />} />

        {/* Footer-Seiten */}
        <Route path="ueber-uns" element={<About />} />
        <Route path="manifest" element={<Manifest />} />
        <Route path="kontakt" element={<Kontakt />} />

        {/* Auth: nur Gäste */}
        <Route element={<GuestLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* Auth: geschützt */}
        <Route element={<ProtectedLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
