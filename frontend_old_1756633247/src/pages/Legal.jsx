import React from "react";

export default function Legal() {
  return (
    <main className="page">
      <section className="container legal">
        <div className="card">
          <h1>Rechtliches</h1>

          <h2 id="impressum">Impressum</h2>
          <p>
            <strong>AIX Aleph</strong><br />
            Musterstraße 1<br />
            50667 Köln, Deutschland<br />
            E-Mail: hello@aix-aleph.com<br />
            Telefon: +49 (0)221 1234567
          </p>
          <p>
            Vertretungsberechtigte Person: Max Mustermann<br />
            USt-ID (falls vorhanden): DE123456789
          </p>

          <hr />

          <h2 id="datenschutz">Datenschutzerklärung (Kurzfassung)</h2>
          <p className="muted">
            Diese Zusammenfassung dient der schnellen Orientierung. Die vollständige Fassung
            findest du unten auf der Seite <em>Datenschutz (vollständig)</em>.
          </p>
          <ul>
            <li><strong>Verantwortlicher:</strong> AIX Aleph, siehe Impressum</li>
            <li><strong>Zwecke:</strong> Bereitstellung der Plattform, Support, Sicherheit, Verbesserung der Dienste</li>
            <li><strong>Rechtsgrundlagen:</strong> Art. 6 Abs. 1 lit. b, f DSGVO</li>
            <li><strong>Datenarten:</strong> Stammdaten (Name, Firma, E-Mail), Nutzungsdaten, Metadaten</li>
            <li><strong>Speicherdauer:</strong> nach Vertragsende Löschung gem. gesetzl. Fristen</li>
            <li><strong>Betroffenenrechte:</strong> Auskunft, Löschung, Berichtigung, Widerspruch</li>
            <li><strong>Auftragsverarbeitung:</strong> Auf Wunsch DPA (AV-Vertrag) abschließbar</li>
          </ul>

          <details>
            <summary><strong>Datenschutz (vollständig) ausklappen</strong></summary>
            <p>
              Wir verarbeiten personenbezogene Daten gemäß DSGVO ausschließlich zur
              Vertragserfüllung, Systemsicherheit und Verbesserung des Angebots. Technische
              Logdaten werden zur Abwehr von Angriffen gespeichert. Eine Weitergabe an
              Dritte erfolgt nur, wenn dies zur Leistungserbringung erforderlich ist
              (z. B. Hosting) oder eine rechtliche Pflicht besteht. Nutzer können ihre
              Einwilligungen jederzeit widerrufen. Für Datenübermittlungen in Drittländer
              sorgen wir für angemessene Garantien (Standardvertragsklauseln).
            </p>
          </details>

          <hr />

          <h2 id="agb">Allgemeine Geschäftsbedingungen (AGB)</h2>
          <ol>
            <li><strong>Geltungsbereich:</strong> Diese AGB gelten für alle Verträge über die Nutzung der Plattform.</li>
            <li><strong>Leistungsumfang:</strong> Bereitstellung von Softwarefunktionen („as-a-Service“), Support gemäß Plan.</li>
            <li><strong>Verfügbarkeit:</strong> Ziel-Uptime 99,9 % (monatlich), geplante Wartungen werden angekündigt.</li>
            <li><strong>Pflichten des Kunden:</strong> Zugangsdaten schützen, gesetzliche Vorgaben einhalten.</li>
            <li><strong>Preise & Abrechnung:</strong> gemäß jeweils gültiger Preisliste/Vertrag.</li>
            <li><strong>Haftung:</strong> Für Vorsatz und grobe Fahrlässigkeit unbeschränkt; im Übrigen gemäß Gesetz.</li>
            <li><strong>Laufzeit & Kündigung:</strong> Sofern nicht anders vereinbart, monatlich kündbar zum Periodenende.</li>
            <li><strong>Gerichtsstand & Recht:</strong> Deutsches Recht; ausschließlicher Gerichtsstand Köln, sofern zulässig.</li>
          </ol>

          <p className="muted">
            Hinweis: Ersetze Platzhalter (Adresse, USt-ID, Vertretung) durch deine echten Daten
            und lasse Impressum/Datenschutz/AGB rechtlich prüfen.
          </p>
        </div>
      </section>
    </main>
  );
}
