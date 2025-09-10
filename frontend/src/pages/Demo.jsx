// src/pages/Demo.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import ContainerMax from "../components/common/ContainerMax.jsx";

/** Smooth Counter */
function useAnimatedNumber(target, durationMs = 900, precision = 0) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      const next = target * eased;
      setVal(parseFloat(next.toFixed(precision)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs, precision]);
  return val;
}

function Battery({ soc }) {
  return (
    <div className="card">
      <div className="flex items-center justify-between text-sm muted">
        <span>Batterie</span>
        <span className="font-bold" style={{ color: "var(--primary)" }}>{soc}%</span>
      </div>
      <div className="mt-3" style={{ height: 20, width: "100%", background: "rgba(255,255,255,.06)", borderRadius: 999 }}>
        <div
          style={{
            height: "100%",
            width: `${soc}%`,
            background: "var(--primary)",
            borderRadius: 999,
            transition: "width .35s ease"
          }}
        />
      </div>
      <div className="mt-2 text-sm muted">SoC (State of Charge)</div>
    </div>
  );
}

function HeatBar({ slots = 24, load = [] }) {
  // load: array of values 0..1 per hour
  return (
    <div
      className="card"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${slots}, minmax(0, 1fr))`,
        gap: "2px",
        padding: "12px"
      }}
    >
      {Array.from({ length: slots }).map((_, i) => {
        const v = load[i] ?? 0;
        return (
          <div
            key={i}
            title={`${i}:00 — Load ${(v * 100).toFixed(0)}%`}
            style={{
              height: 40,
              borderRadius: 4,
              background: `linear-gradient(to top, rgba(0,162,255,${0.35 + v * 0.5}) 0%, transparent 100%)`,
              boxShadow: v > 0.7 ? "0 0 12px rgba(0,162,255,0.35)" : "none",
              border: "1px solid var(--line)"
            }}
          />
        );
      })}
    </div>
  );
}

export default function Demo() {
  // KPIs (animated)
  const uptime = useAnimatedNumber(99.97, 1200, 2);
  const cost = useAnimatedNumber(-28, 1200, 0);
  const latency = useAnimatedNumber(2.8, 1200, 1);

  // Battery demo
  const [soc, setSoc] = useState(64);
  const dirRef = useRef(1);
  useEffect(() => {
    const t = setInterval(() => {
      setSoc((s) => {
        const next = s + dirRef.current * 1;
        if (next >= 92) dirRef.current = -1;
        if (next <= 48) dirRef.current = 1;
        return Math.max(0, Math.min(100, next));
      });
    }, 450);
    return () => clearInterval(t);
  }, []);

  // Load profile (24h)
  const load = useMemo(() => {
    // peak abends, leichte mittagswelle
    return Array.from({ length: 24 }, (_, h) => {
      const evening = Math.max(0, Math.cos((h - 20) * (Math.PI / 12)));
      const noon = Math.max(0, Math.cos((h - 12) * (Math.PI / 8))) * 0.55;
      return Math.min(1, evening * 0.95 + noon * 0.45);
    });
  }, []);

  const plans = [
    {
      title: "Depot West • 46 Ladepunkte",
      items: [
        "Tarif-Wechsel 22–06 Uhr (Spot < 0,21€/kWh)",
        "Peak-Shaving aktiv > 140 kW",
        "6 Fahrzeuge priorisiert (Schicht 05:30)",
      ],
    },
    {
      title: "InnerCity Fleet • 18 Fahrzeuge",
      items: [
        "CO₂-Intensität < 260 g/kWh abwarten",
        "3 Schnelllade-Slots reserviert (Notfälle)",
        "Ziel-SoC 80% bis 04:00",
      ],
    },
  ];

  return (
    <>
      {/* KPIs */}
      <section className="page-section">
        <ContainerMax>
          <div className="grid gap-4" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))" }}>
            <div className="card">
              <div className="text-sm muted">Fleet Uptime</div>
              <div className="mt-1 text-2xl font-bold">{uptime}%</div>
              <div className="mt-1 text-sm muted">über 30 Tage rolling</div>
            </div>
            <div className="card">
              <div className="text-sm muted">Ladekosten</div>
              <div className="mt-1 text-2xl font-bold">{cost}%</div>
              <div className="mt-1 text-sm muted">gegenüber Basisjahr</div>
            </div>
            <div className="card">
              <div className="text-sm muted">Scheduling-Latenz</div>
              <div className="mt-1 text-2xl font-bold">{latency} min</div>
              <div className="mt-1 text-sm muted">Median bei Netzlast</div>
            </div>
          </div>
        </ContainerMax>
      </section>

      {/* Battery + Heat */}
      <section className="page-section">
        <ContainerMax>
          <div className="grid gap-6" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,2fr)" }}>
            <Battery soc={soc} />
            <div className="card">
              <div className="flex items-center justify-between">
                <div className="text-sm muted">Ladefenster • 24h</div>
                <div className="text-sm muted">Spot + CO₂ + Auslastung</div>
              </div>
              <div className="mt-3">
                <HeatBar load={load} />
              </div>
              <div className="mt-3" style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["Peak-Shaving aktiv", "CO₂-Ziel 230 g/kWh", "Tarif-Arbitrage"].map((t) => (
                  <span key={t} className="panel" style={{ padding: "4px 8px", fontSize: 12 }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </ContainerMax>
      </section>

      {/* Planner */}
      <section className="page-section">
        <ContainerMax>
          <div className="grid gap-4" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))" }}>
            {plans.map((p) => (
              <div key={p.title} className="card">
                <div className="flex items-center gap-2">
                  <span style={{
                    width: 8, height: 8, borderRadius: 9999,
                    background: "var(--primary)", boxShadow: "0 0 12px rgba(0,162,255,.5)"
                  }} />
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                </div>
                <ul className="mt-3" style={{ display: "grid", gap: 8 }}>
                  {p.items.map((it) => (
                    <li key={it} className="flex items-start gap-2 text-sm">
                      <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden>
                        <path fill="currentColor" d="M8 13.5 4.5 10l1.4-1.4L8 10.7l5.7-5.7L15 6.4z" />
                      </svg>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4" style={{ display: "flex", gap: 8 }}>
                  <button className="btn">Plan ausführen</button>
                  <button className="btn btn-ghost">Audit-Trail</button>
                </div>
              </div>
            ))}
          </div>
        </ContainerMax>
      </section>
    </>
  );
}
