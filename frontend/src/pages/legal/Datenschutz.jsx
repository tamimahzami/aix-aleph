// src/pages/legal/Datenschutz.jsx
import React from "react";
import ContainerMax from "../../components/common/ContainerMax.jsx";

export default function Datenschutz() {
  return (
    <section className="page-section">
      <ContainerMax>
        <div className="card max-w-3xl mx-auto">
          <h1 className="text-3xl font-extrabold">Datenschutzerklärung</h1>
          <p className="muted mt-2">Platzhaltertext – bitte durch die echte Datenschutzerklärung ersetzen.</p>

          <h2 className="text-xl font-bold mt-6">1. Verantwortlicher</h2>
          <p className="mt-1">AIX Aleph GmbH, Musterstraße 1, 12345 Musterstadt</p>

          <h2 className="text-xl font-bold mt-6">2. Erhobene Daten</h2>
          <p className="mt-1">Protokolldaten, Kontaktdaten, Nutzungsdaten, Cookies (wo notwendig).</p>

          <h2 className="text-xl font-bold mt-6">3. Zwecke</h2>
          <p className="mt-1">Betrieb, Sicherheit, Verbesserung des Dienstes, Kommunikation.</p>

          <h2 className="text-xl font-bold mt-6">4. Rechtsgrundlagen</h2>
          <p className="mt-1">Art. 6 Abs. 1 lit. b, f DSGVO (Vertrag/Interesse), ggf. Einwilligung.</p>

          <h2 className="text-xl font-bold mt-6">5. Betroffenenrechte</h2>
          <ul className="mt-1 list-disc ml-6">
            <li>Auskunft, Berichtigung, Löschung, Einschränkung, Widerspruch</li>
            <li>Datenübertragbarkeit</li>
            <li>Beschwerderecht bei einer Aufsichtsbehörde</li>
          </ul>
        </div>
      </ContainerMax>
    </section>
  );
}
