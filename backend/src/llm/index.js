// src/llm/index.js
export async function llmReply({ provider = "mock", messages = [], stream = false }) {
  if (provider === "gemini") {
    // nur laden, wenn wirklich gebraucht
    const { geminiReply } = await import("./providers/gemini.js");
    return geminiReply({ messages, stream });
  }

  // Fallback: Mock-Antwort ohne externe Abhängigkeiten
  const last = messages[messages.length - 1]?.content ?? "";
  return {
    text: `👋 (mock) Du sagtest: ${last.slice(0, 120)}`,
    provider: "mock",
    tokensIn: null,
    tokensOut: null,
    latencyMs: 5,
  };
}
