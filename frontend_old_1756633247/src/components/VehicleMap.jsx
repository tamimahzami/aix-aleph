// src/components/VehicleMap.jsx
import React from "react";

export default function VehicleMap({ vehicles = [] }) {
  return (
    <div style={{
      height: "100%", width: "100%",
      background: "linear-gradient(160deg, rgba(37,99,235,0.08), rgba(139,92,246,0.08))",
      display: "flex", alignItems: "center", justifyContent: "center",
      border: "1px solid rgba(0,0,0,0.05)", borderRadius: 8
    }}>
      <div style={{ textAlign: "center", color: "#64748b" }}>
        <div style={{ fontSize: 24, marginBottom: 8 }}>Live-Karte (Demo)</div>
        <div>{vehicles.filter(v => v.lat && v.lng).length} Fahrzeuge mit Position</div>
        <button style={{
          marginTop: 12, padding: "10px 16px", borderRadius: 8, border: "none",
          background: "#2563eb", color: "#fff", cursor: "pointer"
        }}>
          Live-Karte aktivieren
        </button>
      </div>
    </div>
  );
}
