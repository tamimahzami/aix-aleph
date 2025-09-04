import React, { useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, LayerGroup } from "react-leaflet";
import L from "leaflet";

// Fix für Marker-Icons unter Vite/Webpack (Leaflet nutzt relative Pfade)
import marker2x from "leaflet/dist/images/marker-icon-2x.png";
import marker1x from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const defaultIcon = L.icon({
  iconRetinaUrl: marker2x,
  iconUrl: marker1x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = defaultIcon;

/**
 * props:
 *  center: [lat,lng]
 *  zoom: number
 *  height: css string
 *  data: {
 *    drones: [{id,name,lat,lng,status}],       // status: 'ok' | 'low' | 'offline' | 'incident'
 *    chargers: [{id,name,lat,lng,occupancy}],  // occupancy: 0..1
 *    depots: [{id,name,lat,lng,capacity,used}],
 *    incidents: [{id,name,lat,lng,severity}]   // severity: 1..3
 *  }
 *  visible: { drones:boolean, chargers:boolean, depots:boolean, incidents:boolean }
 */
export default function WorldMap({
  center = [52.52, 13.405],
  zoom = 3,
  height = "440px",
  data,
  visible = { drones: true, chargers: true, depots: true, incidents: true },
}) {
  const demo = useMemo(() => {
    const fallback = {
      drones: [
        { id: "d1", name: "Drone Alpha", lat: 52.52, lng: 13.405, status: "ok" },
        { id: "d2", name: "Drone Beta", lat: 48.8566, lng: 2.3522, status: "low" },
        { id: "d3", name: "Drone Gamma", lat: 1.3521, lng: 103.8198, status: "offline" },
      ],
      chargers: [
        { id: "c1", name: "Charger Berlin-Mitte", lat: 52.517, lng: 13.38, occupancy: 0.25 },
        { id: "c2", name: "Charger Paris-Nord", lat: 48.87, lng: 2.33, occupancy: 0.75 },
      ],
      depots: [
        { id: "p1", name: "Depot Berlin", lat: 52.49, lng: 13.42, capacity: 120, used: 84 },
        { id: "p2", name: "Depot Singapore", lat: 1.34, lng: 103.82, capacity: 60, used: 40 },
      ],
      incidents: [
        { id: "i1", name: "Incident – Battery Fault", lat: 50.11, lng: 8.68, severity: 2 },
      ],
    };
    return data || fallback;
  }, [data]);

  // einfache Farben
  const droneColor = (status) =>
    status === "ok" ? "#57f287" : status === "low" ? "#fee75c" : status === "offline" ? "#eb459e" : "#eb459e";
  const occColor = (occ) => (occ < 0.5 ? "#57f287" : occ < 0.8 ? "#fee75c" : "#eb459e");
  const incidentColor = (sev) => (sev >= 3 ? "#eb459e" : sev === 2 ? "#fee75c" : "#57f287");

  return (
    <div className="rounded-2xl overflow-hidden ring-1 ring-[var(--color-line)] bg-[var(--color-surface)]">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ width: "100%", height }}
        scrollWheelZoom={true}
        className="outline-none"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        />

        {/* DROHNEN */}
        {visible.drones && (
          <LayerGroup>
            {demo.drones.map((d) => (
              <CircleMarker
                key={d.id}
                center={[d.lat, d.lng]}
                radius={8}
                pathOptions={{ color: droneColor(d.status), fillColor: droneColor(d.status), fillOpacity: 0.9 }}
              >
                <Popup>
                  <b>🚁 {d.name}</b>
                  <div>Status: {d.status}</div>
                </Popup>
              </CircleMarker>
            ))}
          </LayerGroup>
        )}

        {/* CHARGER */}
        {visible.chargers && (
          <LayerGroup>
            {demo.chargers.map((c) => (
              <CircleMarker
                key={c.id}
                center={[c.lat, c.lng]}
                radius={7}
                pathOptions={{ color: occColor(c.occupancy), fillColor: occColor(c.occupancy), fillOpacity: 0.85 }}
              >
                <Popup>
                  <b>⚡ {c.name}</b>
                  <div>Belegung: {(c.occupancy * 100).toFixed(0)}%</div>
                </Popup>
              </CircleMarker>
            ))}
          </LayerGroup>
        )}

        {/* DEPOTS */}
        {visible.depots && (
          <LayerGroup>
            {demo.depots.map((p) => (
              <Marker key={p.id} position={[p.lat, p.lng]}>
                <Popup>
                  <b>🏭 {p.name}</b>
                  <div>
                    Kapazität: {p.used}/{p.capacity}
                  </div>
                </Popup>
              </Marker>
            ))}
          </LayerGroup>
        )}

        {/* INCIDENTS */}
        {visible.incidents && (
          <LayerGroup>
            {demo.incidents.map((i) => (
              <CircleMarker
                key={i.id}
                center={[i.lat, i.lng]}
                radius={10}
                pathOptions={{ color: incidentColor(i.severity), fillColor: incidentColor(i.severity), fillOpacity: 0.9 }}
              >
                <Popup>
                  <b>🚨 {i.name}</b>
                  <div>Severity: {i.severity}</div>
                </Popup>
              </CircleMarker>
            ))}
          </LayerGroup>
        )}
      </MapContainer>
    </div>
  );
}
