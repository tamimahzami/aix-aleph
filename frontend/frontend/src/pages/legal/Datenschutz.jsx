// src/pages/legal/Datenschutz.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Datenschutz() {
  const year = new Date().getFullYear();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold">Datenschutz</h1>
        <p className="mt-2 text-muted">
          Diese Datenschutzrichtlinie erklärt, wie AIX Aleph UK Ltd
          (Rebranding zu AIX Aleph PLC) Ihre personenbezogenen Daten nach
          UK&nbsp;GDPR, EU-DSGVO und anwendbarem nationalen Recht verarbeitet.
        </p>
      </header>

      {/* Inhaltsverzeichnis */}
      <nav aria-label="Inhaltsverzeichnis" className="panel p-4 mb-8">
        <ol className="list-decimal pl-6 space-y-1 text-sm">
          <li><a className="hover:text-[var(--color-primary)]" href="#verantwortlicher">Verantwortliche Stelle</a></li>
          <li><a className="hover:text-[var(--color-primary)]" href="#datenkategorien">Kategorien der Daten</a></li>
          <li><a className="hover:text-[var(--color-primary)]" href="#zwecke">Verarbeitungszwecke & Rechtsgrundlagen</a></li>
          <li><a className="hover:text-[var(--color-primary)]" href="#uebermittlung">Datenübermittlung</a></li>
          <li><a className="hover:text-[var(--color-primary)]" href="#speicherdauer">Speicherdauer</a></li>
          <li><a className="hover:text-[var(--color-primary)]" href="#rechte">Ihre Rechte</a></li>
          <li><a className="hover:text-[var(--color-primary)]" href="#aufsicht">Aufsichtsbehörden</a></li>
          <li><a className="hover:text-[var(--color-primary)]" href="#sicherheit">Sicherheit der Verarbeitung</a></li>
          <li><a className="hover:text-[var(--color-primary)]" href="#cookies">Cookies & Analyse</a></li>
          <li><a className="hover:text-[var(--color-primary)]" href="#aenderungen">Änderungen dieser Richtlinie</a></li>
        </ol>
      </nav>

      <section id="verantwortlicher" className="space-y-2 mb-8">
        <h2 className="text-xl font-bold">1. Verantwortliche Stelle</h2>
        <p><strong>AIX Aleph UK Ltd</strong> (Rebranding zu AIX Aleph PLC)</p>
        <p>
          85 Great Portland Street, London W1W 7LT, United Kingdom<br />
          ✉ <a className="hover:text-[var(--color-primary)]" href="mailto:privacy@aix-aleph.com">privacy@aix-aleph.com</a><br />
          ☎ +49&nbsp;160&nbsp;702&nbsp;9153
        </p>
        <p className="text-sm text-muted">
          Weitere rechtliche Angaben finden Sie im <Link to="/impressum" className="hover:text-[var(--color-primary)]">Impressum</Link>.
        </p>
      </section>

      <section id="datenkategorien" className="space-y-2 mb-8">
        <h2 className="text-xl font-bold">2. Kategorien der Daten</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Kontaktdaten:</strong> Name, E-Mail, Telefon, Unternehmen.</li>
          <li><strong>Nutzungs-/Meta-Daten:</strong> IP-Adresse, Browser, Zugriffsdaten, Logfiles.</li>
          <li><strong>Bewerbungsdaten:</strong> Lebenslauf, Referenzen, Kontaktinformationen.</li>
          <li><strong>Vertrags-/Abrechnungsdaten:</strong> bei Kund:innen/Partnern.</li>
        </ul>
      </section>

      <section id="zwecke" className="space-y-2 mb-8">
        <h2 className="text-xl font-bold">3. Verarbeitungszwecke & Rechtsgrundlagen</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Bereitstellung der Website & Dienste</strong> (z. B. Login, Demo, Support) – Art. 6 Abs. 1 lit. b DSGVO.</li>
          <li><strong>Investor-/Partnerbeziehungen, Produktverbesserung</strong> – berechtigtes Interesse, Art. 6 Abs. 1 lit. f DSGVO.</li>
          <li><strong>Erfüllung gesetzlicher Pflichten</strong> – Art. 6 Abs. 1 lit. c DSGVO.</li>
          <li><strong>Recruiting & HR</strong> – Art. 6 Abs. 1 lit. b/f DSGVO; ggf. nationales Recht.</li>
          <li><strong>Marketing/Analytics</strong> – nur mit Einwilligung, Art. 6 Abs. 1 lit. a DSGVO.</li>
        </ul>
      </section>

      <section id="uebermittlung" className="space-y-2 mb-8">
        <h2 className="text-xl font-bold">4. Datenübermittlung</h2>
        <p>
          Eine Übermittlung kann innerhalb des EU/EWR und in das Vereinigte Königreich erfolgen. Bei
          Übermittlungen in andere Drittländer stellen wir ein angemessenes Schutzniveau sicher
          (z. B. EU-Standardvertragsklauseln bzw. UK-äquivalente Mechanismen).
        </p>
      </section>

      <section id="speicherdauer" className="space-y-2 mb-8">
        <h2 className="text-xl font-bold">5. Speicherdauer</h2>
        <p>
          Wir speichern personenbezogene Daten nur so lange, wie es für den jeweiligen Zweck nötig
          oder gesetzlich vorgeschrieben ist. Anschließend werden sie gelöscht oder anonymisiert.
        </p>
      </section>

      <section id="rechte" className="space-y-2 mb-8">
        <h2 className="text-xl font-bold">6. Ihre Rechte</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung (Art. 18)</li>
          <li>Datenübertragbarkeit (Art. 20), Widerspruch (Art. 21)</li>
          <li>Widerruf erteilter Einwilligungen (Art. 7 Abs. 3)</li>
        </ul>
        <p className="text-sm text-muted">
          Zur Ausübung Ihrer Rechte: <a className="hover:text-[var(--color-primary)]" href="mailto:privacy@aix-aleph.com">privacy@aix-aleph.com</a>
        </p>
      </section>

      <section id="aufsicht" className="space-y-2 mb-8">
        <h2 className="text-xl font-bold">7. Aufsichtsbehörden</h2>
        <p>
          Sie können sich bei der zuständigen Datenschutzbehörde beschweren, z. B. dem
          <em> Information Commissioner’s Office (UK)</em> oder dem/der <em>BfDI</em> in Deutschland
          bzw. Ihrer lokalen EU-Behörde.
        </p>
      </section>

      <section id="sicherheit" className="space-y-2 mb-8">
        <h2 className="text-xl font-bold">8. Sicherheit der Verarbeitung</h2>
        <p>
          Wir setzen geeignete technische und organisatorische Maßnahmen (TOMs) ein – u. a. TLS-
          Verschlüsselung, rollenbasierte Zugriffskontrollen, Protokollierung und regelmäßige
          Sicherheitsüberprüfungen – um Ihre Daten vor unbefugtem Zugriff zu schützen.
        </p>
      </section>

      <section id="cookies" className="space-y-2 mb-8">
        <h2 className="text-xl font-bold">9. Cookies & Analyse</h2>
        <p className="text-muted">
          Wir nutzen notwendige Cookies für grundlegende Funktionen. Mit Ihrer Einwilligung
          setzen wir optionale Cookies (z. B. für Statistik/Analytics), um unsere Services zu verbessern.
        </p>
        <div className="panel p-4">
          <h3 className="font-semibold">Cookie-Kategorien</h3>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li><strong>Essentiell:</strong> Erforderlich für Grundfunktionen (z. B. Login, Last-State). </li>
            <li><strong>Statistik:</strong> Anonyme Nutzungsanalyse (z. B. Page Views, Performance).</li>
            <li><strong>Marketing:</strong> Personalisierte Inhalte/Interaktionen (nur mit Einwilligung).</li>
          </ul>
          <div className="mt-3 text-sm">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => {
                // Falls ihr ein CMP nutzt, hier dessen API aufrufen
                // Beispiel: window.cookieConsent && window.cookieConsent.open();
                const ev = new CustomEvent("open-cookie-settings");
                window.dispatchEvent(ev);
              }}
            >
              Zustimmung verwalten
            </button>
            <span className="ml-3">
              Siehe auch: <Link to="/datenschutz#cookies" className="hover:text-[var(--color-primary)]">Cookie-Richtlinie</Link>
            </span>
          </div>
        </div>
      </section>

      <section id="aenderungen" className="space-y-2 mb-8">
        <h2 className="text-xl font-bold">10. Änderungen dieser Richtlinie</h2>
        <p>
          Wir behalten uns vor, diese Datenschutzrichtlinie anzupassen, um sie an geänderte
          rechtliche Vorgaben oder neue Services anzupassen. Die jeweils aktuelle Version ist
          jederzeit auf dieser Seite abrufbar.
        </p>
      </section>

      <footer className="text-sm text-muted">
        Letzte Aktualisierung: {year}. ·{" "}
        <Link to="/impressum" className="hover:text-[var(--color-primary)]">Impressum</Link>
      </footer>
    </div>
  );
}
