import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";   // nur eine Seite

export default function App() {
  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#e5e7eb" }}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<HomePage />} /> 
          {/* egal welche URL, immer HomePage */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}
