// frontend/src/pages/Creators.jsx
import React from "react";

export default function Creators() {
  return (
    <main className="aix-creators max-w-4xl mx-auto py-16 px-6 text-gray-100">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-3">Creators</h1>
        <p className="text-gray-400">
          Ressourcen, Tools und Programme für Creator:innen bei AIX Aleph.
        </p>
      </header>

      {/* Ressourcen */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Ressourcen</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>Brand Assets & Logos</li>
          <li>Guidelines für visuelles Design</li>
          <li>Open Source Repositories</li>
        </ul>
      </section>

      {/* Programme */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Programme</h2>
        <p className="text-gray-300">
          Wir fördern Creator:innen durch Early-Access, Mentorship und Co-Creation.
        </p>
      </section>

      {/* Kontakt */}
      <section className="text-center mt-16">
        <h2 className="text-xl font-semibold mb-4">Mitmachen</h2>
        <p className="mb-6 text-gray-400">
          Werde Teil des Creator-Ökosystems von AIX Aleph.
        </p>
        <a
          href="mailto:creators@aix-aleph.com"
          className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg"
        >
          Kontakt aufnehmen
        </a>
      </section>
    </main>
  );
}
