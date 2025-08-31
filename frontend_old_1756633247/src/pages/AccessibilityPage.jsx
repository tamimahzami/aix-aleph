import React from "react";
import styles from "../styles/Page.module.css";

export default function AccessibilityPage() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h1>Barrierefreiheit</h1>
        <p>Unser Engagement für inklusive Technologie</p>
      </div>

      <div className={styles.contentSection}>
        <h2>Unser Ansatz</h2>
        <p>
          Bei AIX ALEPH Mobility entwickeln wir unsere Plattform nach den Prinzipien des „Design for All“. Wir streben
          danach, unsere Dienste für alle Nutzer zugänglich zu machen – unabhängig von körperlichen oder technischen
          Einschränkungen.
        </p>

        <h2>Technische Maßnahmen</h2>
        <ul className={styles.list}>
          <li>WCAG 2.1 AA Konformität für Webanwendungen</li>
          <li>Responsive Designs für alle Gerätegrößen</li>
          <li>Unterstützung für Screenreader und Vergrößerungssoftware</li>
          <li>Tastaturnavigation ohne Mausbedarf</li>
          <li>Kontrastreiche Darstellungsmodi</li>
        </ul>

        <h2>Mobilitätslösungen für alle</h2>
        <p>Unsere Plattform unterstützt speziell die Bedürfnisse von Menschen mit Mobilitätseinschränkungen:</p>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <h3>Rollstuhlgerechte Navigation</h3>
            <p>Routenplanung mit barrierefreien Wegen und Transportoptionen</p>
          </div>
          <div className={styles.featureCard}>
            <h3>Sprachsteuerung</h3>
            <p>Vollständige Bedienung per Spracheingabe</p>
          </div>
          <div className={styles.featureCard}>
            <h3>Barrierefreie Fahrzeuge</h3>
            <p>Filter für rollstuhlgerechte Fahrzeuge in Flotten</p>
          </div>
        </div>

        <h2>Feedback und Unterstützung</h2>
        <p>
          Wir verbessern die Zugänglichkeit laufend. Wenn Sie auf Barrieren stoßen oder Vorschläge haben:
          <br />
          E-Mail: barrierefreiheit@aix-aleph.de · Telefon: +49 221 123456 (Gebärdensprachdienst via Video verfügbar)
        </p>
      </div>
    </div>
  );
}
