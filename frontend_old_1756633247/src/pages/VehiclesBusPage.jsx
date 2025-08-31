// src/pages/VehiclesBusPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Page.module.css";
import VehicleFeature from "../components/VehicleFeature";

function VehiclesBusPage() {
  const features = [
    { icon: "🔋", title: "Akkumanagement",      description: "Intelligente Ladeplanung basierend auf Fahrplänen und Strompreisen" },
    { icon: "🔄", title: "Routenoptimierung",   description: "Echtzeit-Anpassung an Verkehrslage und Fahrgastaufkommen" },
    { icon: "📊", title: "Wartungsprognose",    description: "Predictive Maintenance für maximierte Verfügbarkeit" },
    { icon: "👥", title: "Fahrgastinformation", description: "Echtzeit-Daten für Fahrgast-Apps und Anzeigesysteme" },
  ];

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h1>Elektrobusse</h1>
        <p>Vollständige Kontrolle über Ihre E-Bus Flotte</p>
      </div>

      <div className={styles.vehicleIntro}>
        <p>
          Die Elektrifizierung von Busflotten ist ein zentraler Baustein der urbanen Mobilitätswende.
          Mit unserer Plattform transformieren Sie Ihre Busflotte in ein intelligentes, vernetztes
          System, das nicht nur emissionsfrei, sondern auch wirtschaftlich effizient arbeitet.
        </p>
      </div>

      <div className={styles.featuresGrid}>
        {features.map((f, i) => (
          <VehicleFeature key={i} feature={f} />
        ))}
      </div>

      <div className={styles.technologySection}>
        <h2>Unsere Technologie im Einsatz</h2>

        <div className={styles.techCard}>
          <h3>Echtzeit-Monitoring</h3>
          <p>
            Verfolgen Sie jeden Bus Ihrer Flotte in Echtzeit – vom Ladezustand der Batterien bis zur
            aktuellen Auslastung. KI-basierte Algorithmen prognostizieren Reichweiten und identifizieren
            optimale Ladefenster.
          </p>
        </div>

        <div className={styles.techCard}>
          <h3>Integrierte Disposition</h3>
          <p>
            Automatisierte Einsatzplanung unter Berücksichtigung von Fahrplananforderungen,
            Fahrzeugverfügbarkeit und Ladeinfrastruktur-Kapazitäten. Reduzieren Sie Leerfahrten
            und maximieren Sie die Auslastung.
          </p>
        </div>

        <div className={styles.techCard}>
          <h3>Nachhaltigkeits-Reporting</h3>
          <p>
            Automatisierte Umweltberichte mit CO₂-Einsparungen und Energieverbrauchsdaten.
            Erfüllen Sie mühelos Berichtspflichten und kommunizieren Sie Ihre Erfolge.
          </p>
        </div>
      </div>

      <div className={styles.ctaSection}>
        <h2>Starten Sie mit Ihrer E-Bus Flotte durch</h2>
        <p>Vereinbaren Sie eine kostenlose Beratung mit unseren Mobilitätsexperten.</p>
        <Link to="/contact" className={styles.ctaButton}>
          Kontakt aufnehmen
        </Link>
      </div>
    </div>
  );
}

export default VehiclesBusPage;
