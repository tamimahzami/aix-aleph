// src/pages/legal/Cookies.jsx
import React from "react";
import ContainerMax from "../../components/common/ContainerMax.jsx";

export default function Cookies() {
  return (
    <section className="page-section">
      <ContainerMax>
        <div className="card max-w-3xl mx-auto">
          <h1 className="text-3xl font-extrabold">Cookie-Richtlinie</h1>
          <p className="muted mt-2">Platzhalter – bitte mit echten Informationen zur Cookie-Nutzung füllen.</p>

          <h2 className="text-xl font-bold mt-6">Arten von Cookies</h2>
          <ul className="mt-1 list-disc ml-6">
            <li>Notwendige Cookies</li>
            <li>Analyse/Statistik</li>
            <li>Komfort & Einstellungen</li>
          </ul>

          <h2 className="text-xl font-bold mt-6">Steuerung</h2>
          <p className="mt-1">
            Sie können Cookies im Browser deaktivieren; ggf. sind Funktionen eingeschränkt.
          </p>
        </div>
      </ContainerMax>
    </section>
  );
}
