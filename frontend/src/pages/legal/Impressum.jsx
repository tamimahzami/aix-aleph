// src/pages/legal/Impressum.jsx
import React from "react";
import ContainerMax from "../../components/common/ContainerMax.jsx";

export default function Impressum() {
  return (
    <section className="page-section">
      <ContainerMax>
        <div className="card max-w-3xl mx-auto">
          <h1 className="text-3xl font-extrabold">Impressum</h1>
          <p className="muted mt-2">
            Angaben gemäß § 5 TMG. (Platzhalter – bitte mit echten Daten ersetzen)
          </p>

          <div className="mt-4">
            <p><strong>Firma:</strong> AIX Aleph GmbH</p>
            <p><strong>Anschrift:</strong> Musterstraße 1, 12345 Musterstadt</p>
            <p><strong>E-Mail:</strong> kontakt@aixaleph.com</p>
          </div>

          <div className="mt-4">
            <h2 className="text-xl font-bold">Vertreten durch</h2>
            <p className="mt-1">Vorname Nachname</p>
          </div>

          <div className="mt-4">
            <h2 className="text-xl font-bold">Umsatzsteuer-ID</h2>
            <p className="mt-1">DE000000000 (Platzhalter)</p>
          </div>
        </div>
      </ContainerMax>
    </section>
  );
}
