// src/components/Footer.tsx
import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-line)] py-6 text-sm text-[var(--color-ink-muted)]">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p>© {new Date().getFullYear()} AIX Aleph Mobility</p>
        <nav className="flex gap-4">
          <a href="/legal/impressum" className="hover:text-[var(--color-primary)]">
            Impressum
          </a>
          <a href="/legal/datenschutz" className="hover:text-[var(--color-primary)]">
            Datenschutz
          </a>
          <a href="/legal/agb" className="hover:text-[var(--color-primary)]">
            AGB
          </a>
          <a href="/legal/cookies" className="hover:text-[var(--color-primary)]">
            Cookies
          </a>
        </nav>
      </div>
    </footer>
  );
}
