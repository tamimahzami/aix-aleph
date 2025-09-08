// src/hooks/useHeartbeat.js
import { useMemo } from "react";
export default function useHeartbeat(periodMs = 1800) {
  return useMemo(() => {
    const now = Date.now();
    const offset = now % periodMs;
    return { animationDelay: `-${offset}ms` };
  }, [periodMs]);
}
