// src/hooks/useApi.js
import { useCallback, useEffect, useRef, useState } from "react";

export function useAsync(asyncFn, deps = [], { immediate = true } = {}) {
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);
  const [value, setValue] = useState(undefined);
  const mounted = useRef(true);

  const run = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const v = await asyncFn(...args);
      if (mounted.current) setValue(v);
      return v;
    } catch (e) {
      if (mounted.current) setError(e);
      throw e;
    } finally {
      if (mounted.current) setLoading(false);
    }
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    mounted.current = true;
    if (immediate) run();
    return () => { mounted.current = false; };
  }, [run, immediate]);

  return { loading, error, value, run, reload: run, setValue, setError };
}
