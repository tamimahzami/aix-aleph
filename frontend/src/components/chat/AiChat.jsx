import React, { useEffect, useRef, useState } from "react";

/** Kleines Dreiecks-Icon (Warnsymbol-Stil, aber „freundlich“) */
function TriangleIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden {...props}>
      <defs>
        <linearGradient id="aiTri" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--primary)" />
          <stop offset="100%" stopColor="color-mix(in oklab, var(--primary) 60%, white)" />
        </linearGradient>
      </defs>
      <path d="M12 3 22 20H2L12 3Z" fill="url(#aiTri)" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="12" cy="15" r="1.4" fill="currentColor" />
      <rect x="11.3" y="8" width="1.4" height="5" rx="0.7" fill="currentColor" />
    </svg>
  );
}

export default function AiChat(){
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState([
    { role: "assistant", text: "Hi! Ich bin dein AIX Chat – wie kann ich helfen?" }
  ]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs, open]);

  const send = async () => {
    if (!input.trim()) return;
    const q = input.trim();
    setMsgs(m => [...m, { role: "user", text: q }]);
    setInput("");
    setBusy(true);

    try {
      // Echo-Dummy – hier später Backend anbinden
      await new Promise(r => setTimeout(r, 500));
      setMsgs(m => [...m, { role: "assistant", text: "Verstanden. (Demo-Antwort)" }]);
    } finally {
      setBusy(false);
    }
  };

  const onKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        type="button"
        className="ai-fab"
        onClick={() => setOpen(v => !v)}
        aria-label={open ? "Chat schließen" : "Chat öffnen"}
        title={open ? "Chat schließen" : "Chat öffnen"}
      >
        <TriangleIcon />
      </button>

      {open && (
        <section className="ai-chat">
          <header className="ai-chat__head">
            <div className="ai-chat__title">
              <span className="ai-chip" aria-hidden />
              <span>AIX Chat</span>
            </div>
            <button
              className="btn btn-ghost"
              onClick={() => setOpen(false)}
              aria-label="Chat schließen"
            >
              Schließen
            </button>
          </header>

          <div className="ai-chat__body" ref={scrollRef}>
            {msgs.map((m, i) => (
              <div
                key={i}
                className={`ai-msg ${m.role === "assistant" ? "ai-msg--a" : "ai-msg--u"}`}
              >
                {m.text}
              </div>
            ))}
          </div>

          <div className="ai-chat__input">
            <textarea
              className="ai-chat__box"
              placeholder="Nachricht eingeben … (Enter = senden, Shift+Enter = Zeilenumbruch)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
            />
            <button className="ai-chat__send" onClick={send} disabled={busy}>
              {busy ? "…" : "Senden"}
            </button>
          </div>
        </section>
      )}
    </>
  );
}
