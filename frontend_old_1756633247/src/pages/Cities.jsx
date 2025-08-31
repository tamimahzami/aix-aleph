import React from 'react';
import '../styles/page.css';

export default function Cities() {
  return (
    <div className="page-container">
      <section className="page-hero">
        <h1>Mobilitätslösungen für Städte & Kommunen</h1>
        <p>
          Mit AIX ALEPH Mobility behalten Städte und Kommunen die Kontrolle über ihre ÖPNV- und
          Sharing-Flotten.
        </p>
      </section>

      <section className="page-content card">
        <h2>Herausforderungen lösen</h2>
        <ul>
          <li>Koordination von Bussen, Straßenbahnen, Carsharing und E-Bikes</li>
          <li>Vermeidung leerer Akkus und unzuverlässiger Einsätze</li>
          <li>Transparente Daten für Bürger:innen und Verwaltung</li>
        </ul>
      </section>
    </div>
  );
}
