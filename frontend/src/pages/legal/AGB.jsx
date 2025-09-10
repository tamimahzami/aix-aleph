// src/pages/legal/AGB.jsx
import React from "react";
import ContainerMax from "../../components/common/ContainerMax.jsx";

export default function AGB() {
  return (
    <section className="page-section">
      <ContainerMax>
        <div className="card max-w-3xl mx-auto">
          <h1 className="text-3xl font-extrabold">Allgemeine Geschäftsbedingungen</h1>
          <p className="muted mt-2">Platzhalter – bitte durch gültige AGB ersetzen.</p>

          <h2 className="text-xl font-bold mt-6">1. Geltungsbereich</h2>
          <p className="mt-1">Diese AGB gelten für alle Verträge zwischen AIX Aleph und den Kunden.</p>

          <h2 className="text-xl font-bold mt-6">2. Leistungen</h2>
          <p className="mt-1">Bereitstellung von Software-Diensten rund um Orchestrierung & KI.</p>

          <h2 className="text-xl font-bold mt-6">3. Haftung</h2>
          <p className="mt-1">Haftung im gesetzlich zulässigen Umfang beschränkt.</p>
        </div>
      </ContainerMax>
    </section>
  );
}
