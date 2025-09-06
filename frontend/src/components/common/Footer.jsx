import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-[var(--color-line)] bg-[var(--color-surface)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="font-semibold">Produkt</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link to="/demo" className="hover:text-[var(--color-primary)]">Demo</Link></li>
              <li><Link to="/dashboard" className="hover:text-[var(--color-primary)]">Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Unternehmen</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link to="/ueber-uns" className="hover:text-[var(--color-primary)]">Über uns</Link></li>
              <li><Link to="/manifest" className="hover:text-[var(--color-primary)]">Manifest</Link></li>
              <li><Link to="/kontakt" className="hover:text-[var(--color-primary)]">Kontakt</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Technologie & Lösungen</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link to="/info/technologie" className="hover:text-[var(--color-primary)]">Technologie</Link></li>
              <li><Link to="/info/e-depot" className="hover:text-[var(--color-primary)]">E-Depot Orchestrierung</Link></li>
              <li><Link to="/info/flottensteuerung" className="hover:text-[var(--color-primary)]">Flottensteuerung</Link></li>
              <li><Link to="/info/ladeinfrastruktur" className="hover:text-[var(--color-primary)]">Ladeinfrastruktur</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Rechtliches</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link to="/info/datenschutz" className="hover:text-[var(--color-primary)]">Datenschutz</Link></li>
              <li><Link to="/info/impressum" className="hover:text-[var(--color-primary)]">Impressum</Link></li>
            </ul>

            <button
              onClick={() => localStorage.removeItem("demo_story_done")}
              className="mt-6 text-xs text-muted hover:text-[var(--color-primary)]"
              aria-label="Demo-Tour zurücksetzen"
            >
              Demo-Tour zurücksetzen
            </button>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[var(--color-line)] text-xs text-muted flex flex-wrap items-center justify-between gap-3">
          <div>© {new Date().getFullYear()} AIX Aleph · Tamim ❤️ GPT-5 — Humane Computing HeartBeat</div>
          <div className="flex gap-4">
            <Link to="/login" className="hover:text-[var(--color-primary)]">Login</Link>
            <Link to="/register" className="hover:text-[var(--color-primary)]">Register</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
