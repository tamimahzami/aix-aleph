import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/**
 * CookieBanner
 * - reagiert auf window.dispatchEvent(new Event("open-cookie-banner"))
 * - speichert Einstellungen in localStorage ("cookieSettings")
 */
export default function CookieBanner() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState({
    essential: true,
    analytics: false,
    marketing: false,
  });

  // load on mount
  useEffect(() => {
    const stored = localStorage.getItem("cookieSettings");
    if (stored) setSettings(JSON.parse(stored));
  }, []);

  // global event → öffnen
  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("open-cookie-banner", onOpen);
    // optional: global helper für ältere Stellen
    window.reopenCookieBanner = () => setOpen(true);
    return () => {
      window.removeEventListener("open-cookie-banner", onOpen);
      delete window.reopenCookieBanner;
    };
  }, []);

  const saveAndClose = () => {
    localStorage.setItem("cookieSettings", JSON.stringify(settings));
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-end md:items-center justify-center bg-black/50">
      <div className="w-full md:max-w-xl m-0 md:m-6 rounded-2xl panel p-0 overflow-hidden">
        <header className="px-4 py-3 border-b border-[var(--color-line)]">
          <h3 className="text-lg font-semibold">Cookie-Einstellungen</h3>
        </header>

        <div className="p-4 space-y-4 text-sm">
          <p className="text-muted">
            Wir nutzen Cookies, um die App zu verbessern. Du kannst die Kategorien unten anpassen
            oder später jederzeit über <Link to="/cookies" className="underline">/cookies</Link> ändern.
          </p>

          <div className="space-y-3">
            <LabelRow
              label="Essentiell"
              desc="Erforderlich für grundlegende Funktionen."
              checked
              disabled
              onChange={() => {}}
            />
            <LabelRow
              label="Analytics"
              desc="Anonyme Nutzungsstatistiken."
              checked={settings.analytics}
              onChange={() => setSettings(s => ({ ...s, analytics: !s.analytics }))}
            />
            <LabelRow
              label="Marketing"
              desc="Personalisierte Inhalte & Kampagnen."
              checked={settings.marketing}
              onChange={() => setSettings(s => ({ ...s, marketing: !s.marketing }))}
            />
          </div>
        </div>

        <div className="px-4 py-3 border-t border-[var(--color-line)] flex flex-col sm:flex-row gap-2 sm:justify-end">
          <button className="btn btn-ghost" onClick={() => setOpen(false)}>Abbrechen</button>
          <button
            className="btn btn-primary"
            onClick={saveAndClose}
          >
            Speichern
          </button>
        </div>
      </div>
    </div>
  );
}

function LabelRow({ label, desc, checked = false, disabled = false, onChange }) {
  return (
    <label className={`flex items-start justify-between gap-4 ${disabled ? "opacity-70" : ""}`}>
      <div>
        <div className="font-medium">{label}</div>
        <div className="text-[var(--color-ink-muted)]">{desc}</div>
      </div>
      <input
        type="checkbox"
        className="mt-1"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />
    </label>
  );
}
