import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] grid place-items-center text-center px-6">
      <div>
        <h1 className="text-4xl font-extrabold">404 – Nicht gefunden</h1>
        <p className="mt-2 text-muted">
          Die angeforderte Seite existiert nicht oder wurde verschoben.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="px-4 py-2 rounded-md bg-[var(--color-primary)] text-white hover:opacity-90"
          >
            Zur Startseite
          </Link>
        </div>
      </div>
    </div>
  );
}
