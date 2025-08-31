import React from 'react';
import styles from '../styles/Page.module.css';

export default function JobListing({ job }) {
  return (
    <div className={styles.projectCard} role="region" aria-labelledby={`job-${job.id}-title`}>
      <h3 id={`job-${job.id}-title`}>{job.title}</h3>
      <p><strong>Standort:</strong> {job.location}</p>
      <p><strong>Art:</strong> {job.type}</p>
      <p><strong>Bereich:</strong> {job.department}</p>
      <a
        className={styles.ctaButton}
        href={`mailto:career@aix-aleph.de?subject=${encodeURIComponent("Bewerbung: " + job.title)}`}
      >
        Jetzt bewerben
      </a>
    </div>
  );
}
