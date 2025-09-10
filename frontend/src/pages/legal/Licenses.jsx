// src/pages/legal/Licenses.jsx
import React from "react";

export default function Licenses() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-6">
      <header>
        <h1 className="text-3xl font-extrabold">Open-Source Lizenzen</h1>
        <p className="mt-2 text-muted text-sm">
          Transparenz & Anerkennung: Diese Software nutzt Drittanbieter-Bibliotheken
          unter folgenden Lizenzen.
        </p>
      </header>

      <section className="card p-6 space-y-4">
        <p className="text-sm">
          Im Build-Prozess wird diese Liste automatisch aus den verwendeten
          Abhängigkeiten generiert. (Placeholder)
        </p>
        <pre className="bg-black/30 border border-white/10 rounded-xl p-4 text-xs overflow-auto">
{`MIT
Apache-2.0
BSD-3-Clause
ISC
…`}
        </pre>
      </section>

      <footer className="text-xs text-muted">
        Letzte Aktualisierung: {new Date().getFullYear()}
      </footer>
    </div>
  );
}
