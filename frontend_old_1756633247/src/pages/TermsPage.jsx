import React from "react";
import styles from "../styles/Page.module.css";

export default function TermsPage() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h1>Allgemeine Geschäftsbedingungen (AGB)</h1>
        <p>Gültig ab 1. Januar 2024</p>
      </div>

      <div className={styles.legalContent}>
        <h2>§ 1 Geltungsbereich</h2>
        <p>
          Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge zwischen der AIX ALEPH Mobility GmbH und
          ihren Kunden über die Nutzung unserer Mobilitätsplattform und zugehöriger Dienstleistungen.
        </p>

        <h2>§ 2 Vertragsschluss</h2>
        <p>Mit der Bestätigung der Bestellung kommt der Vertrag zustande. Die Vertragssprache ist Deutsch.</p>

        <h2>§ 3 Leistungsbeschreibung</h2>
        <p>
          AIX ALEPH Mobility bietet eine cloudbasierte Plattform für das Management von Mobilitätsflotten an. Der
          genaue Leistungsumfang ergibt sich aus dem gewählten Tarif und den vereinbarten Zusatzleistungen.
        </p>

        <h2>§ 4 Nutzungsrechte</h2>
        <p>
          Dem Kunden wird ein nicht-exklusives, nicht übertragbares Recht zur Nutzung der Plattform für die vereinbarte
          Vertragslaufzeit eingeräumt. Die Weitergabe von Zugangsdaten an Dritte ist untersagt.
        </p>

        <h2>§ 5 Vergütung</h2>
        <p>Die Vergütung erfolgt gemäß dem gewählten Tarifmodell. Zahlungen sind innerhalb von 14 Tagen nach Rechnungserhalt fällig.</p>

        <h2>§ 6 Haftung</h2>
        <p>
          Die Haftung von AIX ALEPH Mobility ist auf Vorsatz und grobe Fahrlässigkeit beschränkt. Für leichte
          Fahrlässigkeit haftet AIX ALEPH Mobility nur bei Verletzung wesentlicher Vertragspflichten.
        </p>

        <h2>§ 7 Vertragslaufzeit und Kündigung</h2>
        <p>
          Die Mindestvertragslaufzeit beträgt 12 Monate. Danach verlängert sich der Vertrag jeweils um 12 Monate, wenn
          er nicht mit einer Frist von 3 Monaten zum Ende der Laufzeit gekündigt wird.
        </p>

        <h2>§ 8 Schlussbestimmungen</h2>
        <p>Es gilt deutsches Recht unter Ausschluss des UN-Kaufrechts. Gerichtsstand ist Köln.</p>
      </div>
    </div>
  );
}
