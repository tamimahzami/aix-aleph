// src/pages/company/Creators.jsx
import React from "react";

export default function Creators() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-6">
      <header>
        <h1 className="text-3xl font-extrabold">Creators</h1>
        <p className="mt-2 text-muted text-sm">
          Programme, Tools und Ressourcen für Creator:innen, Designer:innen und Partner.
        </p>
      </header>

      <section className="card p-6 space-y-3 text-sm">
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Creator Program:</strong> Exklusive Partnerschaften & Zugang zu Early Features (bald).</li>
          <li><strong>Toolkits:</strong> Design-Systeme, Komponenten & Templates für eigene Projekte (in Arbeit).</li>
          <li><strong>Co-Creation:</strong> Gemeinsame Projekte mit AIX Aleph Teams (Pilotphase).</li>
        </ul>
      </section>

      <footer className="text-xs text-muted">
        Letzte Aktualisierung: {new Date().getFullYear()}
      </footer>
    </div>
  );
}
