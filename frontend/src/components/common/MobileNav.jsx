// src/components/common/MobileNav.jsx
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function MobileNav() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  // Body-Scroll sperren, wenn Drawer offen
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : prev || "";
    return () => { document.body.style.overflow = prev || ""; };
  }, [open]);

  const navItems = [
    { to: "/about", label: "Über uns" },
    { to: "/features", label: "Funktionen" },
    { to: "/pricing", label: "Preise" },
    { to: "/contact", label: "Kontakt" },
  ];

  return (
    <>
      {/* Burger-Button (nur Mobile) */}
      <button
        className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg ring-line focusable"
        aria-label="Menü öffnen"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <span className="sr-only">Menü</span>
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>

      {/* Overlay */}
      {open && (
        <button
          className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden"
          aria-label="Menü schließen"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 h-full w-[80%] max-w-[340px] md:hidden
                    bg-[var(--color-surface)] border-l border-[var(--color-line)]
                    shadow-dc transform transition-transform duration-200
                    ${open ? "translate-x-0" : "translate-x-full"}`}
        role="dialog"
        aria-modal="true"
        aria-label="Hauptmenü"
      >
        {/* Kopfzeile im Drawer */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-[var(--color-line)]">
          <Link
            to="/"
            className="flex items-center gap-2 font-extrabold text-[var(--color-primary)]"
            onClick={() => setOpen(false)}
          >
            <span className="w-6 h-6 rounded-full bg-[var(--color-primary)]" />
            AIX Aleph
          </Link>
          <button
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg ring-line focusable"
            aria-label="Menü schließen"
            onClick={() => setOpen(false)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Links */}
        <nav className="px-4 py-4 flex flex-col gap-1">
          {navItems.map((it) => {
            const active = pathname.startsWith(it.to);
            return (
              <Link
                key={it.to}
                to={it.to}
                onClick={() => setOpen(false)}
                className={`w-full text-base font-semibold px-3 py-3 rounded-lg
                            hover:text-[var(--color-primary)]
                            ${active ? "text-[var(--color-primary)] bg-white/5" : "text-[var(--color-ink)]"}`}
              >
                {it.label}
              </Link>
            );
          })}
        </nav>

        {/* Auth-Aktionen */}
        <div className="px-4 pt-2 pb-6 mt-auto flex gap-3">
          <Link
            to="/login"
            className="btn btn-ghost w-full"
            onClick={() => setOpen(false)}
          >
            Login
          </Link>
          <Link
            to="/register"
            className="btn btn-primary w-full"
            onClick={() => setOpen(false)}
          >
            Registrieren
          </Link>
        </div>
      </aside>
    </>
  );
}
