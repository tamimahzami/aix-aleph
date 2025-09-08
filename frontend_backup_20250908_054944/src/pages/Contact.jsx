import React from "react";

export default function Contact() {
  return (
    <main className="max-w-[800px] mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-4xl font-extrabold">Kontakt</h1>
      <p className="mt-4 text-muted">Fragen, Partnerschaft, Pilot? Schreib uns.</p>
      <div className="panel p-6 mt-6">
        <form className="space-y-4">
          <div>
            <label className="text-sm text-muted">E-Mail</label>
            <input className="w-full mt-1 rounded-lg bg-surface-2 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" type="email" placeholder="you@company.com" />
          </div>
          <div>
            <label className="text-sm text-muted">Nachricht</label>
            <textarea className="w-full mt-1 rounded-lg bg-surface-2 px-3 py-2 h-32 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" placeholder="Wie können wir helfen?" />
          </div>
          <button type="button" className="btn btn-primary">Senden</button>
        </form>
      </div>
    </main>
  );
}
