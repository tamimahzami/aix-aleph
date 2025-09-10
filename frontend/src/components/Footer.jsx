import React from "react";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-ui bg-bg-secondary/60">
      <div className="container mx-auto max-w-6xl p-6">
        {/* Top row */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold">ALIX ALEPH</h3>
            <p className="mt-2 text-sm opacity-80">
              Tools & Interfaces für menschenzentrierte AI-Workflows.
            </p>
          </div>

          <nav aria-label="Rechtliches" className="space-y-2">
            <h4 className="font-medium opacity-80">Legal</h4>
            <ul className="text-sm space-y-1">
              <li><a className="hover:underline" href="#">Impressum</a></li>
              <li><a className="hover:underline" href="#">Datenschutz</a></li>
              <li><a className="hover:underline" href="#">AGB</a></li>
            </ul>
          </nav>

          <nav aria-label="Kontakt" className="space-y-2">
            <h4 className="font-medium opacity-80">Kontakt</h4>
            <ul className="text-sm space-y-1">
              <li><a className="hover:underline" href="mailto:hello@alix-aleph.dev">hello@alix-aleph.dev</a></li>
              <li><a className="hover:underline" href="#">LinkedIn</a></li>
              <li><a className="hover:underline" href="#">X / Twitter</a></li>
            </ul>
          </nav>
        </div>

        {/* Bottom row */}
        <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs opacity-70">© {new Date().getFullYear()} ALIX ALEPH. Alle Rechte vorbehalten.</p>
          <div className="text-xs opacity-70">v0.1 • Built with React & Tailwind</div>
        </div>
      </div>
    </footer>
  );
}
