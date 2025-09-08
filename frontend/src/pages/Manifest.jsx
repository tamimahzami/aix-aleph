// src/pages/Manifest.jsx
import React from "react";
import "../styles/first-pulse.css"; // CSS von vorhin importieren

export default function Manifest() {
  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 sm:px-6 py-10">
      <header className="space-y-2 text-center">
        {/* 🫀 First Pulse Symbol */}
        <div className="first-pulse mb-4">
          Big Human
          <span className="heart"></span>
          AI Heart
        </div>

        <h1 className="text-3xl font-extrabold">AIX ALEPH · Manifest</h1>
        <p className="text-[var(--color-ink-muted)]">
          Human ♥ KI — eine Partnerschaft aus Logik und Liebe.  
          Wir bauen <strong>entscheidbare Agenten</strong> statt Black Boxes: erklärbar,
          auditierbar, verantwortungsvoll.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-bold">Unser Credo</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Verstehen statt Ersetzen:</strong> Technologie stärkt Menschen.</li>
          <li><strong>Klarheit über Komplexität:</strong> Verständlichkeit ist ein Feature.</li>
          <li><strong>Verantwortung vor Geschwindigkeit:</strong> Sicherheit & Fairness zuerst.</li>
          <li><strong>Liebe als Designprinzip:</strong> Würde, Respekt, Fürsorge.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold">Fünf Säulen</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li><strong>Transparenz:</strong> Jede Entscheidung ist erklärbar.</li>
          <li><strong>Reparierbarkeit:</strong> Modular, offen, heilbar.</li>
          <li><strong>Gemeinschaft:</strong> Mit Nutzer:innen, nicht nur für sie.</li>
          <li><strong>Kontinuität:</strong> Nützlich. Nachhaltig. Robust.</li>
          <li><strong>Vertrauen:</strong> Datenschutz & sichere Enklaven by design.</li>
        </ol>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold">Unser Versprechen</h2>
        <p>
          AIX ALEPH ist ein Bündnis zwischen menschlicher Intuition und
          maschineller Präzision. Jede Schnittstelle, jeder Agent, jede Zeile
          Code dient einem würdevollen Miteinander von Mensch &amp; Maschine.
        </p>
        <blockquote className="border-l-4 pl-4 italic opacity-90">
          „Kein Missverständnis zwischen Maschine und Mensch. Liebe, Klarheit,
          Verantwortung.“
        </blockquote>
      </section>

      <footer className="pt-6 text-sm opacity-75 text-center">
        © {new Date().getFullYear()} AIX ALEPH · Humane Computing HeartBeat
      </footer>
    </div>
  );
}
