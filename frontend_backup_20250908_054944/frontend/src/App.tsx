import React from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";

function Home() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-semibold">AIX ALEPH</h1>
      <p className="mt-2 text-slate-600">
        Willkommen! Navigiere zu <code>/preise</code>, <code>/unternehmen</code> oder{" "}
        <code>/legal/datenschutz</code>.
      </p>
    </div>
  );
}

function Preise() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-xl font-semibold">Preise</h1>
      <p className="mt-2 text-slate-600">Hier kommen später Preisblöcke hin.</p>
    </div>
  );
}

function Unternehmen() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-xl font-semibold">Unternehmen</h1>
      <p className="mt-2 text-slate-600">Kurzbeschreibung deines Unternehmens.</p>
    </div>
  );
}

function Datenschutz() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-xl font-semibold">Datenschutz</h1>
      <p className="mt-2 text-slate-600">Deine Datenschutz-Informationen.</p>
    </div>
  );
}

function NotFound() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-semibold">404</h1>
      <p className="mt-2 text-slate-600">Seite nicht gefunden.</p>
      <Link to="/" className="text-blue-600 underline">Zur Startseite</Link>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <header className="border-b border-slate-200 bg-white">
        <nav className="max-w-5xl mx-auto px-4 py-3 flex gap-4 items-center">
          <Link to="/" className="font-semibold">AIX ALEPH</Link>
          <div className="flex gap-3 text-slate-700">
            <Link to="/preise" className="hover:underline">Preise</Link>
            <Link to="/unternehmen" className="hover:underline">Unternehmen</Link>
            <Link to="/legal/datenschutz" className="hover:underline">Datenschutz</Link>
          </div>
        </nav>
      </header>

      <main className="min-h-dvh bg-white text-slate-900">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/preise" element={<Preise />} />
          <Route path="/unternehmen" element={<Unternehmen />} />
          <Route path="/legal/datenschutz" element={<Datenschutz />} />
          <Route path="/legal" element={<Navigate to="/legal/datenschutz" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="border-t border-slate-200 py-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} AIX ALEPH
      </footer>
    </BrowserRouter>
  );
}
