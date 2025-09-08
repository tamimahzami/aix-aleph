// src/components/KPI/LiveKPITicker.jsx
import React from "react";
import useAnimatedNumber from "../../hooks/useAnimatedNumber.js";

/**
 * Props (optional):
 * - beatMs: synced heartbeat (default 1800)
 * - seed: base values to display initially
 */
export default function LiveKPITicker({ beatMs = 1800, seed }) {
  const [tick, setTick] = React.useState(0);

  // simple beat tick (sync mit Heartbeat)
  React.useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), beatMs);
    return () => clearInterval(id);
  }, [beatMs]);

  // Mock: leichte Drift pro Beat (später echte Live-Daten hier einspeisen)
  const model = React.useMemo(() => {
    const base = seed || {
      uptime: 99.97,   // %
      tco2: 124.3,     // Tonnen eingespart
      cost: 2.84,      // €/100 km
    };
    // mini random walk
    const r = (min, max) => Math.random() * (max - min) + min;
    return {
      uptime: Math.max(98.5, base.uptime + r(-0.02, 0.02)),
      tco2: Math.max(0, base.tco2 + r(0.1, 0.6)),
      cost: Math.max(1.2, base.cost + r(-0.03, 0.03)),
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick]);

  const uptime = useAnimatedNumber({ from: 99.9, to: model.uptime, durationMs: 800 });
  const tco2   = useAnimatedNumber({ from: 120,  to: model.tco2,   durationMs: 800 });
  const cost   = useAnimatedNumber({ from: 3.1,  to: model.cost,   durationMs: 800 });

  return (
    <div
      className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3"
      aria-label="Live KPIs: Uptime, CO₂-Einsparungen und Kosten"
    >
      <KPICard
        label="Uptime"
        value={`${uptime.toFixed(2)}%`}
        hint="letzte 24h"
      />
      <KPICard
        label="tCO₂ Savings"
        value={`${tco2.toFixed(1)} t`}
        hint="simuliert live"
      />
      <KPICard
        label="Kosten / 100 km"
        value={`€ ${cost.toFixed(2)}`}
        hint="optimiert"
      />
    </div>
  );
}

function KPICard({ label, value, hint }) {
  return (
    <div className="panel p-4">
      <p className="text-xs uppercase tracking-wide text-white/60">{label}</p>
      <p className="mt-1 text-2xl font-extrabold tabular-nums">{value}</p>
      {hint && <p className="mt-1 text-xs text-white/50">{hint}</p>}
    </div>
  );
}
