import React from "react";
import { askChat } from "../../lib/api.js";

export default function AgentWidget({ provider = "auto", title, welcome }) {
  const [open, setOpen] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const [messages, setMessages] = React.useState([
    { role: "agent", text: welcome },
  ]);
  const [input, setInput] = React.useState("");

  async function onSend(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text || busy) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setBusy(true);

    try {
      const res = await askChat({ question: text, history: messages, provider });
      setMessages((m) => [...m, { role: "agent", text: res.answer }]);
    } catch (err) {
      setMessages((m) => [...m, { role: "agent", text: `⚠️ Fehler: ${err.message}` }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Toggle */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="px-4 py-2 rounded-full bg-[var(--blurple)] text-white shadow"
      >
        {open ? "×" : "♥"}
      </button>

      {/* Panel */}
      {open && (
        <div className="mt-2 w-[340px] panel rounded-lg shadow-lg overflow-hidden">
          <header className="p-3 border-b border-[var(--color-line)] font-semibold">{title}</header>
          <div className="p-3 h-64 overflow-auto space-y-2 text-sm">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "agent" ? "text-left" : "text-right"}>
                <div
                  className={`inline-block px-3 py-2 rounded-lg ${
                    m.role === "agent"
                      ? "bg-[var(--color-surface)] border border-[var(--color-line)]"
                      : "bg-[var(--blurple)] text-white"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={onSend} className="p-3 border-t border-[var(--color-line)] flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 rounded-md border bg-[var(--color-bg)] px-3 py-2 text-sm outline-none"
              placeholder="Frag mich etwas…"
            />
            <button
              type="submit"
              disabled={busy}
              className="btn btn-primary text-sm px-4 py-2 disabled:opacity-50"
            >
              {busy ? "…" : "Senden"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
