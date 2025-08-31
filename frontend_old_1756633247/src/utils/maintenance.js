// src/utils/maintenance.js
export function checkServiceStatus(v) {
  const mileage = Number(v?.mileage ?? 0);
  const last = Number(v?.lastServiceMileage ?? 0);
  const interval = Number(v?.serviceInterval ?? 15000);
  const since = Math.max(0, mileage - last);
  const pct = interval > 0 ? since / interval : 0;

  if (pct < 0.7) return "OK";
  if (pct < 1.0) return "DUE_SOON";
  return "OVERDUE";
}
export function formatServiceStatus(code) {
  switch (code) {
    case "OK": return "Service OK";
    case "DUE_SOON": return "Bald fällig";
    case "OVERDUE": return "Überfällig";
    default: return "Unbekannt";
  }
}
