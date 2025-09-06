// src/App.jsx
import React, { Suspense, lazy } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";

import Header from "./components/common/Header.jsx";
import Footer from "./components/common/Footer.jsx";
import { useAuth } from "./auth/AuthContext.jsx";

const Landing = lazy(() => import("./pages/Landing.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));
const StaticPage = lazy(() => import("./pages/StaticPage.jsx"));

function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)] text-[var(--color-ink)]">
      <Header />
      <main className="flex-1 p-6">
        <Suspense fallback={<div>Lade Inhalte...</div>}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

function ProtectedLayout() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Outlet />;
}

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        {/* Public */}
        <Route index element={<Landing />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="info/:slug" element={<StaticPage />} />

        {/* Protected */}
        <Route element={<ProtectedLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
