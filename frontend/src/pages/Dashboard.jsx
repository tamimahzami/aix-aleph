import React, { useEffect, useState, useMemo } from "react";
import { useAuth } from "../auth/AuthContext";
import HealthBadge from "../components/common/HealthBadge.jsx"; // Korrigierter Import
import Spinner from "../components/common/Spinner.jsx";
import WorldMap from "../components/WorldMap";
import { api } from "../lib/api";

export default function Dashboard() {
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [kpi, setKpi] = useState({
    experiments: 0,
    leads7d: 0,
    professors: 0, // Placeholder – später echte API
  });

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        setErr("");

        // Experimente
        const exp = await api.listExperiments().catch(() => ({ items: [] }));
        const experiments = Array.isArray(exp?.items) ? exp.items.length : 0;

        // Leads (optional: später per ?from= / ?days=7 filtern)
        const leads = await api.listLeads().catch(() => ({ items: [] }));
        const leads7d = Array.isArray(leads?.items) ? leads.items.length : 0;

        if (!alive) return;
        setKpi({ experiments, leads7d, professors: 5 }); // professors: Demo
      } catch (e) {
        if (!alive) return;
        setErr(e?.message || "Fehler beim Laden der KPIs");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  const demoPoints = useMemo(
    () => ([
      { id: "berlin", name: "Depot Berlin", pos: [52.52, 13.405] },
      { id: "paris", name: "Charger Paris", pos: [48.8566, 2.3522] },
      { id: "singapore", name: "Hub Singapore", pos: [1.3521, 103.8198] },
    ]),
    []
  );

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-ink)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
        {/* Headerzeile */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-extrabold">Dashboard</h1>
          <HealthBadge /> {/* Korrigierte Komponente */}
        </div>
        <p className="text-muted mt-2">
          Eingeloggt als <b>{user?.email}</b>
          {user?.role ? ` (${user.role})` : ""}
        </p>

        {/* Lade-/Fehlerzustand */}
        {loading && (
          <div className="mt-6">
            <Spinner label="KPIs werden geladen…" />
          </div>
        )}
        {err && !loading && (
          <div className="mt-6 text-sm text-red-400">
            {err}
          </div>
        )}

        {/* KPI-Kacheln */}
        {!loading && !err && (
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div className="panel p-6">
              <h3 className="text-sm text-muted">Laufende Experimente</h3>
              <div className="mt-2 text-3xl font-extrabold">{kpi.experiments}</div>
            </div>
            <div className="panel p-6">
              <h3 className="text-sm text-muted">Neue Leads (gesamt / Demo)</h3>
              <div className="mt-2 text-3xl font-extrabold">{kpi.leads7d}</div>
            </div>
            <div className="panel p-6">
              <h3 className="text-sm text-muted">Verbundene Professoren</h3>
              <div className="mt-2 text-3xl font-extrabold">{kpi.professors}</div>
            </div>
          </div>
        )}

        {/* Weltkarte */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-3">Globale Übersicht</h2>
          <WorldMap center={[20, 0]} zoom={2} height="420px" points={demoPoints} />
        </div>
      </div>
    </div>
  );
}

