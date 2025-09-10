// src/components/Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";

export default function Layout() {
  return (
    <div className="min-h-dvh flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="mt-12">
        <div className="footer-divider" />
        <div className="container-app py-8 text-sm text-slate-500">
          © {new Date().getFullYear()} AIX Aleph — Mobility & Impact
        </div>
      </footer>
    </div>
  );
}
