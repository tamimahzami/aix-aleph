// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";
import Demo from "./pages/Demo.jsx";           // <— existiert: src/pages/Demo.jsx
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Experiments from "./pages/Experiments.jsx";
import NotFound from "./pages/NotFound.jsx";
const Manifesto = React.lazy(() => import("./pages/Manifesto.jsx"));

import { AuthProvider, ProtectedRoute } from "./lib/auth.jsx"; // <— genau so benennen

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AuthProvider>
        <div className="min-h-screen grid md:grid-cols-[240px_1fr]">
          <aside className="border-r hidden md:block">
            <Sidebar />
          </aside>

          <main className="p-4 md:p-8 space-y-6">
            <Header />

            <Routes>
              {/* öffentlich */}
              <Route path="/" element={<Home />} />
              <Route path="/demo" element={<Demo />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="manifesto" element={<Manifesto />} />

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

              {/* fallback */}
              <Route path="*" element={<NotFound />} />
            </Routes>

            <Footer />
          </main>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}
