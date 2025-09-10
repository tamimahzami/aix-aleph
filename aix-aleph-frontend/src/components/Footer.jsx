// src/components/Footer.jsx
import React from "react";

export default function Footer({ Container = ({ children }) => <div className="mx-auto max-w-7xl">{children}</div> }) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t bg-slate-50/60 dark:bg-slate-900/40">
      <Container>
        <div className="px-4 py-10 grid gap-8 md:grid-cols-4">
          <div className="space-y-2">
            <div className="font-semibold">AIX Aleph</div>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Orchestrierung autonomer Intelligenz — weltweit.
            </p>
          </div>

          <div>
            <div className="font-semibold mb-2">Produkte</div>
            <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-300">
              <li><a href="/products" className="hover:underline">Übersicht</a></li>
              <li><a href="/solutions" className="hover:underline">Lösungen</a></li>
              <li><a href="/docs" className="hover:underline">Dokumentation</a></li>
            </ul>
          </div>

          <div>
            <div className="font-semibold mb-2">Ressourcen</div>
            <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-300">
              <li><a href="/demo" className="hover:underline">Demo</a></li>
              <li><a href="/support" className="hover:underline">Support</a></li>
              <li><a href="/status" className="hover:underline">Status</a></li>
            </ul>
          </div>

          <div>
            <div className="font-semibold mb-2">Rechtliches</div>
            <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-300">
              <li><a href="/impressum" className="hover:underline">Impressum</a></li>
              <li><a href="/privacy" className="hover:underline">Datenschutz</a></li>
              <li><a href="/terms" className="hover:underline">AGB</a></li>
            </ul>
          </div>
        </div>
      </Container>

      <div className="border-t">
        <Container>
          <div className="px-4 py-4 text-xs sm:text-sm flex flex-col sm:flex-row items-center justify-between text-slate-500">
            <div>© {year} AIX Aleph</div>
            <div className="flex gap-4 mt-2 sm:mt-0">
              <a href="/privacy" className="hover:underline">Datenschutz</a>
              <a href="/terms" className="hover:underline">AGB</a>
              <a href="/impressum" className="hover:underline">Impressum</a>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
