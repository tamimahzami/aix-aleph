import React from "react";
import styles from "../styles/Page.module.css";

export default function SupplyChainPage() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h1>Lieferkettensorgfaltspflichtengesetz (LkSG)</h1>
        <p>Unsere Verantwortung in der globalen Lieferkette</p>
      </div>

      <div className={styles.contentSection}>
        <h2>Unser Ansatz</h2>
        <p>
          AIX ALEPH Mobility bekennt sich zur Einhaltung der Menschenrechte und Umweltstandards entlang der
          gesamten Lieferkette. Wir setzen das Lieferkettensorgfaltspflichtengesetz (LkSG) konsequent um und
          gehen über die gesetzlichen Anforderungen hinaus.
        </p>

        <h2>Risikoanalyse</h2>
        <p>Wir haben ein systematisches Risikomanagement etabliert, das folgende Risikobereiche abdeckt:</p>
        <ul className={styles.list}>
          <li>Menschenrechtsrisiken (z.B. Kinderarbeit, Diskriminierung)</li>
          <li>Umweltrisiken (z.B. Schadstoffemissionen, Wasserverbrauch)</li>
          <li>Risiken in Beschaffungsländern (insbesondere für kritische Rohstoffe)</li>
        </ul>

        <h2>Maßnahmen</h2>
        <div className={styles.measuresGrid}>
          <div className={styles.measureCard}>
            <h3>Verhaltenskodex für Lieferanten</h3>
            <p>Verbindliche Standards für alle Geschäftspartner</p>
          </div>
          <div className={styles.measureCard}>
            <h3>Due Diligence Audits</h3>
            <p>Regelmäßige Überprüfungen bei Hochrisiko-Lieferanten</p>
          </div>
          <div className={styles.measureCard}>
            <h3>Beschwerdemechanismen</h3>
            <p>Anlaufstelle für Hinweise auf Verstöße: lksg@aix-aleph.de</p>
          </div>
          <div className={styles.measureCard}>
            <h3>Transparenzberichte</h3>
            <p>Jährliche Berichterstattung über unsere Maßnahmen</p>
          </div>
        </div>

        <h2>Prioritäre Risiken</h2>
        <p>Unsere besondere Aufmerksamkeit gilt:</p>
        <ul className={styles.list}>
          <li>Kobalt-Beschaffung für Batterien</li>
          <li>Arbeitsbedingungen in Elektronikfertigungsstätten</li>
          <li>CO₂-Fußabdruck der Logistikketten</li>
        </ul>

        <h2>Berichterstattung</h2>
        <p>
          Unser aktueller LkSG-Bericht steht zum Download bereit:
        </p>
        <p>
          <a href="/reports/lksg-report-2024.pdf" className={styles.reportLink}>LkSG-Bericht 2024 (PDF, 2.5 MB)</a>
        </p>
      </div>
    </div>
  );
}
