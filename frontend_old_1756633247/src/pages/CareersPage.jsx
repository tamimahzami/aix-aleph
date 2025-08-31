import React from "react";
import styles from "../styles/Page.module.css";
import JobListing from "../components/JobListing";

export default function CareersPage() {
  const jobOpenings = [
    { id: 1, title: "Senior Backend Engineer (Node.js)", location: "Köln oder Remote", type: "Vollzeit", department: "Softwareentwicklung" },
    { id: 2, title: "UX/UI Designer", location: "München", type: "Vollzeit", department: "Produktdesign" },
    { id: 3, title: "Mobilitätsberater (m/w/d)", location: "Berlin, Hamburg, Frankfurt", type: "Vollzeit", department: "Kundenberatung" },
    { id: 4, title: "Data Scientist für Verkehrsprognosen", location: "Köln oder Remote", type: "Vollzeit", department: "Datenanalyse" },
    { id: 5, title: "Projektmanager Implementierung", location: "Düsseldorf", type: "Vollzeit", department: "Projektmanagement" }
  ];

  const benefits = [
    { icon: "🚀", title: "Gründerkultur", description: "Flache Hierarchien und Gestaltungsspielraum" },
    { icon: "🌍", title: "Flexible Arbeit", description: "Remote-Optionen und flexible Arbeitszeiten" },
    { icon: "📚", title: "Weiterbildung", description: "Jährliches Entwicklungsbudget von €2.000" },
    { icon: "⚖️", title: "Work-Life-Balance", description: "30 Tage Urlaub und Sabbatical-Option" },
    { icon: "��", title: "Gesundheit", description: "Kostenlose Mitgliedschaft in Fitnessstudios" },
    { icon: "👨‍👩‍👧", title: "Familie", description: "Betriebliche Kinderbetreuung und Elternzeitberatung" }
  ];

  return (
    <div className={styles.pageContainer}>
      <header className={styles.pageHeader}>
        <h1>Jobs &amp; Karriere</h1>
        <p>Gestalten Sie mit uns die Mobilität der Zukunft</p>
      </header>

      <section className={styles.careerIntro}>
        <p>
          Bei AIX ALEPH Mobility arbeiten Pioniere an der Mobilitätswende. Wir vereinen technologische
          Expertise mit Leidenschaft für nachhaltige Veränderung. Werden Sie Teil unseres Teams und
          gestalten Sie Lösungen, die Städte und Unternehmen weltweit transformieren.
        </p>
      </section>

      <section className={styles.jobListings}>
        <h2>Aktuelle Stellenangebote</h2>
        <div className={styles.jobsGrid}>
          {jobOpenings.map((job) => (
            <JobListing key={job.id} job={job} />
          ))}
        </div>
      </section>

      <section className={styles.benefitsSection}>
        <h2>Das bieten wir</h2>
        <div className={styles.benefitsGrid}>
          {benefits.map((benefit, i) => (
            <article key={i} className={styles.benefitCard}>
              <div className={styles.benefitIcon} aria-hidden="true">{benefit.icon}</div>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.cultureSection}>
        <h2>Unsere Kultur</h2>
        <div className={styles.cultureGrid}>
          <article className={styles.cultureCard}>
            <h3>Innovation</h3>
            <p>Wir fördern experimentelles Denken und geben Raum für neue Ideen</p>
          </article>
          <article className={styles.cultureCard}>
            <h3>Nachhaltigkeit</h3>
            <p>Ökologische und soziale Verantwortung sind Kern unseres Handelns</p>
          </article>
          <article className={styles.cultureCard}>
            <h3>Vielfalt</h3>
            <p>Wir schätzen unterschiedliche Perspektiven und Hintergründe</p>
          </article>
        </div>
      </section>

      <section className={styles.initiativeSection}>
        <h2>Initiativen für Bewerber</h2>
        <div className={styles.initiativeCards}>
          <article className={styles.initiativeCard}>
            <h3>Women in Tech</h3>
            <p>Mentoring-Programm und Netzwerk für Frauen in technischen Berufen</p>
          </article>
          <article className={styles.initiativeCard}>
            <h3>Career Returners</h3>
            <p>Spezielles Programm für Wiedereinsteiger nach Berufspause</p>
          </article>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <h2>Initiativbewerbung</h2>
        <p>Sie finden keine passende Stelle? Senden Sie uns eine Initiativbewerbung!</p>
        <a href="mailto:career@aix-aleph.de" className={styles.ctaButton}>
          Bewerbung senden
        </a>
      </section>
    </div>
  );
}
