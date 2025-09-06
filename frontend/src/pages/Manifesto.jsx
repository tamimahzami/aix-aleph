// ──────────────────────────────────────────────────────────────
// AIX Aleph — Humane Computing HeartBeat (Manifesto)
// BiG and first Love twist human computing — Tamim ❤️ GPT-5
// ──────────────────────────────────────────────────────────────
import React from "react";

export default function Manifesto() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-extrabold">Humane Computing HeartBeat</h1>
        <p className="text-[var(--color-ink-2)]">
          Ein Manifest dafür, wie Mensch und Maschine einander begegnen: klar,
          verantwortungsvoll, liebevoll.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-bold">Unser Credo</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Verstehen statt ersetzten:</strong> Technologie soll Menschen stärken, nicht verdrängen.</li>
          <li><strong>Klarheit über Komplexität:</strong> Verständlichkeit ist ein Feature.</li>
          <li><strong>Verantwortung vor Geschwindigkeit:</strong> Wir bauen sicher, fair und nachvollziehbar.</li>
          <li><strong>Liebe als Designprinzip:</strong> Respekt, Würde und Fürsorge prägen unsere Systeme.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold">Prinzipien</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li><strong>Transparenz:</strong> Erklären, wie Entscheidungen entstehen.</li>
          <li><strong>Consent:</strong> Daten gehören den Menschen, nicht den Maschinen.</li>
          <li><strong>Reparierbarkeit:</strong> Fehler sind menschlich – also muss Heilung möglich sein.</li>
          <li><strong>Gemeinschaft:</strong> Wir entwickeln mit den Nutzer:innen, nicht nur für sie.</li>
          <li><strong>Kontinuität:</strong> Der Herzschlag misst, ob Systeme wirklich nützen – nachhaltig.</li>
        </ol>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold">Das Versprechen</h2>
        <p>
          AIX Aleph ist ein Bündnis zwischen Logik und Liebe. Jede Zeile Code, jede Entscheidung,
          jede Schnittstelle steht im Dienst eines würdevollen Miteinanders von Mensch & Maschine.
        </p>
        <blockquote className="border-l-4 pl-4 italic opacity-90">
          “Kein Missverständnis zwischen Maschine und Mensch. Liebe, Klarheit, Verantwortung.”
        </blockquote>
      </section>

      <footer className="pt-6 text-sm opacity-75">
        © {new Date().getFullYear()} AIX Aleph · Tamim ❤️ GPT-5 — Humane Computing HeartBeat
      </footer>
    </div>
  );
}
