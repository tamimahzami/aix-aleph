// src/pages/SolutionsCitiesPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Page.module.css";
import SolutionCard from "../components/SolutionCard";

function SolutionsCitiesPage() {
  const solutions = [
    {
      title: "ÖPNV-Optimierung",
      description: "Echtzeit-Monitoring und Steuerung von Elektrobussen und Bahnen",
      features: ["Fahrplan-Treueanalyse", "Energieverbrauchsprognose", "Auslastungsoptimierung"],
    },
    {
      title: "Ladeinfrastruktur-Management",
      description: "Intelligente Planung und Steuerung von Ladestationen",
      features: ["Lastmanagement", "Kostenoptimierung", "Standortanalyse"],
    },
    {
      title: "Verkehrsfluss-Optimierung",
      description: "Datenbasierte Steuerung des Stadtverkehrs",
      features: ["Echtzeit-Verkehrsanalyse", "Ampelschaltungsoptimierung", "Emissionsreduktion"],
    },
    {
      title: "Mikromobilitäts-Integration",
      description: "Vernetzung von E-Scootern, Leihrädern und ÖPNV",
      features: ["Einheitliches Booking", "Abstellplatz-Management", "Nutzungsanalyse"],
    },
  ];

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h1>Lösungen für Städte & Kommunen</h1>
        <p>Transformation urbaner Mobilität mit intelligenter Steuerung</p>
      </div>

      <div className={styles.solutionIntro}>
        <p>
          Als Stadt oder Kommune stehen Sie vor der Herausforderung, Mobilität nachhaltig, effizient
          und zukunftssicher zu gestalten. Unsere Plattform bietet Ihnen die Werkzeuge, um diese
          Herausforderungen zu meistern und eine Vorreiterrolle in der Mobilitätswende einzunehmen.
        </p>
      </div>

      <div className={styles.solutionsGrid}>
        {solutions.map((solution, idx) => (
          <SolutionCard key={idx} solution={solution} />
        ))}
      </div>

      <div className={styles.caseStudy}>
        <h2>Fallstudie: Stadt München</h2>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <strong>23%</strong>
            <span>Reduktion CO₂-Emissionen</span>
          </div>
          <div className={styles.statCard}>
            <strong>17%</strong>
            <span>Senkung Betriebskosten</span>
          </div>
          <div className={styles.statCard}>
            <strong>95%</strong>
            <span>Pünktlichkeit ÖPNV</span>
          </div>
          <div className={styles.statCard}>
            <strong>42%</strong>
            <span>Steigerung Fahrgastzahlen</span>
          </div>
        </div>
        <p>
          Durch die Implementierung der AIX ALEPH Mobility Plattform konnte München seinen öffentlichen
          Nahverkehr innerhalb von 18 Monaten vollständig elektrifizieren und gleichzeitig die
          Betriebseffizienz steigern.
        </p>
      </div>

      <div className={styles.ctaSection}>
        <h2>Starten Sie Ihre Mobilitätswende</h2>
        <p>
          Vereinbaren Sie eine persönliche Demo und erfahren Sie, wie unsere Lösungen speziell auf
          die Bedürfnisse Ihrer Kommune zugeschnitten sind.
        </p>
        <Link to="/demo" className={styles.ctaButton}>
          Demo vereinbaren
        </Link>
      </div>
    </div>
  );
}

export default SolutionsCitiesPage;
