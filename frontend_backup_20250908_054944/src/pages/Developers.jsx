// frontend/src/pages/Developers.jsx
import React from "react";

export default function Developers() {
  return (
    <main className="aix-developers max-w-4xl mx-auto py-16 px-6 text-gray-100">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-3">Developers</h1>
        <p className="text-gray-400">
          Ressourcen für Entwickler:innen – APIs, SDKs und Sandbox-Zugänge.
        </p>
      </header>

      {/* Inhalte */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>
        <ul className="list-disc ml-6 space-y-2 text-gray-300">
          <li>SDK & API</li>
          <li>Sandbox Keys</li>
          <li>Sample Pipelines</li>
        </ul>
      </section>

      {/* Kontakt */}
      <section className="text-center mt-16">
        <h2 className="text-xl font-semibold mb-4">Mitbauen?</h2>
        <p className="mb-6 text-gray-400">
          Werde Teil der Developer-Community von AIX Aleph.  
          Teste neue APIs und bring deine Ideen ein.
        </p>
        <a
          href="mailto:dev@aix-aleph.com"
          className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg"
        >
          Zugang anfragen
        </a>
      </section>
    </main>
  );
}
