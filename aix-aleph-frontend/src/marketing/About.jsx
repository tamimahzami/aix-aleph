import React from "react";
import MarketingLayout from "./MarketingLayout.jsx";

export default function About() {
  return (
    <MarketingLayout>
      <div className="max-w-3xl mx-auto px-4 py-12 text-slate-700">
        <h2 className="text-2xl font-semibold text-slate-900">Unsere Mission</h2>
        <p className="mt-3">E-Mobility messbar machen – mit Experimenten, die Entscheider überzeugen.</p>
      </div>
    </MarketingLayout>
  );
}
