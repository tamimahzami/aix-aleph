import React, { useEffect, useRef } from "react";
import maplibregl, { Map, LngLatLike } from "maplibre-gl";

type ActiveLayers = {
  charging: boolean;
  co2: boolean;
  fleet: boolean;
};

type WorldMapProps = {
  active: ActiveLayers;
};

const STYLE_URL = "https://demotiles.maplibre.org/style.json"; // Open-Source-Style

// --- Demo-GeoJSONs (kleine Samples weltweit) ---
const chargingGeoJSON = {
  type: "FeatureCollection",
  features: [
    { type: "Feature", properties: { name: "Berlin Hub" }, geometry: { type: "Point", coordinates: [13.405, 52.52] } },
    { type: "Feature", properties: { name: "Paris Hub" },  geometry: { type: "Point", coordinates: [2.3522, 48.8566] } },
    { type: "Feature", properties: { name: "NYC Hub" },    geometry: { type: "Point", coordinates: [-74.006, 40.7128] } },
    { type: "Feature", properties: { name: "Tokyo Hub" },  geometry: { type: "Point", coordinates: [139.6917, 35.6895] } },
  ],
};

const co2GridGeoJSON = {
  type: "FeatureCollection",
  features: [
    { type: "Feature", properties: { mix: "high" }, geometry: { type: "Point", coordinates: [10, 51] } }, // DE
    { type: "Feature", properties: { mix: "med" },  geometry: { type: "Point", coordinates: [100, 35] } }, // CN
    { type: "Feature", properties: { mix: "low" },  geometry: { type: "Point", coordinates: [-3, 56] } },  // UK
  ],
};

const fleetGeoJSON = {
  type: "FeatureCollection",
  features: [
    { type: "Feature", properties: { health: 0.98 }, geometry: { type: "Point", coordinates: [8.6821, 50.1109] } }, // Frankfurt
    { type: "Feature", properties: { health: 0.92 }, geometry: { type: "Point", coordinates: [151.21, -33.8688] } }, // Sydney
    { type: "Feature", properties: { health: 0.87 }, geometry: { type: "Point", coordinates: [37.6173, 55.7558] } }, // Moscow
  ],
};

export function WorldMap({ active }: WorldMapProps) {
  const mapRef = useRef<Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Init Map
  useEffect(() => {
    if (!containerRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: STYLE_URL,
      center: [9, 47] as LngLatLike,
      zoom: 3,
      attributionControl: false,
    });

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
    map.addControl(new maplibregl.ScaleControl({}), "bottom-left");

    map.on("load", () => {
      // Charging
      if (!map.getSource("charging-src")) {
        map.addSource("charging-src", { type: "geojson", data: chargingGeoJSON });
      }
      if (!map.getLayer("charging-circles")) {
        map.addLayer({
          id: "charging-circles",
          type: "circle",
          source: "charging-src",
          paint: {
            "circle-color": "#8ecae6",
            "circle-radius": 6,
            "circle-opacity": 0.9,
            "circle-stroke-color": "#0c1a24",
            "circle-stroke-width": 1,
          },
        });
      }

      // CO2
      if (!map.getSource("co2-src")) {
        map.addSource("co2-src", { type: "geojson", data: co2GridGeoJSON });
      }
      if (!map.getLayer("co2-circles")) {
        map.addLayer({
          id: "co2-circles",
          type: "circle",
          source: "co2-src",
          paint: {
            "circle-color": [
              "match",
              ["get", "mix"],
              "high", "#ff6b6b",
              "med",  "#ffb703",
              "low",  "#57f287",
              "#cccccc"
            ],
            "circle-radius": 5.5,
            "circle-opacity": 0.85,
            "circle-stroke-color": "#111",
            "circle-stroke-width": 1,
          },
        });
      }

      // Fleet
      if (!map.getSource("fleet-src")) {
        map.addSource("fleet-src", { type: "geojson", data: fleetGeoJSON });
      }
      if (!map.getLayer("fleet-circles")) {
        map.addLayer({
          id: "fleet-circles",
          type: "circle",
          source: "fleet-src",
          paint: {
            "circle-color": [
              "interpolate",
              ["linear"],
              ["get", "health"],
              0.80, "#eb459e",
              0.90, "#ffb703",
              0.97, "#57f287"
            ],
            "circle-radius": 6.5,
            "circle-opacity": 0.9,
            "circle-stroke-color": "#0f0f0f",
            "circle-stroke-width": 1,
          },
        });
      }

      // Layer-Visibility initial
      setVisibility(map, "charging-circles", active.charging);
      setVisibility(map, "co2-circles", active.co2);
      setVisibility(map, "fleet-circles", active.fleet);

      // Simple popups on click (demo)
      map.on("click", "charging-circles", (e) => {
        const feat = e.features?.[0];
        if (!feat) return;
        const name = feat.properties?.name ?? "Charging Hub";
        const coords = feat.geometry?.type === "Point" ? feat.geometry.coordinates : e.lngLat.toArray();
        new maplibregl.Popup({ closeButton: false })
          .setLngLat(coords as [number, number])
          .setHTML(`<div style="font-weight:700">⚡ ${name}</div>`)
          .addTo(map);
      });
    });

    mapRef.current = map;
    return () => { map.remove(); mapRef.current = null; };
  }, []);

  // Update visibility when props change
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    setVisibility(map, "charging-circles", active.charging);
    setVisibility(map, "co2-circles", active.co2);
    setVisibility(map, "fleet-circles", active.fleet);
  }, [active]);

  return <div ref={containerRef} className="w-full h-full" aria-label="Weltkarte" />;
}

function setVisibility(map: Map, layerId: string, show: boolean) {
  if (!map.getLayer(layerId)) return;
  map.setLayoutProperty(layerId, "visibility", show ? "visible" : "none");
}
