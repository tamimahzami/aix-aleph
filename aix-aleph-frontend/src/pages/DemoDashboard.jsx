// src/pages/DemoDashboard.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../lib/api";
import Card from "../components/Card";

export default function DemoDashboard() {
  const [health, setHealth] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    let mounted = true;
    api
      .health()
      .then((h) => mounted && setHealth(h))
      .catch((e) => setErr(e?.message || String(e)));
    return () => { mounted = false; };
  }, []);

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="rounded-2xl border p-6 bg-gradient-to-br from-cyan-50 via-white to-violet-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full blur-3xl opacity-40 bg-cyan-300/40 dark:bg-cyan-600/20" />
        <h1 className="text-2xl md:text-3xl font-bold">Live Demo: Dashboard</h1>
        <p className="text-slate-600 dark:text-slate-300 mt-2 max-w-2xl">
          Schau dir an, wie AIX Aleph Mobility Experimente, KPIs und Health-Status visualisiert – ganz ohne Login.
        </p>
        <div className="mt-4 flex gap-3">
          <Link
            to="/register"
            className="rounded-xl bg-cyan-600 text-white px-4 py-2.5 text-sm font-medium hover:bg-cyan-700 transition"
          >
            Kostenlos starten
          </Link>
          <Link
            to="/login"
            className="rounded-xl border px-4 py-2.5 text-sm font-medium hover:bg-white/70 dark:hover:bg-white/10 transition"
          >
            Ich habe bereits ein Konto
          </Link>
        </div>
      </div>

      {/* Health */}
      <Card title="Systemstatus (Demo)" subtitle="Unprotected /api/health">
        {err && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            Health-Check fehlgeschlagen: {err}
          </div>
        )}
        <pre className="whitespace-pre-wrap text-xs opacity-80">
          {health ? JSON.stringify(health, null, 2) : "Lade Health…"}
        </pre>
      </Card>

      {/* KPI-Grid (Mock) */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card title="Experiments (Demo)" subtitle="Aktiv">
          <p className="text-3xl font-semibold">7</p>
          <p className="text-xs text-slate-500 mt-1">Beispielwerte – für Live-Daten bitte anmelden.</p>
        </Card>

        <Card title="Revenue Impact (Demo)" subtitle="Letzte 7 Tage">
          <p className="text-3xl font-semibold">+12.4%</p>
          <p className="text-xs text-slate-500 mt-1">Aggregiert aus Beispiel-Kampagnen.</p>
        </Card>

        <Card title="CTR (Demo)" subtitle="Median">
          <p className="text-3xl font-semibold">38.7%</p>
          <p className="text-xs text-slate-500 mt-1">Ermittelt aus Demo-Varianten A/B/C.</p>
        </Card>
      </div>

      {/* Teaser zu echten Features */}
      <Card
        title="Noch mehr sehen?"
        subtitle="Experiments & Dashboard sind im Konto freigeschaltet"
        className="hover:shadow-glow transition"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-slate-600 dark:text-slate-300">
            Guarded Routes schützen die echten Daten. Lege ein Konto an und starte eigene Experimente in Minuten.
          </p>
          <div className="flex gap-3">
            <Link
              to="/experiments"
              className="rounded-xl border px-4 py-2.5 text-sm font-medium hover:bg-white/70 dark:hover:bg-white/10 transition"
            >
              Experiments (geschützt)
            </Link>
            <Link
              to="/register"
              className="rounded-xl bg-cyan-600 text-white px-4 py-2.5 text-sm font-medium hover:bg-cyan-700 transition"
            >
              Konto erstellen
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
