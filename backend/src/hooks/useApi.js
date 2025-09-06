import { useEffect, useRef, useState, useCallback } from "react";

/**
 * useApi – führt eine async-Funktion aus (z.B. api.getLegalHealth)
 * und liefert { data, error, loading, refetch }.
 *
 * @param {Function} fn    Async-Funktion, die ein Promise zurückgibt (z.B. () => api.getHealth())
 * @param {Array} deps     Optionale Abhängigkeiten für den Auto-Request (default: [])
 * @param {Object} opts    { immediate = true, args = [] }
 */
export function useApi(fn, deps = [], opts = {}) {
  const { immediate = true, args = [] } = opts;

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const abortRef = useRef(null);

  const run = useCallback(async (...callArgs) => {
    setLoading(true);
    setError(null);

    // AbortController für schnelle Navigations/Unmounts
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const result = await fn(...(callArgs.length ? callArgs : args), {
        signal: controller.signal,
      });
      setData(result);
      return result;
    } catch (err) {
      // fetch wirft bei Abort meist DOMException – die ignorieren wir
      if (err?.name !== "AbortError") setError(err);
      throw err;
    } finally {
      if (abortRef.current === controller) abortRef.current = null;
      setLoading(false);
    }
  }, [fn, JSON.stringify(args)]); // args serialisieren, damit sich das Memo nicht ständig ändert

  // Auto-Request
  useEffect(() => {
    if (!immediate) return;
    run().catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  // Abort on unmount
  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  return { data, error, loading, refetch: run, setData, setError };
}
