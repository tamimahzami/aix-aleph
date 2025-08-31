import React from "react";
import styles from "../styles/Page.module.css";

export default function HelpPage() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h1>Hilfe & Support</h1>
        <p>Antworten auf häufige Fragen</p>
      </div>
      <p>
        Hier entsteht unsere Hilfeseite. Wenn du Fragen hast, erreichst du uns
        über das Kontaktformular oder per E-Mail an support@aix-aleph.com.
      </p>
    </div>
  );
}
