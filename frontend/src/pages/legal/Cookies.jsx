import React, { useState, useEffect } from "react";

export default function Cookies() {
  const [settings, setSettings] = useState({
    essential: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem("cookieSettings");
      if (stored) setSettings(JSON.parse(stored));
    } catch {}
  }, []);

  const toggle = (key) => {
    const next = { ...settings, [key]: !settings[key] };
    setSettings(next);
    try { localStorage.setItem("cookieSettings", JSON.stringify(next)); } catch {}
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6">
      <h1 className="text-3xl font-extrabold mb-6">Cookie-Einstellungen</h1>
      <p className="text-muted mb-8">Hier kannst du deine Einwilligungen verwalten.</p>

      <ul className="space-y-4">
        <li className="flex items-center justify-between">
          <span className="font-medium">Essentielle Cookies</span>
          <input type="checkbox" checked readOnly className="cursor-not-allowed" />
        </li>
        <li className="flex items-center justify-between">
          <span>Analyse-Cookies</span>
          <input type="checkbox" checked={settings.analytics} onChange={() => toggle("analytics")} />
        </li>
        <li className="flex items-center justify-between">
          <span>Marketing-Cookies</span>
          <input type="checkbox" checked={settings.marketing} onChange={() => toggle("marketing")} />
        </li>
      </ul>

      <p className="mt-8 text-sm text-muted">
        Änderungen werden lokal gespeichert. Du kannst sie jederzeit hier oder über den Link im Footer anpassen.
      </p>
    </div>
  );
}
