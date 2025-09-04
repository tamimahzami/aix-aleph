// src/components/common/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

/**
 * Discord-inspirierter Footer:
 * - 4 Spalten + Social (responsive)
 * - Nutzt deine Design Tokens (var(--color-*), btn, chip, etc.)
 * - Interne Links: <Link>
 * - Externe: <a rel="noreferrer noopener" target="_blank">
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-[var(--color-line)] bg-[var(--color-surface)] text-[var(--color-ink-muted)]">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 py-12">
        {/* Top: Logo + Kurzclaim */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-10 border-b border-[var(--color-line)]">
          <Link to="/" className="inline-flex items-center gap-3 focusable">
            <div
              aria-hidden
              className="size-10 rounded-xl"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-primary), var(--color-primary-strong))",
              }}
            />
            <div>
              <div className="text-white font-extrabold tracking-tight text-lg">
                AIX Aleph
              </div>
              <div className="text-sm text-[var(--color-ink-muted)]">
                Next-Gen e-Mobility · AI Agents
              </div>
            </div>
          </Link>

          <div className="flex flex-wrap items-center gap-2">
            <span className="chip">⚡ Smart Charging</span>
            <span className="chip">🌍 Global Map</span>
            <span className="chip">🧠 Agents</span>
          </div>
        </div>

        {/* Link-Gitter */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 py-10">
          {/* Produkt */}
          <nav aria-label="Produkt">
            <h4 className="text-white font-semibold tracking-tight">Produkt</h4>
            <ul className="mt-4 space-y-2">
              <li><Link className="hover:text-white focusable" to="/product">Überblick</Link></li>
              <li><Link className="hover:text-white focusable" to="/features">Funktionen</Link></li>
              <li><Link className="hover:text-white focusable" to="/pricing">Preise</Link></li>
              <li><Link className="hover:text-white focusable" to="/docs">Docs</Link></li>
              <li><Link className="hover:text-white focusable" to="/status">Status</Link></li>
              <li><Link className="hover:text-white focusable" to="/download">Download</Link></li>
            </ul>
          </nav>

          {/* Unternehmen */}
          <nav aria-label="Unternehmen">
            <h4 className="text-white font-semibold tracking-tight">Unternehmen</h4>
            <ul className="mt-4 space-y-2">
              <li><Link className="hover:text-white focusable" to="/about">Über uns</Link></li>
              <li><Link className="hover:text-white focusable" to="/jobs">Jobs</Link></li>
              <li><Link className="hover:text-white focusable" to="/brand">Brand</Link></li>
              <li><Link className="hover:text-white focusable" to="/newsroom">Newsroom</Link></li>
              <li><Link className="hover:text-white focusable" to="/college">College</Link></li>
              <li><Link className="hover:text-white focusable" to="/contact">Kontakt</Link></li>
            </ul>
          </nav>

          {/* Ressourcen */}
          <nav aria-label="Ressourcen">
            <h4 className="text-white font-semibold tracking-tight">Ressourcen</h4>
            <ul className="mt-4 space-y-2">
              <li><Link className="hover:text-white focusable" to="/support">Support</Link></li>
              <li><Link className="hover:text-white focusable" to="/safety">Safety</Link></li>
              <li><Link className="hover:text-white focusable" to="/blog">Blog</Link></li>
              <li><Link className="hover:text-white focusable" to="/creators">Creators</Link></li>
              <li><Link className="hover:text-white focusable" to="/community">Community</Link></li>
              <li><Link className="hover:text-white focusable" to="/developers">Developers</Link></li>
              <li><Link className="hover:text-white focusable" to="/quests">Quests</Link></li>
              <li><Link className="hover:text-white focusable" to="/merch">3rd Party Merch</Link></li>
              <li><Link className="hover:text-white focusable" to="/feedback">Feedback</Link></li>
            </ul>
          </nav>

          {/* Rechtliches */}
          <nav aria-label="Rechtliches">
            <h4 className="text-white font-semibold tracking-tight">Rechtliches</h4>
            <ul className="mt-4 space-y-2">
              <li><Link className="hover:text-white focusable" to="/terms">AGB</Link></li>
              <li><Link className="hover:text-white focusable" to="/privacy">Datenschutz</Link></li>
              <li><Link className="hover:text-white focusable" to="/cookies">Cookie-Einstellungen</Link></li>
              <li><Link className="hover:text-white focusable" to="/guidelines">Guidelines</Link></li>
              <li><Link className="hover:text-white focusable" to="/acknowledgements">Acknowledgements</Link></li>
              <li><Link className="hover:text-white focusable" to="/licenses">Lizenzen</Link></li>
              <li><Link className="hover:text-white focusable" to="/imprint">Impressum</Link></li>
            </ul>
          </nav>

          {/* Social */}
          <nav aria-label="Social">
            <h4 className="text-white font-semibold tracking-tight">Social</h4>
            <ul className="mt-4 space-y-2">
              <li><a className="hover:text-white focusable" href="https://twitter.com" target="_blank" rel="noreferrer noopener">Twitter/X</a></li>
              <li><a className="hover:text-white focusable" href="https://instagram.com" target="_blank" rel="noreferrer noopener">Instagram</a></li>
              <li><a className="hover:text-white focusable" href="https://facebook.com" target="_blank" rel="noreferrer noopener">Facebook</a></li>
              <li><a className="hover:text-white focusable" href="https://youtube.com" target="_blank" rel="noreferrer noopener">YouTube</a></li>
              <li><a className="hover:text-white focusable" href="https://tiktok.com" target="_blank" rel="noreferrer noopener">TikTok</a></li>
            </ul>

            <div className="mt-6 flex flex-wrap gap-2">
              <Link to="/download" className="btn btn-primary">Download</Link>
              <Link to="/nitro" className="btn btn-ghost">Nitro</Link>
            </div>
          </nav>
        </div>

        {/* Bottom Line */}
        <div className="pt-8 border-t border-[var(--color-line)] text-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div>© {year} AIX Aleph · All rights reserved</div>
          <div className="flex flex-wrap gap-4">
            <Link to="/privacy" className="hover:text-white focusable">Datenschutz</Link>
            <Link to="/terms" className="hover:text-white focusable">AGB</Link>
            <Link to="/imprint" className="hover:text-white focusable">Impressum</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
