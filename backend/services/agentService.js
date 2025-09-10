// services/agentService.js (ESM)
// Platzhalter-Logik: Verdrahtet, damit Frontend sofort sprechen kann.
// Später echte OpenAI/Gemini-Calls einhängen.
const DEFAULT_PROVIDER = process.env.AGENT_DEFAULT_PROVIDER || 'auto';

export async function askAgent({ question, history = [], provider }) {
  const providerPref = provider || DEFAULT_PROVIDER;
  const hasOpenAI = !!process.env.OPENAI_API_KEY;
  const hasGemini = !!process.env.GEMINI_API_KEY;

  const answer =
    `AIX Agent (Demo) antwortet auf: "${question}". ` +
    `Provider-Vorgabe: ${providerPref}. (Keys: openai=${hasOpenAI}, gemini=${hasGemini})`;

  return { answer, providerUsed: providerPref };
}
