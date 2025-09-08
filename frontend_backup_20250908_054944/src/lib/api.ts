// frontend/src/lib/api.ts
type AskChatBody = {
  mode: "chat";
  history: Array<{ role: "user" | "assistant"; content: string }>;
  question: string;
  provider?: "gpt" | "gemini";
};

type AskAnalyzeBody = {
  mode: "analyze";
  telemetry: Array<{ soc: number; powerKW: number; timestamp?: string }>;
};

type AskResult =
  | { ok: true; answer?: string; result?: any; meta?: any }
  | { ok: false; message: string };

const API_BASE =
  import.meta.env.VITE_API_BASE?.replace(/\/$/, "") || ""; // leer = via Vite-Proxy

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
    credentials: "include",
    ...init,
  });
  const data = (await res.json()) as T;
  return data;
}

export async function getKeys() {
  // Gibt { ok, hasOpenAI, hasGemini, defaultProvider, models }
  return api<{
    ok: boolean;
    hasOpenAI?: boolean;
    hasGemini?: boolean;
    defaultProvider?: "gpt" | "gemini";
    models?: Record<string, string>;
  }>("/api/agent/keys");
}

export async function askChatWithFallback(
  question: string,
  history: AskChatBody["history"] = []
): Promise<AskResult> {
  // 1) hole verfügbare Provider
  const keys = await getKeys().catch(() => ({ ok: false } as any));

  // Priorität: defaultProvider → Alternative
  const order: ("gpt" | "gemini")[] = [];
  if (keys.ok) {
    const def = (keys.defaultProvider || "gpt") as "gpt" | "gemini";
    const alt = def === "gpt" ? "gemini" : "gpt";
    if ((def === "gpt" && keys.hasOpenAI) || (def === "gemini" && keys.hasGemini))
      order.push(def);
    if ((alt === "gpt" && keys.hasOpenAI) || (alt === "gemini" && keys.hasGemini))
      order.push(alt);
  } else {
    // Keys-Endpoint fehlt? Versuche beide, gpt zuerst.
    order.push("gpt", "gemini");
  }

  // 2) versuche nacheinander
  const errors: string[] = [];
  for (const provider of order) {
    const body: AskChatBody = { mode: "chat", history, question, provider };
    const res = await api<AskResult>("/api/agent/ask", {
      method: "POST",
      body: JSON.stringify(body),
    }).catch((e) => ({ ok: false, message: String(e) } as AskResult));

    if (res.ok) return res;

    // bekannte Fehlertexte des Backends abfangen:
    const msg = (res as any).message || "";
    errors.push(`${provider}: ${msg}`);

    // Bei 429/401 vom GPT auf Gemini wechseln
    const quota =
      /429|quota|insufficient_quota|You exceeded your current quota/i.test(msg);
    const invalidKey =
      /401|invalid_api_key|Incorrect API key provided/i.test(msg);

    if ((quota || invalidKey) && provider === "gpt") {
      continue; // Fallback zu gemini
    }
  }

  // 3) wenn alles fehlschlägt:
  return {
    ok: false,
    message:
      errors.join(" | ") ||
      "Unbekannter Fehler bei der Anfrage. Bitte später erneut versuchen.",
  };
}

export async function askAnalyze(telemetry: AskAnalyzeBody["telemetry"]) {
  return api<AskResult>("/api/agent/ask", {
    method: "POST",
    body: JSON.stringify({ mode: "analyze", telemetry }),
  });
}
