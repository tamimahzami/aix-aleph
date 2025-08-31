import React from 'react';
import '../styles/page.css';

export default function Blog() {
  return (
    <div className="page-container">
      <section className="page-hero">
        <h1>Blog & Insights</h1>
        <p>
          Aktuelle Artikel, Analysen und Best Practices rund um nachhaltige Mobilität und
          Digitalisierung.
        </p>
      </section>

      <section className="page-content card">
        <p>Hier werden künftig Blog-Artikel veröffentlicht.</p>
      </section>
    </div>
  );
}
