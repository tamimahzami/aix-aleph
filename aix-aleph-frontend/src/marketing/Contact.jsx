import React from "react";
import MarketingLayout from "./MarketingLayout.jsx";

export default function Contact() {
  return (
    <MarketingLayout>
      <div className="max-w-xl mx-auto px-4 py-12">
        <form className="bg-white rounded-xl border p-6 grid gap-3">
          <label className="grid gap-1">
            <span className="text-xs text-slate-500">Name</span>
            <input className="px-3 py-2 rounded border" placeholder="Max Mustermann"/>
          </label>
          <label className="grid gap-1">
            <span className="text-xs text-slate-500">E-Mail</span>
            <input type="email" className="px-3 py-2 rounded border" placeholder="max@firma.de"/>
          </label>
          <label className="grid gap-1">
            <span className="text-xs text-slate-500">Nachricht</span>
            <textarea rows={4} className="px-3 py-2 rounded border" placeholder="Wie können wir helfen?"/>
          </label>
          <button type="button" className="mt-2 px-4 py-2 rounded bg-brand text-white hover:bg-brand-dark">
            Senden
          </button>
        </form>
      </div>
    </MarketingLayout>
  );
}
