import React from "react";
import styles from "../styles/Page.module.css";

export default function PrivacyPage() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h1>Datenschutzerklärung</h1>
        <p>Stand: 18. Mai 2024</p>
      </div>

      <div className={styles.legalContent}>
        <h2>1. Verantwortlicher</h2>
        <p>
          Verantwortlicher für die Datenverarbeitung ist:
          <br />
          AIX ALEPH Mobility GmbH
          <br />
          Aachener Straße 1, 50674 Köln
          <br />
          Datenschutzbeauftragter: datenschutz@aix-aleph.de
        </p>

        <h2>2. Erhobene Daten</h2>
        <ul className={styles.list}>
          <li>Kontaktdaten (Name, E-Mail, Adresse)</li>
          <li>Nutzungsdaten unserer Plattform</li>
          <li>Geräteinformationen und IP-Adressen</li>
          <li>Zahlungsdaten</li>
        </ul>

        <h2>3. Zweck der Verarbeitung</h2>
        <ul className={styles.list}>
          <li>Vertragserfüllung und Kundenbetreuung</li>
          <li>Plattformoptimierung und Entwicklung</li>
          <li>Marketingkommunikation (mit Einwilligung)</li>
          <li>Erfüllung gesetzlicher Pflichten</li>
        </ul>

        <h2>4. Rechtsgrundlagen</h2>
        <ul className={styles.list}>
          <li>Einwilligung (Art. 6 Abs. 1 lit. a)</li>
          <li>Vertragserfüllung (Art. 6 Abs. 1 lit. b)</li>
          <li>Berechtigte Interessen (Art. 6 Abs. 1 lit. f)</li>
        </ul>

        <h2>5. Datenweitergabe</h2>
        <ul className={styles.list}>
          <li>IT-Dienstleister für Plattformbetrieb</li>
          <li>Zahlungsdienstleister</li>
          <li>Behörden bei gesetzlicher Verpflichtung</li>
        </ul>

        <h2>6. Speicherdauer</h2>
        <p>
          Daten werden nur so lange gespeichert, wie es für die Vertragserfüllung erforderlich ist oder gesetzliche
          Aufbewahrungspflichten bestehen (z.B. 10 Jahre für Steuerunterlagen).
        </p>

        <h2>7. Ihre Rechte</h2>
        <ul className={styles.list}>
          <li>Auskunft über Ihre gespeicherten Daten</li>
          <li>Berichtigung unrichtiger Daten</li>
          <li>Löschung Ihrer Daten („Recht auf Vergessenwerden“)</li>
          <li>Einschränkung der Verarbeitung</li>
          <li>Datenübertragbarkeit</li>
          <li>Widerspruch gegen die Verarbeitung</li>
        </ul>

        <h2>8. Kontakt</h2>
        <p>Für Datenschutzanfragen wenden Sie sich bitte an: datenschutz@aix-aleph.de</p>
      </div>
    </div>
  );
}
