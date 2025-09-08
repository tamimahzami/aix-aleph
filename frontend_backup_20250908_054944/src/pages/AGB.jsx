// frontend/src/pages/AGB.jsx
import React from "react";

export default function AGB() {
  return (
    <main
      className="aix-agb max-w-4xl mx-auto p-8 text-gray-100 leading-relaxed"
      aria-labelledby="agb-title"
    >
      <h1 id="agb-title" className="text-4xl font-bold mb-6">
        Allgemeine Geschäftsbedingungen (AGB)
      </h1>

      <p className="mb-8">
        Diese AGB gelten für die Nutzung von AIX ALEPH-Lösungen und -Diensten durch
        Geschäftskund:innen (B2B).
      </p>

      <section className="mb-8" aria-labelledby="agb-scope">
        <h2 id="agb-scope" className="text-2xl font-semibold mb-3">
          Geltungsbereich &amp; Vertragspartner
        </h2>
        <p>
          Vertragspartner ist die <strong>AIX Aleph UK Ltd</strong> (Rebranding zu AIX Aleph PLC).
        </p>
      </section>

      <section className="mb-8" aria-labelledby="agb-services">
        <h2 id="agb-services" className="text-2xl font-semibold mb-3">Leistungsbeschreibung</h2>
        <p>
          Wir stellen Softwarelösungen (SaaS/On-Prem), APIs, Support und professionelle
          Dienstleistungen zur Verfügung, wie im Angebot näher beschrieben.
        </p>
      </section>

      <section className="mb-8" aria-labelledby="agb-accounts">
        <h2 id="agb-accounts" className="text-2xl font-semibold mb-3">Registrierung &amp; Accounts</h2>
        <p>
          Kund:innen sind für die Sicherheit ihrer Zugangsdaten verantwortlich. Missbrauch ist
          umgehend zu melden.
        </p>
      </section>

      <section className="mb-8" aria-labelledby="agb-term">
        <h2 id="agb-term" className="text-2xl font-semibold mb-3">Vertragsschluss &amp; Laufzeit</h2>
        <p>
          Verträge kommen durch Annahme eines Angebots zustande. Laufzeiten und Verlängerungen
          ergeben sich aus dem Bestellschein.
        </p>
      </section>

      <section className="mb-8" aria-labelledby="agb-pricing">
        <h2 id="agb-pricing" className="text-2xl font-semibold mb-3">Preise &amp; Zahlung</h2>
        <p>
          Alle Preise verstehen sich zzgl. Steuern. Zahlungen erfolgen monatlich oder jährlich und
          sind innerhalb der vereinbarten Frist fällig.
        </p>
      </section>

      <section className="mb-8" aria-labelledby="agb-sla">
        <h2 id="agb-sla" className="text-2xl font-semibold mb-3">SLA &amp; Support</h2>
        <p>
          Service-Level und Support richten sich nach dem SLA-Dokument. Wartungsfenster werden
          angekündigt.
        </p>
      </section>

      <section className="mb-8" aria-labelledby="agb-ip">
        <h2 id="agb-ip" className="text-2xl font-semibold mb-3">Nutzungsrechte &amp; IP</h2>
        <p>
          Alle Rechte an der Software verbleiben bei AIX ALEPH. Kund:innen erhalten ein einfaches,
          nicht übertragbares Nutzungsrecht.
        </p>
      </section>

      <section className="mb-8" aria-labelledby="agb-conf">
        <h2 id="agb-conf" className="text-2xl font-semibold mb-3">Vertraulichkeit</h2>
        <p>
          Beide Seiten verpflichten sich zur Wahrung vertraulicher Informationen, außer wenn
          gesetzliche Pflichten entgegenstehen.
        </p>
      </section>

      <section className="mb-8" aria-labelledby="agb-privacy">
        <h2 id="agb-privacy" className="text-2xl font-semibold mb-3">Datenschutz</h2>
        <p>
          Personenbezogene Daten werden gemäß DSGVO, UK-GDPR und ggf. AVV verarbeitet.
        </p>
      </section>

      <section className="mb-8" aria-labelledby="agb-liability">
        <h2 id="agb-liability" className="text-2xl font-semibold mb-3">Gewährleistung &amp; Haftung</h2>
        <p>
          Es gilt die gesetzliche Sachmängelhaftung, modifiziert durch SLA/Hauptvertrag. Haftung ist
          bei Vorsatz/grober Fahrlässigkeit unbeschränkt, ansonsten auf typische Schäden begrenzt.
        </p>
      </section>

      <section className="mb-8" aria-labelledby="agb-force-majeure">
        <h2 id="agb-force-majeure" className="text-2xl font-semibold mb-3">Höhere Gewalt</h2>
        <p>Für Ereignisse außerhalb unserer Kontrolle übernehmen wir keine Haftung.</p>
      </section>

      <section className="mb-8" aria-labelledby="agb-compliance">
        <h2 id="agb-compliance" className="text-2xl font-semibold mb-3">Compliance &amp; Export</h2>
        <p>Kund:innen verpflichten sich, alle Exportkontroll- und Sanktionsvorgaben einzuhalten.</p>
      </section>

      <section className="mb-8" aria-labelledby="agb-changes">
        <h2 id="agb-changes" className="text-2xl font-semibold mb-3">Änderungen der AGB</h2>
        <p>
          Änderungen werden vorab angekündigt. Bei Widerspruch besteht ein Sonderkündigungsrecht.
        </p>
      </section>

      <section className="mb-8" aria-labelledby="agb-law">
        <h2 id="agb-law" className="text-2xl font-semibold mb-3">Recht &amp; Gerichtsstand</h2>
        <p>Es gilt englisches Recht. Gerichtsstand: London W1W 7LT.</p>
      </section>

      <p className="text-sm text-white/60 mt-6">Stand: {new Date().toLocaleDateString()}</p>
    </main>
  );
}
