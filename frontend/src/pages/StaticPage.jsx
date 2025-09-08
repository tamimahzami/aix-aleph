import React from "react";
import { useParams } from "react-router-dom";
import SimplePage from "./_SimplePage.jsx";
export default function StaticPage() {
  const { slug } = useParams();
  return (
    <SimplePage title={`Seite: ${slug}`} lead="Statische Informationsseite">
      <p className="text-sm text-muted">Hier kommt dein redaktioneller Inhalt für „{slug}“ hin.</p>
    </SimplePage>
  );
}
