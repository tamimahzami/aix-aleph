// src/components/WorldMap.jsx
import React, { useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

export default function WorldMap({
  center = [52.52, 13.405],
  zoom = 4,
  height = "440px",
  visible = { drones: true, chargers: true, depots: true, incidents: true },
}) {
  // Demo-Daten (ersetzbar durch API)
  const drones = [
    { id: "dr-ber", name: "Drone BER-01",  pos: [52.366, 13.503] },
    { id: "dr-ams", name: "Drone AMS-07",  pos: [52.373, 4.895]  },
  ];
  const incidents = [
    { id: "in-ham", name: "Incident Hamburg", pos: [53.551, 9.993], severity: "high" },
  ];
  const chargers = [
    { id: "ch-a", name: "Depot East",  pos: [52.52, 13.405], soc: 0.82 },
    { id: "ch-b", name: "Yard West",   pos: [48.135, 11.582], soc: 0.34 },
  ];
  const depots = [
    { id: "dp-1", name: "Main Depot", pos: [50.1109, 8.6821] },
  ];

  // Icon-Fabriken
  const icons = useMemo(() => {
    const div = (html) => L.divIcon({ html, className: "", iconSize: [0,0] });

    return {
      drone:   div('<span class="aix-marker aix-green"></span>'),
      incident:div('<span class="aix-marker aix-red"></span>'),
      // Charger bekommt Prozent als CSS-Variable (--p)
      charger: (soc) => {
        // SOC (0..1) -> Umdrehung (turn) für conic-gradient
        const turn = Math.max(0, Math.min(1, soc)) * 1; // 1 turn == 100%
        return div(`<span class="aix-charger" style="--p:${turn}turn"></span>`);
      },
      depot:   div('<span class="aix-marker aix-blue" style="--shadow:none"></span>'),
    };
  }, []);

  return (
    <div style={{ height }}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "100%", width: "100%", borderRadius: 12, overflow: "hidden" }}
        scrollWheelZoom={true}
      >
        {/* Dark-friendly Tiles (kannst du gegen eigene Quelle tauschen) */}
        <TileLayer
          url="https://{s}.tile.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; OpenStreetMap &copy; CARTO'
        />

        {/* DROHNEN (pulsierend grün) */}
        {visible?.drones && drones.map(d => (
          <Marker key={d.id} position={d.pos} icon={icons.drone}>
            <Popup><b>{d.name}</b><br/>Live status: OK</Popup>
          </Marker>
        ))}

        {/* INCIDENTS (pulsierend rot) */}
        {visible?.incidents && incidents.map(i => (
          <Marker key={i.id} position={i.pos} icon={icons.incident}>
            <Popup><b>{i.name}</b><br/>Severity: {i.severity}</Popup>
          </Marker>
        ))}

        {/* CHARGER (Dial mit SOC) */}
        {visible?.chargers && chargers.map(c => (
          <Marker key={c.id} position={c.pos} icon={icons.charger(c.soc)}>
            <Popup><b>{c.name}</b><br/>SOC: {(c.soc*100).toFixed(0)}%</Popup>
          </Marker>
        ))}

        {/* DEPOTS (blau, ohne Pulse – ruhiger Pol) */}
        {visible?.depots && depots.map(d => (
          <Marker key={d.id} position={d.pos} icon={icons.depot}>
            <Popup><b>{d.name}</b></Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
