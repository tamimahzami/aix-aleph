// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Footer from "./components/Footer.jsx";

import LandingPage from "./pages/LandingPage.jsx";
import Home from "./pages/Home.jsx";
import Demo from "./pages/Demo.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Experiments from "./pages/Experiments.jsx";
import NotFound from "./pages/NotFound.jsx";

import { AuthProvider, ProtectedRoute } from "./lib/auth.jsx";

// sorgt überall für gleiche max. Breite
function Container({ children, className = "" }) {
  return <div className={`w-full max-w-7xl mx-auto ${className}`}>{children}</div>;
}

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AuthProvider>
        <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950">
          {/* Header */}
          <Header Container={Container} />

          {/* Inhalt mit Sidebar */}
          <div className="flex-1 w-full py-4 md:py-8">
            <Container>
              <div className="grid md:grid-cols-[240px_1fr] gap-6">
                <aside className="border-r hidden md:block pr-4">
                  <Sidebar />
                </aside>

                <main className="space-y-6">
                  <Routes>
                    {/* Landing Page */}
                    <Route path="/" element={<LandingPage />} />

                    {/* öffentlich */}
                    <Route path="/home" element={<Home />} />
                    <Route path="/demo" element={<Demo />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* geschützt */}
                    <Route
                      path="/dashboard"
                      element={
                        <ProtectedRoute>
                          <Dashboard />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/experiments"
                      element={
                        <ProtectedRoute>
                          <Experiments />
                        </ProtectedRoute>
                      }
                    />

                    {/* 404 */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </div>
            </Container>
          </div>

          {/* Footer */}
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}
