// src/components/common/HealthBadgeLive.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * Kleiner Helper: Basis-URL für die API lesen
 * - aus VITE_API_BASE (z.B. http://localhost:5001/api)
 * - fallback auf localhost
 */
function getApiBase() {
  const raw = import.meta?.env?.VITE_API_BASE || "http://localhost:5001/api";
  return raw.replace(/\/+$/, "");
}

export default function HealthBadgeLive({ intervalMs = 15000 }) {
  const API_BASE = useMemo(getApiBase, []);
  const [status, setStatus] = useState("unknown"); // "healthy" | "warning" | "error" | "unknown"
  const [latency, setLatency] = useState(null);
  const timerRef = useRef(null);

  async function check() {
    const ctrl = new AbortController();
    const t0 = performance.now();
    try {
      const res = await fetch(`${API_BASE}/health`, {
        method: "GET",
        signal: ctrl.signal,
        credentials: "include",
        headers: { Accept: "application/json" },
      });

      const dt = Math.max(0, Math.round(performance.now() - t0));
      setLatency(dt);

      // Wenn der Server 200 liefert → "healthy".
      // Alles andere werten wir als "warning".
      if (res.ok) {
        setStatus("healthy");
      } else {
        setStatus("warning");
      }
    } catch (_) {
      // Netzwerk/Timeout → "error"
      setStatus("error");
      setLatency(null);
    }
    return () => ctrl.abort();
  }

  useEffect(() => {
    // sofort einmal prüfen
    check();

    // dann regelmäßig pollen
    timerRef.current = setInterval(check, intervalMs);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [API_BASE, intervalMs]);

  const COLORS = {
    healthy: "bg-green-500",
    warning: "bg-yellow-500",
    error: "bg-red-500",
    unknown: "bg-gray-500",
  };
  const LABELS = {
    healthy: "Healthy",
    warning: "Warning",
    error: "Error",
    unknown: "Loading…",
  };

  const color = COLORS[status] || COLORS.unknown;
  const label = LABELS[status] || LABELS.unknown;

  return (
    <span
      title={latency != null ? `Latency: ${latency} ms` : "Healthcheck"}
      className={`inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs font-semibold text-white ${color}`}
    >
      <span className="inline-block w-2 h-2 rounded-full bg-white/90" />
      {label}
      {latency != null && status === "healthy" ? (
        <span className="opacity-80">· {latency} ms</span>
      ) : null}
    </span>
  );
}
