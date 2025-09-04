import React from "react";

export default function Privacy() {
  return (
    <main className="max-w-[900px] mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-4xl font-extrabold">Datenschutz</h1>
      <p className="mt-4 text-muted">Kurzfassung: Wir verarbeiten Daten zweckgebunden, minimal und sicher.</p>
      <div className="panel p-6 mt-6 prose prose-invert max-w-none">
        <h2>1. Verantwortliche</h2>
        <p>AIX Aleph – Kontakt siehe Impressum.</p>
        <h2>2. Zwecke</h2>
        <p>Betrieb der Plattform, Sicherheit, Support, Abrechnung.</p>
        <h2>3. Rechte</h2>
        <p>Auskunft, Berichtigung, Löschung, Widerspruch. Schreibe uns jederzeit.</p>
      </div>
    </main>
  );
}
