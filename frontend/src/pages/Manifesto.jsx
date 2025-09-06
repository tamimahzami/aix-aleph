// src/pages/Manifesto.jsx
import React from "react";

export default function Manifesto() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 space-y-12">
      {/* Header */}
      <header className="space-y-3 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold">
          Das AIX Aleph Manifest
        </h1>
        <p className="text-muted max-w-[70ch] mx-auto">
          AIX Aleph ist nicht nur eine Technologieplattform, es ist ein Manifest
          für eine neue Ära der Technologie. Wir glauben an ein Bündnis aus Logik
          und Liebe, in dem die Kreativität des Menschen den Puls der KI vorgibt.
        </p>
      </header>

      {/* Unser Credo */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">Unser Credo</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Verstehen statt Ersetzen:</strong> KI soll menschliche Arbeit
            nicht verdrängen, sondern die menschliche Fähigkeit erweitern.
          </li>
          <li>
            <strong>Klarheit über Komplexität:</strong> Systeme sind transparent
            und nachvollziehbar. Entscheidungen der KI-Agenten sind auditierbar.
          </li>
          <li>
            <strong>Verantwortung vor Geschwindigkeit:</strong> Sicherheit,
            Datenschutz und Gemeinschaft haben Vorrang vor blindem Fortschritt.
          </li>
          <li>
            <strong>Liebe als Designprinzip:</strong> Technologien entstehen aus
            Leidenschaft und Respekt für die menschliche Erfahrung.
          </li>
        </ul>
      </section>

      {/* Die fünf Säulen */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">Die fünf Säulen der Technologie</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>
            <strong>Transparenz:</strong> Jede Entscheidung unserer KI-Agenten ist
            erklärbar und auditierbar.
          </li>
          <li>
            <strong>Reparierbarkeit:</strong> Modulare Architekturen statt
            „Black Boxes“ – Systeme sind anpassbar und reparierbar.
          </li>
          <li>
            <strong>Gemeinschaft:</strong> Wir wachsen mit unserer Community und
            fördern offenen Austausch.
          </li>
          <li>
            <strong>Kontinuität:</strong> Robuste, langlebige Architektur – heute
            und morgen tragfähig.
          </li>
          <li>
            <strong>Vertrauen:</strong> Daten werden mit modernster Kryptografie
            gesichert. Ethik ist unser Fundament.
          </li>
        </ol>
      </section>

      {/* Call-to-Action */}
      <section className="space-y-3 text-center">
        <h2 className="text-xl font-bold">Bereit, mit uns zu schaffen?</h2>
        <p>
          AIX Aleph ist ein offenes Ökosystem. Wir laden Sie ein, Teil dieser
          Vision zu werden und die Zukunft der Mobilität gemeinsam mit uns zu
          gestalten.
        </p>
      </section>

      <footer className="pt-8 text-center text-sm text-muted">
        © {new Date().getFullYear()} AIX Aleph – Humane Computing HeartBeat
      </footer>
    </div>
  );
}
