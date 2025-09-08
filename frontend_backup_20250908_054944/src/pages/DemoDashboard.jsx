// src/pages/DemoDashboard.jsx
import React, { useState } from "react";
import WorldMap from "../components/WorldMap.jsx";
import DemoStory from "../components/demo/DemoStory.jsx";

export default function DemoDashboard() {
  const [visible, setVisible] = useState({
    drones: true,
    chargers: true,
    depots: true,
    incidents: true,
  });

  const toggle = (key) =>
    setVisible((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="min-h-[70vh]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
        <header className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <h1 className="text-3xl font-extrabold">Demo</h1>
            <p className="text-muted mt-1">
              Read-only Vorschau der AIX Aleph Map-Layer. Keine Anmeldung nötig.
            </p>
          </div>
        </header>

        <div className="mt-6">
          {/* ANKER: Layer-Schalter */}
          <div id="demo-layer-toggles" className="flex gap-3 mb-4 flex-wrap">
            {Object.keys(visible).map((k) => (
              <button
                key={k}
                className={`px-3 py-2 rounded-md transition-colors duration-200 ${
                  visible[k]
                    ? "bg-[var(--color-primary)] text-white"
                    : "bg-[var(--color-surface)] text-[var(--color-ink)] border border-[var(--color-line)]"
                }`}
                onClick={() => toggle(k)}
              >
                {visible[k] ? "✓" : "✗"} {k.charAt(0).toUpperCase() + k.slice(1)}
              </button>
            ))}
          </div>

          {/* ANKER: Map */}
          <div id="demo-map" className="panel p-0 overflow-hidden">
            <WorldMap
              center={[52.52, 13.405]}
              zoom={4}
              height="520px"
              visible={visible}
            />
          </div>
        </div>
      </div>

      {/* STORY-OVERLAY */}
      <DemoStory
        anchors={{
          toggles: "#demo-layer-toggles",
          map: "#demo-map",
        }}
      />
    </div>
  );
}
