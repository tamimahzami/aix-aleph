import React from "react";
import styles from "../styles/Page.module.css";

export default function AccessibilityStatementPage() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h1>Erklärung zur Barrierefreiheit</h1>
        <p>Gemäß § 11 Behindertengleichstellungsgesetz (BGG)</p>
      </div>

      <div className={styles.legalContent}>
        <h2>1. Erklärung zur Barrierefreiheit</h2>
        <p>Diese Erklärung zur Barrierefreiheit gilt für die digitale Plattform der AIX ALEPH Mobility GmbH unter www.aix-aleph.de.</p>

        <h2>2. Stand der Vereinbarkeit mit den Anforderungen</h2>
        <p>
          Die Plattform erfüllt die Anforderungen der Barrierefreien-Informationstechnik-Verordnung (BITV) 2.0 in der
          Fassung vom 25. Mai 2022 weitgehend. Eine vollständige Übereinstimmung mit allen Anforderungen wird
          angestrebt.
        </p>

        <h2>3. Nicht barrierefreie Inhalte</h2>
        <p>Folgende Inhalte sind noch nicht vollständig barrierefrei:</p>
        <ul className={styles.list}>
          <li>Einige komplexe Datenvisualisierungen im Dashboard</li>
          <li>Ältere PDF-Dokumente in der Dokumentenablage</li>
          <li>Videomaterial ohne vollständige Untertitelung</li>
        </ul>
        <p>Wir arbeiten kontinuierlich an der Beseitigung dieser Barrieren.</p>

        <h2>4. Erstellungsdatum der Erklärung</h2>
        <p>18. Mai 2024</p>

        <h2>5. Feedback und Kontaktmöglichkeiten</h2>
        <p>
          Barrieren melden an: barrierefreiheit@aix-aleph.de<br />
          Telefon: +49 221 123456<br />
          Fax: +49 221 123457
        </p>

        <h2>6. Durchsetzungsverfahren</h2>
        <p>
          Wenn Sie mit unserer Antwort nicht zufrieden sind, können Sie sich an die Schlichtungsstelle nach § 16 BGG wenden:
        </p>
        <p>
          Schlichtungsstelle nach dem Behindertengleichstellungsgesetz<br />
          beim Bundesbeauftragten für die Belange von Menschen mit Behinderungen<br />
          Mauerstraße 53, 10117 Berlin<br />
          Telefon: +49 30 185272805<br />
          E-Mail: info@schlichtungsstelle-bgg.de
        </p>
      </div>
    </div>
  );
}
