import React from "react";
import PricingGrid from "../components/PricingGrid.jsx";

export default function Pricing() {
  return (
    <div className="space-y-8">
      <header className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Preise, die mitwachsen</h1>
        <p className="opacity-70">Starte kostenlos. Skalieren, wenn du bereit bist.</p>
      </header>
      <PricingGrid />
    </div>
  );
}
