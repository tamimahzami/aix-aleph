import React from 'react';
import '../styles/page.css';

export default function Government() {
  return (
    <div className="page-container">
      <section className="page-hero">
        <h1>Mobilitätslösungen für Regierungen</h1>
        <p>
          Nationale und regionale Regierungen nutzen AIX ALEPH Mobility, um nachhaltige
          Mobilitätsstrategien umzusetzen.
        </p>
      </section>

      <section className="page-content card">
        <h2>Vorteile für Regierungen</h2>
        <ul>
          <li>Zentrale Plattform für Mobilitätsdaten</li>
          <li>CO₂-Einsparungen auf nationaler Ebene messbar machen</li>
          <li>Unterstützung bei Förderprogrammen und Regulierungen</li>
        </ul>
      </section>
    </div>
  );
}
