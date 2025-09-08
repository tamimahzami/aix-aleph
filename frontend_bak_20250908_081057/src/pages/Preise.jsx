import React from "react";

export default function Pricing() {
  const plans = [
    { name: "Starter", price: "€0", desc: "Für Piloten & Tests", features: ["10 Ladepunkte", "1 Depot", "Basis-Support"] },
    { name: "Pro", price: "€249/Monat", desc: "Für wachsende Flotten", features: ["100 Ladepunkte", "Mehrere Depots", "SLA Support"] },
    { name: "Enterprise", price: "Kontakt", desc: "Globaler Rollout", features: [">100 Ladepunkte", "SOCs & SSO", "24/7 Support"] },
  ];
  return (
    <main className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-4xl font-extrabold">Preise</h1>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {plans.map((p) => (
          <div key={p.name} className="panel p-6">
            <h2 className="text-2xl font-bold">{p.name}</h2>
            <div className="mt-2 text-3xl font-extrabold">{p.price}</div>
            <p className="mt-2 text-muted">{p.desc}</p>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              {p.features.map((f) => <li key={f}>• {f}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}
