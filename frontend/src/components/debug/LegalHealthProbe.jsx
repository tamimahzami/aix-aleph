import React, { useEffect, useState } from "react";

export default function LegalHealthProbe() {
  const [result, setResult] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    fetch("/api/legal/health")
      .then(r => r.json())
      .then(setResult)
      .catch(e => setErr(e.message));
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <h2>Legal Health Probe</h2>
      {err && <p style={{ color: "red" }}>Fehler: {err}</p>}
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}
