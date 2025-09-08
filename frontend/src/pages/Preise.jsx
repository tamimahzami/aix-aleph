import React from "react";
import SimplePage from "./_SimplePage.jsx";
export default function Preise() {
  return (
    <SimplePage title="Preise" lead="Klar & skalierbar – Starter, Pro, Enterprise.">
      <ul className="list-disc pl-5 space-y-1 text-sm">
        <li>Starter – für Pilotierung</li>
        <li>Pro – produktive Flotten</li>
        <li>Enterprise – individuelle SLAs & On-Prem</li>
      </ul>
    </SimplePage>
  );
}
