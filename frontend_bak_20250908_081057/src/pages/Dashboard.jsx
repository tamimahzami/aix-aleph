import React, { useCallback, useState } from "react";
import { useAuth } from "../auth/AuthContext.jsx";
import { useApi } from "../hooks/useApi.js";
import { api } from "../lib/api.js";

import LegalHealthProbe from "../components/debug/LegalHealthProbe.jsx";
import HealthBadge from "../components/common/HealthBadge.jsx";
import WorldMap from "../components/WorldMap.jsx";
import LeadList from "../components/leads/LeadList.jsx";

export default function Dashboard() {
  const { user } = useAuth();

  // Sichtbarkeit-Layer für die Karte
  const [visible, setVisible] = useState({
    drones: true,
    chargers: true,
    depots: true,
    incidents: true,
  });

  // Funktion zum Umschalten der Sichtbarkeit
  const toggle = (key) => setVisible((prev) => ({ ...prev, [key]: !prev[key] }));

  // Stabile Fetcher (useCallback)
  const fetchExperiments = useCallback(
    () =>
      api.listExperiments().then((res) => ({
        count: Array.isArray(res) ? res.length : 3,
      })),
    []
  );

  const fetchLeads = useCallback(
    () =>
      api.listLeads().then((res) => ({
        count: Array.isArray(res) ? res.length : 12,
      })),
    []
  );

  const fetchProfessors = useCallback(
    () => Promise.resolve({ count: 5 }), // Platzhalter
    []
  );

  // Generischer Hook
  const { data: experiments, loading: expLoading, error: expErr } = useApi(fetchExperiments);
  const { data: leads, loading: leadsLoading, error: leadsErr } = useApi(fetchLeads);
  const { data: profs, loading: profsLoading, error: profsErr } = useApi(fetchProfessors);

  const status = "healthy";

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-ink)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-extrabold">Dashboard</h1>
          <HealthBadge status={status} />
        </div>
        <p className="text-muted mt-2">
          Eingeloggt als <b>{user?.email}</b>
          {user?.role ? ` (${user.role})` : ""}
        </p>

        {/* KPI-Kacheln mit dynamischen Daten und Fehlerbehandlung */}
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <div className="panel p-6">
            <h3 className="text-sm text-muted">Laufende Experimente</h3>
            <div className="mt-2 text-3xl font-extrabold">
              {expLoading ? (
                "…"
              ) : expErr ? (
                <span className="text-pink-500 text-sm">⚠ Fehler</span>
              ) : (
                experiments?.count
              )}
            </div>
          </div>
          <div className="panel p-6">
            <h3 className="text-sm text-muted">Neue Leads (7 Tage)</h3>
            <div className="mt-2 text-3xl font-extrabold">
              {leadsLoading ? (
                "…"
              ) : leadsErr ? (
                <span className="text-pink-500 text-sm">⚠ Fehler</span>
              ) : (
                leads?.count
              )}
            </div>
          </div>
          <div className="panel p-6">
            <h3 className="text-sm text-muted">Verbundene Professoren</h3>
            <div className="mt-2 text-3xl font-extrabold">
              {profsLoading ? (
                "…"
              ) : profsErr ? (
                <span className="text-pink-500 text-sm">⚠ Fehler</span>
              ) : (
                profs?.count
              )}
            </div>
          </div>
        </div>

        {/* Weltkarte */}
        <div className="mt-10">
          <div className="flex gap-3 mb-4 flex-wrap">
            {Object.keys(visible).map((k) => (
              <button
                key={k}
                className={`px-3 py-2 rounded-md transition-colors duration-200 ${visible[k] ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                onClick={() => toggle(k)}
              >
                {visible[k] ? '✓' : '✗'} {k.charAt(0).toUpperCase() + k.slice(1)}
              </button>
            ))}
          </div>
          <WorldMap
            center={[52.52, 13.405]}
            zoom={4}
            height="440px"
            visible={visible}
          />
        </div>

        {/* Leads */}
        <div className="mt-10">
          <LeadList />
        </div>

        {/* Debug */}
        <div className="mt-10">
          <details className="panel p-4 rounded-xl bg-surface">
            <summary className="cursor-pointer font-semibold">
              Backend-Health (legal-pdf)
            </summary>
            <div className="mt-3">
              <LegalHealthProbe />
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}

