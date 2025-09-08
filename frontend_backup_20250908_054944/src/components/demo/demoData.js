// src/components/demo/demoData.js
export const demoDrones = [
  { id: "DR-001", pos: [52.52, 13.405], status: "OK", soc: 82, note: "Berlin Mitte" },
  { id: "DR-017", pos: [48.137, 11.575], status: "Charging", soc: 41, note: "München Zentrum" },
  { id: "DR-044", pos: [50.1109, 8.6821], status: "OK", soc: 68, note: "Frankfurt" },
];

export const demoChargers = [
  { id: "CH-101", pos: [52.49, 13.4], kw: 300, load: 0.42, note: "Depot Nord" },
  { id: "CH-207", pos: [52.53, 13.37], kw: 150, load: 0.75, note: "Depot West" },
];

export const demoDepots = [
  { id: "DP-01", pos: [52.515, 13.29], capacity: 40, note: "AIX Depot West" },
];

export const demoIncidents = [
  { id: "IC-900", pos: [52.50, 13.46], severity: "medium", note: "Kurzzeitige Störung" },
];
