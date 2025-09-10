// src/pages/Impressum.jsx
import React, { useEffect } from "react";

export default function Impressum() {
  useEffect(() => { document.title = "Impressum • AIX Aleph"; }, []);

  return (
    <main className="aix-impressum max-w-3xl mx-auto p-6 text-gray-100" aria-labelledby="page-title">
      <h1 id="page-title" className="text-3xl font-bold mb-6">Impressum</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Rechtliches &amp; Unternehmen</h2>
        <p className="muted"><strong>AIX Aleph UK Limited</strong></p>
        <p className="muted">Rechtliche Angaben, Registerdaten und Ansprechpartner – klar, nachvollziehbar.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Registerangaben</h2>
        <ul className="list-disc ml-6 space-y-1 muted">
          <li><strong>Firma:</strong> AIX Aleph UK Limited (Rebranding zu AIX Aleph PLC)</li>
          <li><strong>Adresse:</strong> 85 Great Portland Street, London W1W 7LT, UK</li>
          <li><strong>Registernummer:</strong> 16453023</li>
          <li><strong>Status:</strong> Aktiv</li>
          <li><strong>Typ:</strong> Company limited by shares</li>
          <li><strong>Eingetragen:</strong> 15. Mai 2025</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Fristen &amp; Kategorien</h2>
        <ul className="list-disc ml-6 space-y-1 muted">
          <li>Konten bis 31.05.2026, fällig bis 15.02.2027</li>
          <li>Confirmation Statement bis 14.05.2026, fällig bis 28.05.2026</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">SIC Codes</h2>
        <ul className="list-disc ml-6 space-y-1 muted">
          <li>42220 – Bau von Versorgungsprojekten</li>
          <li>43999 – Sonstige spezialisierte Bautätigkeiten</li>
          <li>46900 – Großhandel ohne Spezialisierung</li>
          <li>77400 – Leasing von geistigem Eigentum</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Offiziere &amp; Vertretung</h2>
        <ul className="list-disc ml-6 space-y-1 muted">
          <li>PARGETER, Stephen Thomas – Sekretär</li>
          <li>AHZAMI, Daniela – Direktorin</li>
          <li>AHZAMI, Tamim – Direktor</li>
          <li>POPPEL, Cornel – Direktor</li>
          <li>PÖPPEL, Diana – Direktorin</li>
        </ul>
        <p className="text-sm muted mt-2">Hinweis: Companies House prüft die Richtigkeit nicht.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Kontakt</h2>
        <p className="muted">
          E-Mail: <a href="mailto:sales@aix-aleph.com" className="text-cyan-400 hover:underline">sales@aix-aleph.com</a>
        </p>
        <p className="muted">Telefon: +49 160 702 9153</p>
        <p className="text-sm muted mt-2">Alle Inhalte sorgfältig erstellt, dennoch ohne Gewähr.</p>
      </section>
    </main>
  );
}
