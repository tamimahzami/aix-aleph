import React from "react";
import MarketingLayout from "./MarketingLayout.jsx";

export default function Features() {
  return (
    <MarketingLayout>
      <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-6">
        {[
          ["Charging Strategy A/B", "Optimiere Ladefenster & Tarife."],
          ["Route Efficiency", "Wähle effiziente Strecken & Dwell-Times."],
          ["CO₂-Impact", "Messe echte Emissionsreduktion pro Arm."],
        ].map(([t, s]) => (
          <div key={t} className="bg-white rounded-xl border p-6">
            <div className="text-xl font-semibold">{t}</div>
            <div className="text-slate-600 mt-2">{s}</div>
          </div>
        ))}
      </div>
    </MarketingLayout>
  );
}
