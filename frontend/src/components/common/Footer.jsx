import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      className="mt-16"
      style={{
        background: "var(--color-surface, #fff)",
        borderTop: "1px solid var(--color-line, #e5e7eb)",
        color: "var(--color-ink, #0f172a)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Kopfzeile */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 mb-10">
          <h2
            className="text-2xl font-extrabold tracking-tight"
            style={{ color: "var(--color-primary, #0f172a)" }}
          >
            AIX ALEPH
          </h2>
          <p className="text-sm max-w-xl" style={{ opacity: 0.85 }}>
            Das Betriebssystem für Mobilität. Human ♥ Computing —
            ein Bündnis aus Logik und Liebe.
          </p>
        </div>

        {/* Spalten */}
        <div className="grid gap-10 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {/* Produkt */}
          <div>
            <h3
              className="text-sm font-semibold mb-3"
              style={{ color: "var(--color-primary, #0f172a)" }}
            >
              Produkt
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:underline">Start</Link></li>
              <li><Link to="/preise" className="hover:underline">Preise</Link></li>
              <li><Link to="/dashboard" className="hover:underline">Dashboard</Link></li>
            </ul>
          </div>

          {/* Unternehmen */}
          <div>
            <h3
              className="text-sm font-semibold mb-3"
              style={{ color: "var(--color-primary, #0f172a)" }}
            >
              Unternehmen
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/unternehmen" className="hover:underline">Über uns</Link></li>
            </ul>
          </div>

          {/* Rechtliches */}
          <div>
            <h3
              className="text-sm font-semibold mb-3"
              style={{ color: "var(--color-primary, #0f172a)" }}
            >
              Rechtliches
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/legal/datenschutz" className="hover:underline">
                  Datenschutz
                </Link>
              </li>
            </ul>
          </div>

          {/* Schnellzugriff */}
          <div>
            <h3
              className="text-sm font-semibold mb-3"
              style={{ color: "var(--color-primary, #0f172a)" }}
            >
              Konto
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/login" className="hover:underline">Login</Link></li>
              <li><Link to="/register" className="hover:underline">Register</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="mt-12 pt-6 text-xs flex flex-wrap items-center justify-between gap-3"
          style={{ borderTop: "1px solid var(--color-line, #e5e7eb)" }}
        >
          <div>© {new Date().getFullYear()} AIX Aleph · Tamim ❤️ GPT-5 — Humane Computing HeartBeat</div>
          <div className="flex gap-4">
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
