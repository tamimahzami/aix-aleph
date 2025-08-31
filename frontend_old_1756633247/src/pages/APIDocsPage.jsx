// src/pages/APIDocsPage.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Page.module.css";
import CodeSnippet from "../components/CodeSnippet";

function APIDocsPage() {
  const [activeTab, setActiveTab] = useState("authentication");

  const codeSamples = {
    authentication: `curl -X POST https://api.aix-aleph.com/v1/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{
    "api_key": "IHR_API_SCHLÜSSEL",
    "secret": "IHR_GEHEIMES_TOKEN"
  }'`,
    vehicles: `curl -X GET https://api.aix-aleph.com/v1/fleet/vehicles \\
  -H "Authorization: Bearer <IHR_ACCESS_TOKEN>"

# Antwort
{
  "data": [
    {
      "id": "bus-231",
      "type": "electric_bus",
      "status": "active",
      "battery_level": 87,
      "last_charge": "2024-05-18T08:23:15Z",
      "next_maintenance": "2024-07-12"
    }
  ]
}`,
    telemetry: `curl -X GET https://api.aix-aleph.com/v1/telemetry/bus-231 \\
  -H "Authorization: Bearer <IHR_ACCESS_TOKEN>"

# Antwort
{
  "vehicle_id": "bus-231",
  "timestamp": "2024-05-18T14:30:00Z",
  "location": { "lat": 50.110924, "lng": 8.682127 },
  "battery": { "level": 76, "health": 98.2, "temperature": 32.4 },
  "odometer": 12432.7,
  "passenger_count": 42
}`
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h1>API-Dokumentation</h1>
        <p>Integrationen für Entwickler und Partner</p>
      </div>

      <div className={styles.apiIntro}>
        <p>
          Die AIX ALEPH Mobility API ermöglicht die nahtlose Integration unserer Mobilitätsplattform
          in Ihre bestehenden Systeme. Nutzen Sie unsere Endpoints, um Fahrzeugdaten abzurufen,
          Flotten zu steuern und Analysen durchzuführen.
        </p>

        <div className={styles.apiFeatures}>
          <div className={styles.featureCard}>
            <h3>RESTful API</h3>
            <p>Modernes REST-Design mit JSON-Schnittstellen</p>
          </div>
          <div className={styles.featureCard}>
            <h3>OAuth 2.0</h3>
            <p>Sichere Authentifizierung nach Industriestandard</p>
          </div>
          <div className={styles.featureCard}>
            <h3>Webhooks</h3>
            <p>Echtzeit-Ereignisbenachrichtigungen</p>
          </div>
          <div className={styles.featureCard}>
            <h3>SDKs</h3>
            <p>Clients für Python, Java und JavaScript</p>
          </div>
        </div>
      </div>

      <div className={styles.apiTabs} role="tablist" aria-label="API Bereiche">
        <button
          role="tab"
          aria-selected={activeTab === "authentication"}
          className={`${styles.tabButton} ${activeTab === "authentication" ? styles.active : ""}`}
          onClick={() => setActiveTab("authentication")}
        >
          Authentifizierung
        </button>
        <button
          role="tab"
          aria-selected={activeTab === "vehicles"}
          className={`${styles.tabButton} ${activeTab === "vehicles" ? styles.active : ""}`}
          onClick={() => setActiveTab("vehicles")}
        >
          Fahrzeuge
        </button>
        <button
          role="tab"
          aria-selected={activeTab === "telemetry"}
          className={`${styles.tabButton} ${activeTab === "telemetry" ? styles.active : ""}`}
          onClick={() => setActiveTab("telemetry")}
        >
          Telemetrie
        </button>
        <button
          role="tab"
          aria-selected={activeTab === "analytics"}
          className={`${styles.tabButton} ${activeTab === "analytics" ? styles.active : ""}`}
          onClick={() => setActiveTab("analytics")}
        >
          Analysen
        </button>
      </div>

      <div className={styles.apiContent}>
        {activeTab === "authentication" && (
          <>
            <h2>Authentifizierung</h2>
            <p>
              Generieren Sie API-Schlüssel im Partnerportal. Senden Sie anschließend Anfragen
              mit <code>Authorization: Bearer &lt;Access&nbsp;Token&gt;</code>.
            </p>
            <CodeSnippet code={codeSamples.authentication} language="bash" />
          </>
        )}

        {activeTab === "vehicles" && (
          <>
            <h2>Fahrzeugverwaltung</h2>
            <p>Listen, filtern und steuern Sie Flottenfahrzeuge über standardisierte Endpoints.</p>
            <CodeSnippet code={codeSamples.vehicles} language="bash" />
          </>
        )}

        {activeTab === "telemetry" && (
          <>
            <h2>Telemetrie</h2>
            <p>Echtzeitdaten zu Position, Akku, Auslastung und mehr – für präzise Operationen.</p>
            <CodeSnippet code={codeSamples.telemetry} language="bash" />
          </>
        )}

        {activeTab === "analytics" && (
          <>
            <h2>Analysen</h2>
            <p>
              Aggregierte KPIs, Berichte und Exporte (CSV/JSON) – Endpoints analog zu <em>vehicles</em> &amp;{" "}
              <em>telemetry</em>. (Detailseite folgt.)
            </p>
          </>
        )}
      </div>

      <div className={styles.apiCta}>
        <h2>Starten Sie mit der Integration</h2>
        <p>
          Registrieren Sie sich als Entwicklungspartner und erhalten Sie vollen Zugriff auf die API-Doku
          und die Sandbox.
        </p>
        <div className={styles.ctaButtons}>
          <Link to="/register" className={styles.primaryButton}>Partner werden</Link>
          <Link to="/contact" className={styles.secondaryButton}>API-Support kontaktieren</Link>
        </div>
      </div>
    </div>
  );
}

export default APIDocsPage;
