// frontend/src/pages/Status.jsx
import React from "react";

export default function Status() {
  return (
    <main className="aix-status max-w-3xl mx-auto py-16 px-6 text-gray-100">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-3">Systemstatus</h1>
        <p className="text-gray-400">
          Live-Status der AIX Aleph Plattform und Dienste.
        </p>
      </header>

      {/* Placeholder-Karten */}
      <section className="grid gap-6">
        <div className="p-5 rounded-2xl bg-white/5 text-left">
          <h2 className="text-xl font-semibold mb-2">API Backend</h2>
          <p className="text-green-400">✅ Online</p>
          <p className="text-sm opacity-70">Letzte Prüfung: gerade eben</p>
        </div>

        <div className="p-5 rounded-2xl bg-white/5 text-left">
          <h2 className="text-xl font-semibold mb-2">Datenbank</h2>
          <p className="text-green-400">✅ Verbunden</p>
          <p className="text-sm opacity-70">Keine Störungen gemeldet</p>
        </div>

        <div className="p-5 rounded-2xl bg-white/5 text-left">
          <h2 className="text-xl font-semibold mb-2">Frontend</h2>
          <p className="text-green-400">✅ Erreichbar</p>
          <p className="text-sm opacity-70">Version 1.0</p>
        </div>
      </section>

      {/* Hinweis */}
      <p className="mt-12 text-sm text-gray-500 text-center">
        Hinweis: Statusdaten sind aktuell ein Platzhalter. Integration mit
        Backend-Healthchecks folgt.
      </p>
    </main>
  );
}
