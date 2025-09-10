import React from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./auth/AuthContext.jsx";
import Header from "./components/common/Header.jsx";
import Footer from "./components/common/Footer.jsx";

import Login from "./pages/Login.jsx";
import HelpPage from "./pages/HelpPage.jsx";
import Dashboard from "./pages/Dashboard.jsx"; // Achte: .jsx
import Demo from "./pages/Demo.jsx";
import Register from "./pages/Register.jsx";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </Router>
  );
}
