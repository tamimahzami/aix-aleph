// src/pages/Demo.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  BatteryCharging,
  BatteryLow,
  PlugZap,
  Activity,
  AlertTriangle,
  MapPin,
  Clock,
  Download,
  UploadCloud,
} from "lucide-react";

/** Kleine Helpers für Farblogik usw. */
const socColor = (v) =>
  v >= 80 ? "text-green-400" : v >= 40 ? "text-yellow-300" : "text-pink-400";

export default function Demo() {
  // --- Mock KPIs (kannst du später per API füllen) ---
  const KPIS = {
    fleetSocAvg: 74,               // Durchschnittlicher SOC aller Fahrzeuge
    fleetAvailable: 42,            // Verfügbare Fahrzeuge
    fleetTotal: 50,                // Gesamtflotte
    depotLoad: 63,                 // % Last am Depot (Leistung/Slots)
    incidentsOpen: 2,              // Offene Störungen/Incidents
  };

  const availabilityPct = Math.round((KPIS.fleetAvailable / KPIS.fleetTotal) * 100);

  // --- CSV Download Snippets (Demo/Beispiele) ---
  const csvs = {
    fahrzeuge:
      "id,kennzeichen,typ,soc,status\n" +
      "BUS-001,B-AB1234,E-Bus,82,bereit\n" +
      "BUS-002,B-XY4567,E-Bus,56,in_wartung\n" +
      "BUS-003,B-CD7890,E-Van,71,bereit\n",
    personal:
      "id,name,rolle,qualifikation\n" +
      "P-1001,Max Müller,fahrer,klasse_d\n" +
      "P-1002,Sara Karim,dispatcher,leitstand\n",
    ladepunkte:
      "id,standort,max_kw,status\n" +
      "LP-01,Depot Nord,350,aktiv\n" +
      "LP-02,Depot Süd,150,wartung\n",
    linien:
      "linie,route_km,takt_min\n" +
      "M1,18.4,10\n" +
      "M2,26.1,12\n",
  };

  const dl = (name, content) => {
    const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Hero */}
      <header className="text-center space-y-3">
        <h1 className="text-3xl md:text-4xl font-extrabold">AIX Aleph – Demo</h1>
        <p className="text-muted">
          Ein schneller Überblick über Flotte, Energie & Orchestrierung – ohne Anmeldung.
        </p>
        <div className="mt-4 flex items-center justify-center gap-3">
          <Link className="btn btn-primary" to="/dashboard">
            Zur Voll-Demo (Login)
          </Link>
          <a className="btn btn-ghost" href="/pitch-deck/" target="_blank" rel="noopener noreferrer">
            Pitch&nbsp;Deck
          </a>
        </div>
      </header>

      {/* Mini-Dashboard KPIs */}
      <section aria-label="Fleet KPIs" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* SOC */}
        <div className="panel p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted">Ø SOC Flotte</span>
            <BatteryCharging className={`w-5 h-5 ${socColor(KPIS.fleetSocAvg)}`} />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <div className={`text-3xl font-extrabold ${socColor(KPIS.fleetSocAvg)}`}>
              {KPIS.fleetSocAvg}%
            </div>
            <span className="text-muted">geladen</span>
          </div>
          <p className="mt-2 text-xs text-muted">Live aus Telemetrie/Depot-Backlog gedacht.</p>
        </div>

        {/* Availability */}
        <div className="panel p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted">Verfügbarkeit</span>
            <Activity className="w-5 h-5 text-green-400" />
          </div>
          <div className="mt-2 text-3xl font-extrabold">
            {KPIS.fleetAvailable}/{KPIS.fleetTotal}
          </div>
          <p className="text-muted text-sm">{availabilityPct}% einsatzbereit</p>
        </div>

        {/* Depot Load */}
        <div className="panel p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted">Depotlast</span>
            <PlugZap className="w-5 h-5 text-yellow-300" />
          </div>
          <div className="mt-2 text-3xl font-extrabold">{KPIS.depotLoad}%</div>
          <p className="text-xs text-muted">Auslastung Ladefenster / Leistung.</p>
        </div>

        {/* Incidents */}
        <div className="panel p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted">Incidents</span>
            <AlertTriangle className={`w-5 h-5 ${KPIS.incidentsOpen ? "text-pink-400" : "text-green-400"}`} />
          </div>
          <div className="mt-2 text-3xl font-extrabold">{KPIS.incidentsOpen}</div>
          <p className="text-xs text-muted">
            Offen & priorisiert (z. B. Charger down, Fahrzeugfehler).
          </p>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="panel p-5">
        <div className="flex flex-wrap items-center gap-3">
          <button className="btn btn-primary" onClick={() => dl("fahrzeuge", csvs.fahrzeuge)}>
            <Download className="w-4 h-4 mr-2" /> Fahrzeuge.csv
          </button>
          <button className="btn btn-ghost" onClick={() => dl("personal", csvs.personal)}>
            <Download className="w-4 h-4 mr-2" /> Personal.csv
          </button>
          <button className="btn btn-ghost" onClick={() => dl("ladepunkte", csvs.ladepunkte)}>
            <Download className="w-4 h-4 mr-2" /> Ladepunkte.csv
          </button>
          <button className="btn btn-ghost" onClick={() => dl("linien", csvs.linien)}>
            <Download className="w-4 h-4 mr-2" /> Linien.csv
          </button>
        </div>
        <p className="mt-3 text-xs text-muted">
          CSVs als Beispiel-Schemas für Import/Sync. Später per API/ETL ersetzbar.
        </p>
      </section>

      {/* “Warum das zählt” – USP Cards */}
      <section>
        <h2 className="text-xl font-bold">Warum das zählt</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="panel p-5">
            <h3 className="font-semibold flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Dispatch wie aus einem Guss
            </h3>
            <p className="mt-2 text-muted">
              SOC-Fenster, Ladezeiten & Umläufe werden in Echtzeit balanciert – kosten-
              & emissionsoptimiert.
            </p>
          </div>
          <div className="panel p-5">
            <h3 className="font-semibold flex items-center gap-2">
              <BatteryLow className="w-4 h-4" /> Fleet Health & Maintenance
            </h3>
            <p className="mt-2 text-muted">
              Anomalien früh erkennen, prädiktiv warten, Ausfälle minimieren – auditierbar.
            </p>
          </div>
          <div className="panel p-5">
            <h3 className="font-semibold flex items-center gap-2">
              <Clock className="w-4 h-4" /> Operative Sicherheit
            </h3>
            <p className="mt-2 text-muted">
              Policy-gesteuert priorisieren: Peaks glätten, Grid-Mix nutzen, SLAs einhalten.
            </p>
          </div>
        </div>
      </section>

      {/* Einfaches Upload-Beispiel */}
      <section className="panel p-5">
        <h2 className="font-semibold">Schnelltest: CSV importieren</h2>
        <p className="text-sm text-muted">
          Wähle eine der oben geladenen CSVs aus (z. B. Fahrzeuge.csv) – wir zählen hier nur Zeilen:
        </p>
        <CSVCounter />
      </section>
    </div>
  );
}

/** Kleines Client-only CSV-Zeilen-Counter-Widget */
function CSVCounter() {
  const [lines, setLines] = React.useState(null);
  const [name, setName] = React.useState(null);
  const onFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const txt = await file.text();
    const count = txt.split(/\r?\n/).filter(Boolean).length - 1; // -1 für Header
    setLines(Math.max(count, 0));
    setName(file.name);
  };
  return (
    <div className="mt-3 flex flex-col sm:flex-row items-start sm:items-center gap-3">
      <label className="btn btn-ghost cursor-pointer">
        <UploadCloud className="w-4 h-4 mr-2" />
        CSV wählen
        <input type="file" accept=".csv,text/csv" className="hidden" onChange={onFile} />
      </label>
      {lines !== null && (
        <div className="text-sm">
          {name}: <b>{lines}</b> Datenzeilen erkannt.
        </div>
      )}
    </div>
  );
}
