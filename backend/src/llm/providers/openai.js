// src/llm/providers/openai.js
import axios from "axios";
import { logger } from "../../lib/logger.js";

const API_KEY = process.env.OPENAI_API_KEY;
const API_URL = "https://api.openai.com/v1/chat/completions";

/**
 * OpenAI-Adapter
 * @param {object} params
 * @param {{role: "system"|"user"|"assistant", content: string}[]} params.messages
 * @param {boolean} [params.stream=false] - Wenn true: { stream: AsyncGenerator<{delta, done?}> }
 * @param {{timeoutMs?:number, signal?:AbortSignal}} [params.options]
 * @returns {Promise<{text:string, tokensIn?:number, tokensOut?:number} | {stream: AsyncGenerator}>}
 */
export async function replyWithOpenAI({ messages, stream = false, options = {} }) {
  if (!API_KEY) {
    logger.error("OPENAI_API_KEY is missing.");
    throw new Error("Missing OpenAI API Key");
  }

  const timeoutMs = options.timeoutMs ?? 60_000;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  };

  if (!stream) {
    // -------- Non-streaming ----------
    const payload = {
      model: "gpt-4o-mini", // ggf. anpassen
      messages,
      stream: false,
    };

    try {
      const { data } = await axios.post(API_URL, payload, {
        headers,
        timeout: timeoutMs,
        signal: options.signal,
        // Keine Kompression für deterministischere Latenz (optional):
        decompress: true,
      });

      const text = data?.choices?.[0]?.message?.content ?? "";
      return {
        text,
        tokensIn: data?.usage?.prompt_tokens ?? null,
        tokensOut: data?.usage?.completion_tokens ?? null,
      };
    } catch (error) {
      const detail = error?.response?.data || error?.message;
      logger.error({ error: detail }, "OpenAI API Error (non-stream)");
      throw new Error("Failed to get response from OpenAI API.");
    }
  }

  // -------- Streaming (SSE) ----------
  const payload = {
    model: "gpt-4o-mini",
    messages,
    stream: true,
  };

  try {
    const response = await axios.post(API_URL, payload, {
      headers,
      timeout: 0, // Streaming: kein fester Timeout am Request (wir regeln selbst über Abort)
      signal: options.signal,
      responseType: "stream",
      // Wichtig für Node-Streams:
      decompress: true,
      // Max Content-Length offen lassen, da Stream
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    });

    // Async-Generator, der zeilenweise SSE-Daten parst
    async function* gen() {
      const stream = response.data; // Node Readable
      let buffer = "";

      for await (const chunk of stream) {
        buffer += chunk.toString("utf8");

        // Events sind durch \n\n getrennt; wir splitten erstmal auf \n
        let lines = buffer.split("\n");
        // Die letzte (möglicherweise unvollständige) Zeile im Buffer behalten
        buffer = lines.pop() ?? "";

        for (const raw of lines) {
          const line = raw.trim();
          if (!line.startsWith("data:")) continue;

          const data = line.slice(5).trim(); // nach "data: "
          if (data === "[DONE]") {
            // stream beendet
            return { done: true };
          }

          try {
            const evt = JSON.parse(data);
            // OpenAI streamt deltas bei chat/completions:
            const piece =
              evt?.choices?.[0]?.delta?.content ??
              evt?.choices?.[0]?.message?.content ??
              "";

            if (piece) {
              yield { delta: piece };
            }
          } catch (e) {
            // Einzelne JSON-Events können mal splitten – ignorieren, bis vollständig
            logger.debug({ line }, "OpenAI stream: partial/invalid JSON chunk skipped");
          }
        }
      }

      // am Ende ggf. Rest im Buffer ignorieren
      return { done: true };
    }

    return { stream: gen() };
  } catch (error) {
    const detail = error?.response?.data || error?.message;
    logger.error({ error: detail }, "OpenAI API Error (stream)");
    throw new Error("Failed to stream response from OpenAI API.");
  }
}
