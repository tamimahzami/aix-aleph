import React from "react";
export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16 text-center space-y-3">
      <h1 className="text-3xl font-extrabold">404 – Nicht gefunden</h1>
      <p className="text-muted">Die gesuchte Seite existiert (noch) nicht.</p>
      <a href="/" className="btn btn-primary">Zurück zur Startseite</a>
    </div>
  );
}
