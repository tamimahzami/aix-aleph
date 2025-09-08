import React from "react";

export default function Kontakt() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10 space-y-6">
      <h1 className="text-3xl font-extrabold">Kontakt</h1>
      <p>Schreib uns jederzeit: <a href="mailto:info@aix-aleph.com" className="text-[var(--color-primary)]">info@aix-aleph.com</a></p>
      <form className="panel p-4 space-y-3">
        <div>
          <label className="block text-sm mb-1">E-Mail</label>
          <input type="email" className="w-full rounded-md bg-[var(--color-bg)] border border-[var(--color-line)] px-3 py-2" placeholder="you@example.com" />
        </div>
        <div>
          <label className="block text-sm mb-1">Nachricht</label>
          <textarea className="w-full rounded-md bg-[var(--color-bg)] border border-[var(--color-line)] px-3 py-2" rows="5" placeholder="Wie können wir helfen?" />
        </div>
        <button type="button" className="btn btn-primary">Senden</button>
      </form>
    </div>
  );
}
