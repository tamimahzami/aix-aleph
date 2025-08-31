// src/router/AppRouter.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

// Diese Seiten müssen existieren (oder temporär Dummy-Komponenten sein)
import Home from "../pages/Home";
import About from "../pages/About";
import Status from "../pages/Status";
import Login from "../pages/Login";
import Register from "../pages/Register";

// Wenn einige Seiten noch nicht existieren, ersetze die Importe
// durch einfache Platzhalter, z.B.:
// const Home = () => <div>Home</div>;

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/status" element={<Status/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      {/* Weitere Routen später ergänzen */}
    </Routes>
  );
}
