// Vorlage: src/pages/SomePage.jsx
import React from "react";
import "../styles/page.css"; // optional

export default function SomePage() {
  return (
    <div className="page-container">
      <section className="page-hero">
        <h1>Seitentitel</h1>
        <p>Kurzbeschreibung der Seite.</p>
      </section>

      <section className="page-content card">
        <h2>Abschnitt</h2>
        <p>Inhalt …</p>
      </section>
    </div>
  );
}
