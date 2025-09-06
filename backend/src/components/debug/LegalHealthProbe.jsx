// src/components/debug/LegalHealthProbe.jsx
import React from "react";
import { useApi } from "../../hooks/useApi";
import { api } from "../../lib/api";

export default function LegalHealthProbe() {
  const { data, error, loading, refetch } = useApi(api.getLegalHealth);

  return (
    <div className="p-3 rounded border">
      <div className="font-semibold mb-2">Legal Health</div>
      {loading && <div>lädt…</div>}
      {error && <div className="text-red-600">Fehler: {String(error.message || error)}</div>}
      {data && (
        <pre className="text-sm bg-gray-50 p-2 rounded overflow-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
      <button
        className="mt-2 px-3 py-1 border rounded"
        onClick={() => refetch()}
      >
        Neu laden
      </button>
    </div>
  );
}
