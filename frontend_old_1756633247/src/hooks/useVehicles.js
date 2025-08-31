import { useState, useEffect } from "react";

export default function useVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchVehicles() {
      try {
        const res = await fetch(`${API_URL}/api/vehicles`);
        if (!res.ok) throw new Error("Fehler beim Laden der Fahrzeuge");
        const data = await res.json();
        setVehicles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchVehicles();
  }, []);

  return { vehicles, loading, error };
}
