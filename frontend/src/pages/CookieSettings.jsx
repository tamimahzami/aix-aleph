// frontend/src/pages/CookieSettings.jsx
import { useState } from "react";

export default function CookieSettings() {
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [saved, setSaved] = useState(false);

  const save = () => {
    // Placeholder: hier später echtes Consent-Tool/Storage integrieren
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <main className="aix-cookie-settings max-w-xl mx-auto py-20 px-6 text-gray-100">
      <h1 className="text-3xl font-bold mb-6">Cookie-Einstellungen</h1>

      <div className="space-y-4">
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            className="h-5 w-5"
            checked
            disabled
            aria-checked="true"
            aria-label="Essenzielle Cookies (immer aktiv)"
          />
          <span>Essenzielle Cookies (immer aktiv)</span>
        </label>

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            className="h-5 w-5"
            checked={analytics}
            onChange={(e) => setAnalytics(e.target.checked)}
            aria-label="Analyse-Cookies"
          />
          <span>Analyse-Cookies</span>
        </label>

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            className="h-5 w-5"
            checked={marketing}
            onChange={(e) => setMarketing(e.target.checked)}
            aria-label="Marketing-Cookies"
          />
          <span>Marketing-Cookies</span>
        </label>

        <button
          onClick={save}
          className="mt-6 w-full rounded-xl py-3 bg-white/10 hover:bg-white/20 transition"
        >
          Speichern
        </button>

        {saved && (
          <p className="mt-4 text-green-400 text-sm text-center">
            Cookie-Einstellungen gespeichert.
          </p>
        )}
      </div>
    </main>
  );
}
