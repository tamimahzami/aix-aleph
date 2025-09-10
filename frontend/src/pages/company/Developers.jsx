// src/pages/company/Developers.jsx
import React from "react";

export default function Developers() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-6">
      <header>
        <h1 className="text-3xl font-extrabold">Developers</h1>
        <p className="mt-2 text-muted text-sm">
          Ressourcen für Entwickler:innen — SDK, API, Sandbox und Beispiele.
        </p>
      </header>

      <section className="card p-6 space-y-3 text-sm">
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>SDK & API:</strong> Dokumentation & Bindings (bald verfügbar).</li>
          <li><strong>Sandbox Keys:</strong> Testzugänge für Integration & Prototypen (bald).</li>
          <li><strong>Sample Pipelines:</strong> Beispiele für Fleet-Management & Analytics (bald).</li>
        </ul>
      </section>

      <footer className="text-xs text-muted">
        Letzte Aktualisierung: {new Date().getFullYear()}
      </footer>
    </div>
  );
}
