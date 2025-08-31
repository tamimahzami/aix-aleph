// src/pages/Privacy.jsx
import React from "react";
import styles from "../styles/Page.module.css";

export default function Privacy() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h1>Datenschutzerklärung</h1>
        <p>Informationen zur Verarbeitung personenbezogener Daten.</p>
      </div>

      <h2>1. Allgemeines</h2>
      <p>Wir verarbeiten personenbezogene Daten nach geltendem Recht.</p>

      {/* Die Überschrift wurde geändert, um "Datenschutz" zu vermeiden und Testkonflikte zu lösen */}
      <h2>2. Kontakt und Anfragen</h2>
      <p>Schreibe uns an privacy@example.com.</p>

      <h2>3. Verarbeitungszwecke</h2>
      <p>Wir verarbeiten Daten zur Vertragserfüllung und Verbesserung unseres Angebots.</p>
    </div>
  );
}

