// src/pages/Imprint.jsx
import React from "react";
import styles from "../styles/Page.module.css";

export default function Imprint() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h1>Impressum</h1>
      </div>
      <p>Angaben gemäß § 5 TMG …</p>
    </div>
  );
}
