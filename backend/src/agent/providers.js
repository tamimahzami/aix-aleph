// src/agent/providers.js
import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";

const DEFAULT_PROVIDER = (process.env.AGENT_DEFAULT_PROVIDER || "auto").toLowerCase(); // gpt | gemini | auto
const GPT_MODEL = process.env.AGENT_GPT_MODEL || "gpt-4o-mini";
const GEMINI_MODEL = process.env.AGENT_GEMINI_MODEL || "gemini-1.5-flash";

export function hasOpenAI() {
  return Boolean(OPENAI_API_KEY && OPENAI_API_KEY.startsWith("sk-"));
}
export function hasGemini() {
  return Boolean(GEMINI_API_KEY && GEMINI_API_KEY.startsWith("AIza"));
}

function isQuotaOrAuth(err) {
  const msg = (err?.message || "").toLowerCase();
  const code = (err?.code || "").toLowerCase();
  const status = Number(err?.status || 0);
  return (
    status === 401 ||
    status === 429 ||
    code === "invalid_api_key" ||
    code === "insufficient_quota" ||
    msg.includes("quota") ||
    msg.includes("api key")
  );
}

/** OpenAI (GPT) */
async function askOpenAI({ history = [], question, model = GPT_MODEL }) {
  const client = new OpenAI({ apiKey: OPENAI_API_KEY });

  // baue Messages aus History (+ aktuelle Frage)
  const messages = [
    ...history.map(h => ({
      role: h.role === "assistant" ? "assistant" : "user",
      content: String(h.content || h.text || ""),
    })),
    { role: "user", content: String(question || "") },
  ];

  const resp = await client.chat.completions.create({
    model,
    messages,
    temperature: 0.3,
  });

  const answer = resp?.choices?.[0]?.message?.content?.trim() || "";
  return { answer, meta: { provider: "gpt", model } };
}

/** Google Gemini */
async function askGemini({ history = [], question, model = GEMINI_MODEL }) {
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  const modelClient = genAI.getGenerativeModel({ model });

  // Context als ein Prompt-String
  const histText =
    history
      .map(h => `${h.role === "assistant" ? "Assistant" : "User"}: ${String(h.content || h.text || "")}`)
      .join("\n") + (history.length ? "\n" : "");

  const prompt = `${histText}User: ${String(question || "")}\nAssistant:`;

  const resp = await modelClient.generateContent(prompt);
  const answer = resp?.response?.text()?.trim() || "";
  return { answer, meta: { provider: "gemini", model } };
}

/**
 * High-level Router mit Auto-Fallback:
 * order:
 *  - provider==="gpt"    → nur GPT
 *  - provider==="gemini" → nur Gemini
 *  - provider==="auto"   → GPT versuchen, bei 401/429/5xx → Gemini
 */
export async function askLLM({ provider, model, history = [], question }) {
  const want = (provider || DEFAULT_PROVIDER || "auto").toLowerCase();

  // Helper lambdas
  const tryGPT = async () => {
    if (!hasOpenAI()) throw new Error("OPENAI_API_KEY missing");
    return askOpenAI({ history, question, model: model || GPT_MODEL });
  };
  const tryGemini = async () => {
    if (!hasGemini()) throw new Error("GEMINI_API_KEY missing");
    return askGemini({ history, question, model: model || GEMINI_MODEL });
  };

  if (want === "gpt") {
    return tryGPT();
  }
  if (want === "gemini") {
    return tryGemini();
  }

  // auto
  try {
    return await tryGPT();
  } catch (err) {
    // nur bei Quota/Auth/Serverproblemen automatisch zu Gemini fallen
    if (isQuotaOrAuth(err)) {
      try {
        return await tryGemini();
      } catch (e2) {
        // beide fehlgeschlagen
        throw e2;
      }
    }
    // sonst Original-Fehler
    throw err;
  }
}

export function currentModels() {
  return {
    gpt: GPT_MODEL,
    gemini: GEMINI_MODEL,
    defaultProvider: DEFAULT_PROVIDER,
  };
}
