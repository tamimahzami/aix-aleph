import React from "react";
import { Button } from "./Buttons.jsx";

const PLANS = [
  { name: "Starter",  mo: 0,   yr: 0,   desc: "Für den Einstieg", features: ["1 Projekt", "Basic Analytics", "Community Support"] },
  { name: "Pro",      mo: 29,  yr: 290, desc: "Für Teams",        features: ["Unlim. Projekte", "A/B Experimente", "Priority Support"] },
  { name: "Scale",    mo: 99,  yr: 990, desc: "Für Wachstum",     features: ["Feature Flags", "Metrics API", "SLA & SSO"] },
];

export default function PricingGrid() {
  const [yearly, setYearly] = React.useState(true);
  return (
    <section className="space-y-8">
      <div className="flex items-center justify-center gap-2">
        <span className={!yearly ? "opacity-100" : "opacity-60"}>Monatlich</span>
        <label className="relative inline-flex cursor-pointer items-center">
          <input type="checkbox" className="sr-only peer" checked={yearly} onChange={e => setYearly(e.target.checked)} />
          <div className="w-14 h-8 bg-white/50 dark:bg-white/10 rounded-full peer peer-checked:bg-brand-500/40 transition" />
          <div className="absolute left-1 top-1 w-6 h-6 rounded-full bg-white dark:bg-slate-200 peer-checked:translate-x-6 transition" />
        </label>
        <span className={yearly ? "opacity-100" : "opacity-60"}>Jährlich <span className="text-xs opacity-70">(2 Monate gratis)</span></span>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {PLANS.map((p, i) => {
          const price = yearly ? p.yr : p.mo;
          const per = yearly ? "/Jahr" : "/Monat";
          const popular = p.name === "Pro";
          return (
            <div key={p.name} className={`glass p-6 ${popular ? "ring-2 ring-brand-500" : ""}`}>
              <div className="flex items-baseline justify-between">
                <h3 className="text-lg font-semibold">{p.name}</h3>
                {popular && <span className="text-[10px] px-2 py-1 rounded-full bg-brand-500 text-white">Beliebt</span>}
              </div>
              <p className="opacity-70 mt-1">{p.desc}</p>
              <div className="mt-4">
                <span className="text-3xl font-bold tracking-tight">€ {price}</span>
                <span className="opacity-60 ml-1">{per}</span>
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                {p.features.map(f => <li key={f} className="flex items-center gap-2"><span>✓</span><span>{f}</span></li>)}
              </ul>
              <div className="mt-6">
                <Button className="w-full">{p.name === "Starter" ? "Kostenlos starten" : "Jetzt wählen"}</Button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
