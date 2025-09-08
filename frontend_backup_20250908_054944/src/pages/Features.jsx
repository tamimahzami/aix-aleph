import React from "react";

export default function Features() {
  const feats = [
    { t: "Smart Charging", d: "Dynamische Lastverteilung, Kosten-Optimierung und CO₂-Ziele." },
    { t: "Fleet Ops", d: "Uptime, Routen, Energiebedarf – alles in einem Cockpit." },
    { t: "Agenten", d: "Automatisierungen für Buchungen, Alarme, Eskalationen." },
    { t: "Open API", d: "Sichere REST/WS-Schnittstellen für Partner und Integrationen." },
  ];
  return (
    <main className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-4xl font-extrabold">Funktionen</h1>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {feats.map((f) => (
          <div key={f.t} className="panel p-6">
            <h2 className="text-xl font-bold">{f.t}</h2>
            <p className="mt-2 text-muted">{f.d}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
