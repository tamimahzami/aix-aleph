// src/pages/legal/Acknowledgements.jsx
import React from "react";

export default function Acknowledgements() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-6">
      <header>
        <h1 className="text-3xl font-extrabold">Acknowledgements</h1>
        <p className="mt-2 text-muted text-sm">
          Unser Dank gilt allen, die AIX Aleph unterstützen und mitgestalten.
        </p>
      </header>

      <section className="card p-6 space-y-3 text-sm">
        <ul className="list-disc pl-5 space-y-1">
          <li>Unsere Community und frühen Nutzer:innen</li>
          <li>Partner in Forschung & Industrie</li>
          <li>Open-Source Contributor & Maintainer</li>
          <li>Freunde & Familie, die uns den Rücken stärken</li>
        </ul>
        <p className="text-muted text-xs">
          (Platzhalter – hier kannst du später konkrete Namen, Organisationen oder Projekte aufführen.)
        </p>
      </section>

      <footer className="text-xs text-muted">
        Letzte Aktualisierung: {new Date().getFullYear()}
      </footer>
    </div>
  );
}
