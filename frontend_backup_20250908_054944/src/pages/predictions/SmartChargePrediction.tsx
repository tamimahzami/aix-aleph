// src/pages/predictions/SmartChargePrediction.tsx
import { useEffect, useState } from "react";
import { api } from "../../api";

type Prediction = {
  timestamp: string;
  recommendedAction: string;
  price?: number;
};

export default function SmartChargePrediction() {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPredictions() {
      try {
        // später wird hier dein echtes Backend angebunden
        // aktuell nur Dummy-Daten
        // const res = await api.fetchSmartChargePredictions();
        const res: Prediction[] = [
          {
            timestamp: "2025-09-03T08:00:00Z",
            recommendedAction: "Laden starten",
            price: 0.22,
          },
          {
            timestamp: "2025-09-03T12:00:00Z",
            recommendedAction: "Pause einlegen",
          },
          {
            timestamp: "2025-09-03T20:00:00Z",
            recommendedAction: "Optimal laden",
            price: 0.18,
          },
        ];
        setPredictions(res);
      } catch (err: any) {
        setError(err.message || "Fehler beim Laden der Vorhersagen");
      } finally {
        setLoading(false);
      }
    }

    fetchPredictions();
  }, []);

  if (loading) {
    return <p className="p-6">⏳ Lade Vorhersagen...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-400">⚠️ {error}</p>;
  }

  return (
    <section className="prose prose-invert max-w-4xl mx-auto p-6">
      <h1>Smart Charging Vorhersagen ⚡</h1>
      <p>
        Hier siehst du empfohlene Ladezeitpunkte basierend auf Preis- und
        Netzlast-Prognosen.
      </p>
      <ul className="divide-y divide-gray-700">
        {predictions.map((p, idx) => (
          <li key={idx} className="py-3">
            <strong>{new Date(p.timestamp).toLocaleString()}</strong>:{" "}
            {p.recommendedAction}{" "}
            {p.price && (
              <span className="text-sm text-gray-400">
                (ca. {p.price.toFixed(2)} €/kWh)
              </span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
