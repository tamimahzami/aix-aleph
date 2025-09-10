import { useState, useCallback } from "react";
import { askChat } from "../../lib/api";

/**
 * useChatApi(provider)
 * - provider: "gemini" | "openai" | undefined
 * - send(history, userText) -> Antwort-String (oder Fehlermeldung)
 */
export default function useChatApi(provider) {
  const [busy, setBusy] = useState(false);

  const send = useCallback(
    async (history, userText) => {
      setBusy(true);
      try {
        const res = await askChat({
          question: userText,
          history,            // [{role:"user"|"assistant", text:string}]
          provider,           // wird ans Backend durchgereicht
        });

        // Tolerant parsen: Backend kann "answer" oder "text" liefern
        const answer =
          res?.answer ??
          res?.text ??
          (typeof res === "string" ? res : null);

        return answer ?? "⚠️ Unerwartete Server-Antwort.";
      } catch (err) {
        return `❌ Fehler: ${err?.message || "Unbekannt"}`;
      } finally {
        setBusy(false);
      }
    },
    [provider]
  );

  return { busy, send };
}
