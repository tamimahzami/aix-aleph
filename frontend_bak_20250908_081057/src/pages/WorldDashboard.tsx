import React, { useState } from "react";
import { WorldMap } from "../widgets/map/WorldMap";

export default function WorldDashboard(){
  const [active, setActive] = useState({ charging: true, co2: false, fleet: false });
  const toggle = (k: keyof typeof active) =>
    setActive(prev => ({ ...prev, [k]: !prev[k] }));

  return (
    <main className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6">
      <div className="app-grid h-[calc(100vh-160px)]">
        {/* Map-Bereich */}
        <section className="relative rounded-[var(--radius-lg)] overflow-hidden ring-line">
          {/* Toolbar */}
          <div className="absolute z-20 top-3 left-3 right-3 flex items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={()=>toggle("charging")}
                className={`chip ${active.charging ? "chip-on" : ""}`}
                aria-pressed={active.charging}
              >
                <span className="legend-swatch" style={{background:"#8ecae6"}}/>
                Charging
              </button>
              <button
                onClick={()=>toggle("co2")}
                className={`chip ${active.co2 ? "chip-on" : ""}`}
                aria-pressed={active.co2}
              >
                <span className="legend-swatch" style={{background:"#ffb703"}}/>
                CO₂
              </button>
              <button
                onClick={()=>toggle("fleet")}
                className={`chip ${active.fleet ? "chip-on" : ""}`}
                aria-pressed={active.fleet}
              >
                <span className="legend-swatch" style={{background:"#57f287"}}/>
                Fleet
              </button>
            </div>
            <div className="flex items-center gap-2">
              <select className="chip focusable" aria-label="Zeithorizont" defaultValue="live">
                <option value="live">Live</option>
                <option value="day-ahead">Day-Ahead</option>
                <option value="history">Historie</option>
              </select>
              <button className="btn btn-ghost focusable">Teilen <span className="kbd ml-2">⌘K</span></button>
              <button className="btn btn-primary focusable">Export</button>
            </div>
          </div>

          {/* Echte Karte */}
          <WorldMap active={active} />

          {/* KPI-Leiste */}
          <div className="absolute z-10 bottom-3 left-3 right-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label:"tCO₂ heute", val:"12,430", delta:"−8% vs. gestern" },
              { label:"Kosten/100km", val:"€ 19.4", delta:"+3% Strompreis" },
              { label:"Uptime Fleet", val:"98.2%", delta:"+0.4% QoS" },
              { label:"Ladevorgänge", val:"78,122", delta:"+5% Tagestrend" },
            ].map((k, i)=>(
              <div key={i} className="kpi elev">
                <h4>{k.label}</h4>
                <div className="val mt-1">{k.val}</div>
                <div className="text-muted mt-1 text-sm">{k.delta}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Right Rail */}
        <aside className="right-rail p-3 space-y-3 h-full overflow-auto">
          <section className="panel p-3">
            <h3 className="font-semibold">Aktionen</h3>
            <div className="mt-2 grid gap-2">
              <button className="btn btn-primary w-full">Optimierung vorschlagen</button>
              <button className="btn btn-ghost w-full">Szenario simulieren</button>
              <button className="btn btn-ghost w-full">Bericht exportieren</button>
            </div>
          </section>
          <section className="panel p-3">
            <h3 className="font-semibold">Incidents</h3>
            <ul className="mt-2 space-y-2 text-sm">
              <li className="bg-surface-2 ring-line rounded-lg p-2">🚧 Depot #23 – 2 Ladepunkte offline · 12:04</li>
              <li className="bg-surface-2 ring-line rounded-lg p-2">⚡ Tarifpeak EU-West · 11:40</li>
              <li className="bg-surface-2 ring-line rounded-lg p-2">🚌 Routenabweichung Bus 4A · 11:12</li>
            </ul>
          </section>
          <section className="panel p-3">
            <h3 className="font-semibold">Scenario Quick</h3>
            <form className="mt-2 grid gap-2 text-sm">
              <label className="grid gap-1">
                <span className="text-muted">Tarif (€ / kWh)</span>
                <input className="bg-surface-2 ring-line rounded-lg px-3 py-2" type="number" step="0.01" defaultValue={0.24}/>
              </label>
              <label className="grid gap-1">
                <span className="text-muted">SOC-Limit (%)</span>
                <input className="bg-surface-2 ring-line rounded-lg px-3 py-2" type="number" defaultValue={80}/>
              </label>
              <button className="btn btn-primary">Quick-Run</button>
            </form>
          </section>
          <section className="panel p-3">
            <h3 className="font-semibold">Legende</h3>
            <div className="legend mt-2 space-y-2">
              <div className="legend-item"><span className="legend-swatch" style={{background:"#8ecae6"}}/> Charging Density</div>
              <div className="legend-item"><span className="legend-swatch" style={{background:"#ffb703"}}/> CO₂ Grid Mix</div>
              <div className="legend-item"><span className="legend-swatch" style={{background:"#57f287"}}/> Fleet Health</div>
              <div className="legend-item"><span className="legend-swatch" style={{background:"#eb459e"}}/> Tariffs</div>
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
}
