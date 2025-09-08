import React from "react";
import { HealthBadge } from "../components/common/HealthBadge";

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 space-y-6">
      <h2 className="text-2xl font-bold">Settings</h2>
      <p className="text-muted">Projektweite Einstellungen & Integrationen.</p>
      <div className="panel p-4 flex items-center justify-between">
        <div>
          <div className="font-semibold">Backend Health</div>
          <div className="text-muted text-sm">Status des API-Dienstes</div>
        </div>
        <HealthBadge />
      </div>
    </div>
  );
}
