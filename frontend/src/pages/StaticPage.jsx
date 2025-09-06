// src/pages/StaticPage.jsx
import React from "react";
import { useParams } from "react-router-dom";

const CONTENT = {
  datenschutz: {
    title: "Datenschutz",
    body: (
      <>
        <p>
          Wir verarbeiten personenbezogene Daten ausschließlich im Rahmen der
          geltenden Gesetze. Sie behalten jederzeit die Kontrolle über Ihre Daten.
        </p>
        <ul className="list-disc pl-5 space-y-1 mt-3">
          <li>Rechtsgrundlagen & Zweckbindung</li>
          <li>Minimierung & Speicherfristen</li>
          <li>Betroffenenrechte (Auskunft, Löschung, Widerspruch)</li>
        </ul>
      </>
    ),
  },
  impressum: {
    title: "Impressum",
    body: (
      <>
        <p><strong>Diensteanbieter:</strong> AIX Aleph UG (haftungsbeschränkt)</p>
        <p><strong>Adresse:</strong> Musterstraße 1, 12345 Musterstadt, Deutschland</p>
        <p><strong>Kontakt:</strong> info@aix-aleph.com</p>
      </>
    ),
  },
  technologie: {
    title: "Technologie",
    body: (
      <>
        <p>
          Unsere Plattform kombiniert KI-Agenten, semantische Modelle und
          orchestrierte Ausführung. Entscheidungen sind erklärbar und auditierbar.
        </p>
        <ul className="list-disc pl-5 space-y-1 mt-3">
          <li>Transparenz & Erklärbarkeit</li>
          <li>Reparierbare, modulare Architektur</li>
          <li>Policy-geführte Orchestrierung</li>
        </ul>
      </>
    ),
  },
  "e-depot": {
    title: "E-Depot Orchestrierung",
    body: (
      <p>
        Ladefenster, Energiepreise und Depotkapazitäten werden in Echtzeit
        ausbalanciert – kostenoptimiert und SLA-sicher.
      </p>
    ),
  },
  flottensteuerung: {
    title: "Flottensteuerung",
    body: (
      <p>
        Gesundheit, Routen, Uptime und Kosten global im Griff. Anomalie-Erkennung und
        prädiktive Wartung inklusive.
      </p>
    ),
  },
  ladeinfrastruktur: {
    title: "Ladeinfrastruktur",
    body: (
      <p>
        Tarife, Auslastung und Wartung vorausschauend steuern. Policy-Priorisierung
        sorgt für Effizienz und Stabilität.
      </p>
    ),
  },
};

export default function StaticPage() {
  const { slug } = useParams();
  const page = CONTENT[slug];

  if (!page) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="text-2xl font-bold">Seite nicht gefunden</h1>
        <p className="mt-2 text-muted">
          Für „{slug}“ ist noch kein Inhalt hinterlegt.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-4">
      <h1 className="text-3xl font-extrabold">{page.title}</h1>
      <div className="prose prose-invert max-w-none">{page.body}</div>
    </div>
  );
}
