// src/agent/metrics.js
/**
 * Erwartet ein Array von Messpunkten:
 * [{ soc: number, powerKW: number, timestamp?: string }]
 * - energyKWh wird per Trapezregel über die Zeit berechnet.
 */
export function analyzeKpis(telemetry = []) {
  const pts = (telemetry || [])
    .map(p => ({
      soc: Number(p.soc),
      powerKW: Number(p.powerKW),
      t: p.timestamp ? new Date(p.timestamp).getTime() : null,
    }))
    .filter(p => Number.isFinite(p.soc) && Number.isFinite(p.powerKW));

  const count = pts.length;
  if (count === 0) {
    return { count: 0, avgPowerKW: 0, minSoC: null, maxSoC: null, energyKWh: 0 };
  }

  const avgPowerKW = pts.reduce((s, p) => s + p.powerKW, 0) / count;
  const minSoC = Math.min(...pts.map(p => p.soc));
  const maxSoC = Math.max(...pts.map(p => p.soc));

  // Energie (kWh) via Trapezregel über Zeitstempel
  let energyKWh = 0;
  const withTime = pts.every(p => Number.isFinite(p.t));
  if (withTime && count >= 2) {
    const sorted = [...pts].sort((a, b) => a.t - b.t);
    for (let i = 1; i < sorted.length; i++) {
      const p0 = sorted[i - 1];
      const p1 = sorted[i];
      const dtHours = Math.max(0, (p1.t - p0.t) / (1000 * 60 * 60));
      const pAvg = (p0.powerKW + p1.powerKW) / 2;
      energyKWh += pAvg * dtHours;
    }
  }

  // auf 2 Dezimalstellen runden wie in deinen Beispielen
  const round2 = v => Math.round(v * 100) / 100;

  return {
    count,
    avgPowerKW: round2(avgPowerKW),
    minSoC,
    maxSoC,
    energyKWh: round2(energyKWh),
  };
}
