// src/pages/company/Kontakt.jsx
import { useState } from "react";

export default function Kontakt() {
  const [sent, setSent] = useState(false);

  function onSubmit(e) {
    e.preventDefault();
    // TODO: später API-Aufruf integrieren
    setSent(true);
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-6">
      <header>
        <h1 className="text-3xl font-extrabold">Kontakt</h1>
        <p className="mt-2 text-muted text-sm">
          Wir freuen uns auf Ihre Nachricht. Füllen Sie einfach das Formular aus, 
          und unser Team meldet sich schnellstmöglich zurück.
        </p>
      </header>

      <div className="card p-6">
        {sent ? (
          <div className="text-green-600 font-medium">
            ✅ Vielen Dank! Ihre Nachricht wurde gesendet.
          </div>
        ) : (
          <form onSubmit={onSubmit} className="grid gap-4">
            <label className="grid gap-1">
              <span className="text-sm font-medium">Name</span>
              <input
                type="text"
                required
                className="rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            </label>

            <label className="grid gap-1">
              <span className="text-sm font-medium">E-Mail</span>
              <input
                type="email"
                required
                className="rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            </label>

            <label className="grid gap-1">
              <span className="text-sm font-medium">Nachricht</span>
              <textarea
                rows="5"
                required
                className="rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            </label>

            <button type="submit" className="btn btn-primary w-fit">
              Nachricht senden
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
