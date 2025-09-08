// src/hooks/useHealth.js
import { useEffect, useState } from "react";

export default function useHealth(pollMs = 5000) {
  const [status, setStatus] = useState("unknown");

  async function check() {
    try {
      const res = await fetch(
        (import.meta.env.VITE_API_BASE || "http://localhost:5001/api") + "/health",
        { credentials: "include" }
      );
      if (!res.ok) throw new Error("bad");
      // optional: Inhalte lesen, hier reicht OK
      setStatus("healthy");
    } catch {
      setStatus((s) => (s === "unknown" ? "warning" : "error"));
    }
  }

  useEffect(() => {
    check(); // sofort
    const t = setInterval(check, pollMs);
    return () => clearInterval(t);
  }, [pollMs]);

  return status;
}
