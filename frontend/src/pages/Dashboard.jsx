// src/pages/Dashboard.jsx
import React from "react";
import { useAuth } from "../auth/AuthContext.jsx";
import HealthBadge from "../components/common/HealthBadge";
import WorldMap from "../components/WorldMap";
import LeadList from "../components/leads/LeadList";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-ink)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-extrabold">Dashboard</h1>
          <HealthBadge status="healthy" />
        </div>
        <p className="text-muted mt-2">
          Eingeloggt als <b>{user?.email}</b>
          {user?.role ? ` (${user.role})` : ""}
        </p>

        {/* KPI-Kacheln */}
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <div className="panel p-6">
            <h3 className="text-sm text-muted">Laufende Experimente</h3>
            <div className="mt-2 text-3xl font-extrabold">3</div>
          </div>
          <div className="panel p-6">
            <h3 className="text-sm text-muted">Neue Leads (7 Tage)</h3>
            <div className="mt-2 text-3xl font-extrabold">12</div>
          </div>
          <div className="panel p-6">
            <h3 className="text-sm text-muted">Verbundene Professoren</h3>
            <div className="mt-2 text-3xl font-extrabold">5</div>
          </div>
        </div>

        {/* Weltkarte */}
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-3">Globale Übersicht</h2>
          <WorldMap />
        </div>

        {/* Leads */}
        <div className="mt-10">
          <LeadList />
        </div>
      </div>
    </div>
  );
}
