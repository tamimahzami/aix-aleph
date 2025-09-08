// src/components/agent/AgentWidget.jsx
import React from "react";

function DefaultAgentAdapter() {
  // Fallback-Antwort, falls keine echte Agent-Integration existiert
  return {
    async ask(prompt) {
      // Simulierter minimaler Agent – bitte später mit echtem Backend ersetzen
      await new Promise((r) => setTimeout(r, 350));
      return `🤖 (Lokaler Agent): Ich habe deine Nachricht erhalten:\n“${prompt}”\n\n` +
             `Ich bin bereit, Fragen zur Plattform, Roadmap oder Ideen entgegenzunehmen. ` +
             `Sobald der echte Agent (window.AIXAgent.ask) bereit ist, antworte ich live.`;
    },
  };
}

export default function AgentWidget({ open, onClose }) {
  const panelRef = React.useRef(null);
  const inputRef = React.useRef(null);
  const [messages, setMessages] = React.useState([
    { role: "agent", text: "Hallo! Ich bin der AIX Aleph Agent. Wie kann ich helfen?" },
  ]);
  const [input, setInput] = React.useState("");
  const adapter = React.useMemo(() => (window?.AIXAgent?.ask ? window.AIXAgent : DefaultAgentAdapter()), []);

  React.useEffect(() => {
    if (open) {
      // Fokus in das Eingabefeld
      const t = setTimeout(() => inputRef.current?.focus(), 0);
      return () => clearTimeout(t);
    }
  }, [open]);

  React.useEffect(() => {
    const onKey = (e) => {
      if (open && e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const send = async () => {
    const content = input.trim();
    if (!content) return;
    setMessages((m) => [...m, { role: "user", text: content }]);
    setInput("");
    try {
      const reply = await adapter.ask(content);
      setMessages((m) => [...m, { role: "agent", text: reply }]);
    } catch (err) {
      setMessages((m) => [
        ...m,
        { role: "agent", text: "Entschuldige, ich konnte gerade nicht antworten. Bitte versuche es erneut." },
      ]);
      // Optional: console.error(err);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/30 aix-agent-panel"
      role="dialog"
      aria-modal="true"
      aria-label="AIX Aleph Agent"
      ref={panelRef}
      onMouseDown={(e) => {
        if (e.target === panelRef.current) onClose?.();
      }}
    >
      <div className="w-full sm:max-w-lg mx-4 sm:mx-0 rounded-2xl border border-white/10 bg-[#0b101a]/95 text-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-white/10" />
            <div>
              <p className="text-base font-semibold tracking-tight">AIX Aleph Agent</p>
              <p className="text-xs text-white/60">Human ♥ AI HeartBeat</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg px-2 py-1 text-white/70 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
            aria-label="Agent schließen"
          >
            ✕
          </button>
        </div>

        {/* Messages */}
        <div className="max-h-[50vh] overflow-y-auto p-4 space-y-3">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-white/15 text-white"
                    : "bg-white/8 text-white/90 border border-white/10"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Composer */}
        <div className="p-3 border-t border-white/10">
          <div className="flex gap-2">
            <textarea
              ref={inputRef}
              rows={2}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Frag mich alles zu AIX Aleph …"
              className="flex-1 resize-none rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            <button
              onClick={send}
              className="self-end rounded-xl bg-[var(--primary, #ff1557)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white/30"
              aria-label="Nachricht senden"
            >
              Senden
            </button>
          </div>
          <p className="mt-2 text-[10px] text-white/40">
            Hinweis: Wenn ein echter Agent eingebunden ist, beantwortet er live über <code>window.AIXAgent.ask()</code>.
          </p>
        </div>
      </div>
    </div>
  );
}
