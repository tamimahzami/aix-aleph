import React from "react";
import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">404 – Not Found</h1>
      <Link to="/" className="text-cyan-600 underline">Zurück zur Startseite</Link>
    </div>
  );
}
