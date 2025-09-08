import React from "react";

const KEY = "aix_cookie_consent_v1";

export default function CookieConsent() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    try {
      const v = localStorage.getItem(KEY);
      if (!v) setOpen(true);
    } catch {
      setOpen(true);
    }
  }, []);

  if (!open) return null;

  function acceptAll() {
    localStorage.setItem(KEY, JSON.stringify({ essential: true, analytics: true, marketing: true, ts: Date.now() }));
    setOpen(false);
  }
  function acceptEssential() {
    localStorage.setItem(KEY, JSON.stringify({ essential: true, analytics: false, marketing: false, ts: Date.now() }));
    setOpen(false);
  }

  return (
    <div
      role="dialog"
      aria-live="polite"
      className="fixed inset-x-0 bottom-0 z-[1100] mx-auto max-w-3xl p-3"
    >
      <div className="rounded-2xl border border-white/10 bg-[var(--color-surface)] px-4 py-3 shadow-xl">
        <div className="md:flex md:items-center md:justify-between gap-4">
          <p className="text-sm text-white/80">
            Wir verwenden Cookies für essentielle Funktionen und – mit deiner Zustimmung – für Analyse & Performance.
            Details findest du in unserer{" "}
            <a className="underline hover:opacity-80" href="/datenschutz">Datenschutzerklärung</a> und den{" "}
            <a className="underline hover:opacity-80" href="/cookie-settings">Cookie-Einstellungen</a>.
          </p>
          <div className="mt-3 md:mt-0 flex shrink-0 gap-2">
            <button
              onClick={acceptEssential}
              className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
            >
              Nur Essenziell
            </button>
            <button
              onClick={acceptAll}
              className="rounded-xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:opacity-90"
            >
              Akzeptieren
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
