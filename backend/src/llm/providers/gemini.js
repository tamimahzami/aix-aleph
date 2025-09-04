// src/llm/providers/gemini.js
import axios from "axios";
import { logger } from "../../lib/logger.js";

/**
 * Google Gemini (Generative Language API)
 * Docs (v1beta): https://ai.google.dev/gemini-api/docs
 */
const API_KEY = process.env.GEMINI_API_KEY;
const MODEL = process.env.GEMINI_MODEL || "gemini-1.5-flash";
const BASE = "https://generativelanguage.googleapis.com/v1beta";

/**
 * Wandelt unser Chat-Format in Gemini "contents" um.
 * Unser Format: [{ role: "system"|"user"|"assistant", content: string }]
 * Gemini erwartet Rollen "user" | "model"
 */
function toGeminiContents(messages) {
  return messages.map((m) => {
    const role =
      m.role === "assistant"
        ? "model"
        : m.role === "system"
        ? "user" // Systemhinweise als user primen (einfach/pragmatisch)
        : "user";
    return {
      role,
      parts: [{ text: String(m.content ?? "") }],
    };
  });
}

/**
 * Extrahiert Text aus Gemini-Antwort (non-stream)
 */
function extractTextFromCandidates(candidates) {
  if (!Array.isArray(candidates) || candidates.length === 0) return "";
  const parts = candidates[0]?.content?.parts ?? [];
  return parts.map((p) => p?.text ?? "").join("");
}

/**
 * Gemini-Adapter (non-stream + stream)
 * @param {object} params
 * @param {{role:"system"|"user"|"assistant", content:string}[]} params.messages
 * @param {boolean} [params.stream=false]
 * @param {{timeoutMs?:number, signal?:AbortSignal}} [params.options]
 * @returns {Promise<{text:string, tokensIn?:number, tokensOut?:number} | {stream: AsyncGenerator}>}
 */
export async function replyWithGemini({ messages, stream = false, options = {} }) {
  if (!API_KEY) {
    logger.error("GEMINI_API_KEY is missing.");
    throw new Error("Missing Gemini API Key");
  }

  const timeoutMs = options.timeoutMs ?? 60_000;
  const contents = toGeminiContents(messages);

  if (!stream) {
    // -------- Non-streaming ----------
    const url = `${BASE}/models/${MODEL}:generateContent?key=${encodeURIComponent(API_KEY)}`;
    const payload = {
      contents,
      // Optional: "generationConfig", "safetySettings" etc. hier ergänzen
    };

    try {
      const { data } = await axios.post(url, payload, {
        timeout: timeoutMs,
        signal: options.signal,
        headers: { "Content-Type": "application/json" },
      });

      const text = extractTextFromCandidates(data?.candidates);
      // Tokenusage ist je nach Antwortstruktur optional; v1beta zählt u.U. nicht stabil mit
      const tokensIn =
        data?.usageMetadata?.promptTokenCount ??
        data?.usageMetadata?.totalTokenCount ??
        null;
      const tokensOut = data?.usageMetadata?.candidatesTokenCount ?? null;

      return { text, tokensIn, tokensOut };
    } catch (error) {
      const detail = error?.response?.data || error?.message;
      logger.error({ error: detail }, "Gemini API Error (non-stream)");
      throw new Error("Failed to get response from Gemini API.");
    }
  }

  // -------- Streaming (SSE) ----------
  const url = `${BASE}/models/${MODEL}:streamGenerateContent?key=${encodeURIComponent(API_KEY)}`;
  const payload = {
    contents,
  };

  try {
    const response = await axios.post(url, payload, {
      timeout: 0, // Stream offen lassen
      signal: options.signal,
      responseType: "stream",
      headers: { "Content-Type": "application/json" },
      decompress: true,
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    });

    async function* gen() {
      const stream = response.data; // Node Readable
      let buffer = "";

      for await (const chunk of stream) {
        buffer += chunk.toString("utf8");

        // Events zeilenweise; SSE nutzt leere Zeilen als Trenner, wir parsen pragmatisch "data:"-Zeilen
        let lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const raw of lines) {
          const line = raw.trim();
          if (!line.startsWith("data:")) continue;

          const data = line.slice(5).trim(); // nach "data: "
          if (!data || data === "[DONE]") {
            // Gemini schickt ggf. kein explizites [DONE]; falls doch, terminieren
            return { done: true };
          }

          try {
            const evt = JSON.parse(data);
            // Stream-Chunks können mehrere Kandidaten enthalten; wir nehmen den ersten Textpart
            const chunkText = extractTextFromCandidates(evt?.candidates);
            if (chunkText) {
              yield { delta: chunkText };
            }
          } catch (e) {
            // Unvollständige JSON-Fragmente ignorieren, bis nächste Zeile kommt
            logger.debug({ line }, "Gemini stream: partial/invalid JSON chunk skipped");
          }
        }
      }

      return { done: true };
    }

    return { stream: gen() };
  } catch (error) {
    const detail = error?.response?.data || error?.message;
    logger.error({ error: detail }, "Gemini API Error (stream)");
    throw new Error("Failed to stream response from Gemini API.");
  }
}
