// src/hooks/useAnimatedNumber.js
import { useEffect, useRef, useState } from "react";

/**
 * Smoothly animates a number from 'from' to 'to' in 'durationMs'.
 * Re-runs on 'to' change. Good for subtle KPI motion.
 */
export default function useAnimatedNumber({ from = 0, to = 0, durationMs = 900 }) {
  const [value, setValue] = useState(from);
  const rafRef = useRef(0);
  const startRef = useRef(0);

  useEffect(() => {
    cancelAnimationFrame(rafRef.current);
    startRef.current = performance.now();

    const start = value;
    const delta = to - start;

    function ease(t) {
      // easeOutCubic
      return 1 - Math.pow(1 - t, 3);
    }

    const tick = (now) => {
      const elapsed = now - startRef.current;
      const p = Math.min(1, elapsed / durationMs);
      setValue(start + delta * ease(p));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [to]);

  return value;
}
