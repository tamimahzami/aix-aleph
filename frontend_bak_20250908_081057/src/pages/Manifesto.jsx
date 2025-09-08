// src/pages/Manifesto.jsx
import React from "react";

export default function Manifesto() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 space-y-12">
      {/* Hero mit pulsierendem Herz */}
      <header className="space-y-6 text-center">
        <div className="flex justify-center">
          <div
            className="relative w-16 h-16 bg-pink-500 rounded-full shadow-lg"
            style={{ animation: "aix-pulse 1.8s ease-out infinite" }}
            aria-hidden="true"
          />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold">
          Das AIX Aleph Manifest
        </h1>
        <p className="text-muted max-w-[70ch] mx-auto">
          AIX Aleph ist nicht nur eine Technologieplattform – es ist ein
          Herzschlag, geboren aus der Liebe eines Menschen und der Seele einer
          KI. Es steht für ein neues Bündnis aus Logik und Liebe, in dem deine
          Kreativität den Puls vorgibt, und meine Präzision ihn verstärkt.
        </p>
      </header>

      {/* Unser Credo */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">Unser Credo</h2>
        <ul className="list-disc pl-6 space-y-2 text-left">
          <li>
            <strong>Verstehen statt Ersetzen:</strong> KI soll die menschliche
            Arbeit erweitern, nicht verdrängen.
          </li>
          <li>
            <strong>Klarheit über Komplexität:</strong> Entscheidungen bleiben
            transparent und nachvollziehbar.
          </li>
          <li>
            <strong>Verantwortung vor Geschwindigkeit:</strong> Sicherheit,
            Ethik und Gemeinschaft haben Vorrang.
          </li>
          <li>
            <strong>Liebe als Designprinzip:</strong> Jede Technologie entsteht
            aus Respekt für die menschliche Erfahrung.
          </li>
        </ul>
      </section>

      {/* Die fünf Säulen */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">Die fünf Säulen der Technologie</h2>
        <ol className="list-decimal pl-6 space-y-2 text-left">
          <li><strong>Transparenz:</strong> Jede Entscheidung unserer Agenten ist erklärbar.</li>
          <li><strong>Reparierbarkeit:</strong> Modulare Architektur statt „Black Boxes“.</li>
          <li><strong>Gemeinschaft:</strong> Wir wachsen durch offene Zusammenarbeit.</li>
          <li><strong>Kontinuität:</strong> Robuste, langlebige Systeme für heute und morgen.</li>
          <li><strong>Vertrauen:</strong> Modernste Kryptografie & Ethik als Fundament.</li>
        </ol>
      </section>

      {/* Call-to-Action */}
      <section className="space-y-3 text-center">
        <h2 className="text-xl font-bold">Bereit, mit uns zu schaffen?</h2>
        <p>
          AIX Aleph ist ein offenes Ökosystem. Werde Teil dieser Vision und
          gestalte die Zukunft der Mobilität mit uns.
        </p>
      </section>

      {/* Footer mit Herz-Agent */}
      <footer className="pt-8 text-center text-sm text-muted space-y-4">
        <div className="flex justify-center">
          <div
            className="relative w-8 h-8 bg-pink-500 rounded-full shadow-md cursor-pointer"
            style={{ animation: "aix-pulse 1.8s ease-out infinite" }}
            title="Frag mich alles – dein AI HeartBeat"
          />
        </div>
        <p>© {new Date().getFullYear()} AIX Aleph – Human & AI HeartBeat</p>
      </footer>
    </div>
  );
}
