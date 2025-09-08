import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <h1 style={{ marginBottom: 8 }}>Seite nicht gefunden</h1>
      <p><Link to="/">Zurück zur Startseite</Link></p>
    </>
  );
}
