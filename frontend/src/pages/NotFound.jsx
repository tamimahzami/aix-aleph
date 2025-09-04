import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center text-center p-6">
      <div>
        <h1 className="text-3xl font-extrabold">404</h1>
        <p className="text-muted mt-2">Seite nicht gefunden.</p>
        <Link to="/" className="btn btn-primary mt-6 inline-flex">Zur Startseite</Link>
      </div>
    </div>
  );
}
