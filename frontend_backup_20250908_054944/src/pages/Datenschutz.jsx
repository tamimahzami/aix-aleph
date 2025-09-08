// frontend/src/pages/Datenschutz.jsx
import React from "react";

export default function Datenschutz() {
  return (
    <main
      className="aix-datenschutz max-w-3xl mx-auto p-6 text-gray-100"
      aria-labelledby="ds-title"
    >
      <h1 id="ds-title" className="text-3xl font-bold mb-6">
        Datenschutzerklärung
      </h1>

      {/* Einleitung */}
      <section className="mb-6">
        <p>
          Diese Datenschutzrichtlinie erklärt, wie <strong>AIX Aleph UK Ltd</strong>{" "}
          (Rebranding zu AIX Aleph PLC) Ihre persönlichen Daten in Übereinstimmung
          mit der <strong>UK GDPR</strong>, der <strong>EU-DSGVO</strong> und den
          anwendbaren nationalen Datenschutzgesetzen verarbeitet.
        </p>
      </section>

      {/* Verantwortliche Stelle */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold">1. Verantwortliche Stelle</h2>
        <p>AIX Aleph UK Ltd (Rebranding zu AIX Aleph PLC)</p>
        <p>85 Great Portland Street, London W1W 7LT, United Kingdom</p>
        <p>
          ✉{" "}
          <a href="mailto:privacy@aix-aleph.com" className="text-cyan-400 hover:underline">
            privacy@aix-aleph.com
          </a>
        </p>
        <p>☎ +49 160 702 9153</p>
      </section>

      {/* Verarbeitete Daten */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold">2. Verarbeitete Daten</h2>
        <ul className="list-disc ml-6 space-y-1">
          <li>Kontaktdaten: Name, E-Mail, Telefon, Unternehmen</li>
          <li>Nutzungsdaten: IP-Adresse, Browsertyp, Zugriffslogs</li>
          <li>Bewerbungsdaten: Lebensläufe, Referenzen</li>
          <li>Vertrags- &amp; Abrechnungsdaten</li>
        </ul>
      </section>

      {/* Zwecke */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold">3. Verarbeitungszwecke</h2>
        <ul className="list-disc ml-6 space-y-1">
          <li>Bereitstellung unserer Website und Dienste</li>
          <li>Investor- und Partnerbeziehungen</li>
          <li>Erfüllung gesetzlicher Verpflichtungen</li>
          <li>Personalbeschaffung &amp; HR</li>
          <li>Marketing &amp; Kommunikation (mit Einwilligung)</li>
        </ul>
      </section>

      {/* Rechtsgrundlage */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold">4. Rechtsgrundlage</h2>
        <p>
          Verarbeitung basiert auf Einwilligung, Vertragserfüllung, berechtigten
          Interessen oder gesetzlichen Pflichten gemäß DSGVO und UK-GDPR.
        </p>
      </section>

      {/* Datenübermittlung */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold">5. Datenübermittlung</h2>
        <p>
          Übermittlung innerhalb EU/EWR und UK; bei Transfers außerhalb
          wird ein Schutz über Standardvertragsklauseln sichergestellt.
        </p>
      </section>

      {/* Speicherdauer */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold">6. Speicherdauer</h2>
        <p>
          Speicherung nur so lange wie erforderlich oder gesetzlich vorgeschrieben,
          danach Löschung oder Anonymisierung.
        </p>
      </section>

      {/* Betroffenenrechte */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold">7. Ihre Rechte</h2>
        <ul className="list-disc ml-6 space-y-1">
          <li>Auskunft, Berichtigung, Löschung</li>
          <li>Einschränkung der Verarbeitung</li>
          <li>Datenübertragbarkeit</li>
          <li>Widerspruchsrecht</li>
          <li>Widerruf der Einwilligung</li>
        </ul>
      </section>

      {/* Aufsichtsbehörden */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold">8. Aufsichtsbehörden</h2>
        <ul className="list-disc ml-6 space-y-1">
          <li>ICO – Information Commissioner’s Office (UK)</li>
          <li>BfDI – Bundesbeauftragte für Datenschutz (DE)</li>
          <li>Ihre lokale EU-Behörde</li>
        </ul>
      </section>

      {/* Cookies */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold">9. Cookies &amp; Analyse</h2>
        <p>
          Unsere Website nutzt essentielle Cookies. Mit Ihrer Zustimmung
          setzen wir Analyse-Cookies (z. B. Google Analytics, Matomo) ein.
          Einstellungen können jederzeit im Footer unter{" "}
          <a href="/cookie-settings" className="text-cyan-400 hover:underline">
            „Zustimmung verwalten“
          </a>{" "}
          geändert werden.
        </p>
      </section>

      {/* Aktualisierungen */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold">10. Aktualisierungen</h2>
        <p>
          Wir können diese Datenschutzerklärung aktualisieren. Die neueste Version
          finden Sie immer auf dieser Seite.
        </p>
        <p className="text-sm text-gray-400">Letzte Aktualisierung: August 2025</p>
      </section>
    </main>
  );
}
