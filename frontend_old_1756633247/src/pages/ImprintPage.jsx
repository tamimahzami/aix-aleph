import React from "react";
import styles from "../styles/Page.module.css";

export default function ImprintPage() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h1>Impressum</h1>
        <p>Rechtliche Informationen gemäß § 5 TMG</p>
      </div>

      <div className={styles.legalContent}>
        <h2>Angaben gemäß § 5 TMG</h2>
        <p>
          AIX ALEPH Mobility GmbH<br />
          Aachener Straße 1<br />
          50674 Köln<br />
          Deutschland
        </p>

        <p>
          Handelsregister: HRB 123456<br />
          Registergericht: Amtsgericht Köln<br />
          Umsatzsteuer-Identifikationsnummer: DE123456789
        </p>

        <h2>Vertreten durch</h2>
        <p>Geschäftsführung: Dr. Maximilian Schuster, Elena Vogel</p>

        <h2>Kontakt</h2>
        <p>
          Telefon: +49 221 123456<br />
          E-Mail: kontakt@aix-aleph.de<br />
          Fax: +49 221 123457
        </p>

        <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
        <p>
          Dr. Maximilian Schuster<br />
          AIX ALEPH Mobility GmbH<br />
          Aachener Straße 1<br />
          50674 Köln
        </p>

        <h2>Berufsbezeichnung und berufsrechtliche Regelungen</h2>
        <p>
          Berufsbezeichnung: Ingenieure für Mobilitätssysteme<br />
          Zuständige Kammer: Ingenieurkammer-Bau Nordrhein-Westfalen<br />
          Verliehen in: Bundesrepublik Deutschland
        </p>

        <h2>Streitschlichtung</h2>
        <p>
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
          <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">
            https://ec.europa.eu/consumers/odr
          </a>
          .<br />
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
          teilzunehmen.
        </p>

        <h2>Haftung für Inhalte</h2>
        <p>
          Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen
          Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet,
          übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf
          eine rechtswidrige Tätigkeit hinweisen.
        </p>
      </div>
    </div>
  );
}
