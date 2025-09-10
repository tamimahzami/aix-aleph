// src/components/common/Footer.tsx
import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      className="mt-10 border-t border-[var(--line)] bg-[var(--bg-2)]"
      role="contentinfo"
    >
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Brand / Copy */}
          <div className="text-sm text-[var(--muted)]">
            © {year} AIX Aleph • Humane Computing Heartbeat
          </div>

          {/* Nav */}
          <nav aria-label="Footernavigation">
            <ul className="flex flex-wrap items-center gap-3 text-sm">
              <li>
                <Link className="hover:underline text-[var(--ink)]" to="/preise">
                  Preise
                </Link>
              </li>
              <li>
                <Link className="hover:underline text-[var(--ink)]" to="/plan">
                  Pläne
                </Link>
              </li>
              <li>
                <Link className="hover:underline text-[var(--ink)]" to="/status">
                  Status
                </Link>
              </li>
              <li>
                <Link className="hover:underline text-[var(--ink)]" to="/acknowledgements">
                  Acknowledgements
                </Link>
              </li>
              <li className="opacity-50" aria-hidden="true">•</li>
              <li>
                <Link className="hover:underline text-[var(--ink)]" to="/legal/impressum">
                  Impressum
                </Link>
              </li>
              <li>
                <Link className="hover:underline text-[var(--ink)]" to="/legal/datenschutz">
                  Datenschutz
                </Link>
              </li>
              <li>
                <Link className="hover:underline text-[var(--ink)]" to="/legal/agb">
                  AGB
                </Link>
              </li>
              <li>
                <Link className="hover:underline text-[var(--ink)]" to="/legal/cookies">
                  Cookies
                </Link>
              </li>
              <li>
                <Link className="hover:underline text-[var(--ink)]" to="/feedback">
                  Feedback
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
