import { useMemo, useState } from "react";
import { askAnalyze, askChatWithFallback, getKeys } from "../lib/api";

export default function AgentDemo() {
  const [question, setQuestion] = useState("Kurz: Was ist AIX ALEPH?");
  const [answer, setAnswer] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string>("");

  const telemetry = useMemo(
    () => [
      { soc: 64, powerKW: 43, timestamp: "2025-09-08T01:00:00Z" },
      { soc: 62, powerKW: 50, timestamp: "2025-09-08T01:05:00Z" },
    ],
    []
  );

  async function onAsk() {
    setLoading(true);
    setAnswer("");
    setStatus("lade…");
    const keys = await getKeys().catch(() => ({ ok: false } as any));
    if (keys.ok) {
      setStatus(
        `Provider: default=${keys.defaultProvider}, hasOpenAI=${keys.hasOpenAI}, hasGemini=${keys.hasGemini}`
      );
    } else {
      setStatus("Keys-Endpoint nicht verfügbar, versuche direkt…");
    }

    const res = await askChatWithFallback(question);
    setLoading(false);
    if (res.ok) {
      setAnswer(res.answer || "");
      setStatus("ok");
    } else {
      setStatus(`Fehler: ${res.message}`);
    }
  }

  async function onAnalyze() {
    setLoading(true);
    setStatus("analysiere…");
    const res = await askAnalyze(telemetry);
    setLoading(false);
    if (res.ok) {
      setAnswer(JSON.stringify(res.result, null, 2));
      setStatus("ok");
    } else {
      setStatus(`Fehler: ${res.message}`);
    }
  }

  return (
    <div style={{ maxWidth: 720, margin: "40px auto", fontFamily: "system-ui" }}>
      <h1>AIX ALEPH – Agent Demo</h1>

      <label>
        Frage
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          rows={3}
          style={{ width: "100%", marginTop: 8 }}
        />
      </label>

      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <button onClick={onAsk} disabled={loading}>
          {loading ? "Frage…" : "Fragen"}
        </button>
        <button onClick={onAnalyze} disabled={loading}>
          {loading ? "Analysiere…" : "KPI analysieren"}
        </button>
      </div>

      <div style={{ marginTop: 16, color: "#666" }}>Status: {status}</div>

      <pre
        style={{
          marginTop: 16,
          padding: 12,
          background: "#111",
          color: "#0f0",
          borderRadius: 6,
          overflowX: "auto",
        }}
      >
        {answer || "—"}
      </pre>

      <p style={{ marginTop: 12, fontSize: 12, color: "#888" }}>
        Tipp: Bei GPT-429 (Quota) fällt der Client automatisch auf Gemini zurück.
      </p>
    </div>
  );
}
