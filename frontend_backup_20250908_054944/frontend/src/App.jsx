// frontend/src/App.jsx
import React, { Suspense } from "react";
import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";

import Header from "./components/common/Header.jsx";
import Footer from "./components/common/Footer.jsx";

import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import NotFound from "./pages/NotFound.jsx";

import ProtectedRoute from "./auth/ProtectedRoute.jsx";
import GuestRoute from "./auth/GuestRoute.jsx";

function Loader() {
  return <div className="py-12 text-center text-muted">Lade Inhalte…</div>;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
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

export default function App() {
  return (
    <Routes>
      {/* Gemeinsames Layout */}
      <Route element={<AppLayout />}>
        {/* Öffentlich */}
        <Route index element={<Landing />} />
        <Route path="/home" element={<Navigate to="/" replace />} />

        {/* Nur Gäste */}
        <Route element={<GuestRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Geschützt */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
