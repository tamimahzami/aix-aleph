// src/components/agent/AgentWidget.jsx
import React, { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "aix-aleph.chat.v1";
const STORAGE_UI  = "aix-aleph.chat.ui";
const CHAT_ENDPOINT = "/api/chat"; // <- bei Bedarf anpassen

function loadFromStorage(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; }
  catch { return fallback; }
}
function saveToStorage(key, value) {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

export default function AgentWidget() {
  // UI open/closed (persist)
  const [open, setOpen] = useState(() => loadFromStorage(STORAGE_UI, { open: false }).open);

  // Chat-Verlauf (persist)
  const [messages, setMessages] = useState(() =>
    loadFromStorage(STORAGE_KEY, [
      { id: "seed-1", from: "ai", text: "Hallo 👋, wie kann ich dir helfen?", ts: Date.now() },
    ])
  );

  // Eingabe & Status
  const [input, setInput] = useState("");
  const [aiTyping, setAiTyping] = useState(false);
  const [error, setError] = useState("");
  const listRef = useRef(null);
  const abortRef = useRef(null);

  // Autoscroll
  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight + 9999;
  }, [messages, aiTyping, open]);

  // Persistenz
  useEffect(() => saveToStorage(STORAGE_KEY, messages), [messages]);
  useEffect(() => saveToStorage(STORAGE_UI, { open }), [open]);

  const fmtTime = (ts) => new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  // Verlauf -> OpenAI-kompatibles Format
  const toRoles = (msgs) =>
    msgs.map((m) => ({ role: m.from === "user" ? "user" : "assistant", content: m.text }));

  async function callBackend(history) {
    // Versucht Streaming (Chunked/SSE) und fällt auf JSON zurück
    const controller = new AbortController();
    abortRef.current = controller;

    const res = await fetch(CHAT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: toRoles(history) }),
      signal: controller.signal,
    });

    // 1) JSON-Antwort { reply: "..." }
    const ctype = res.headers.get("content-type") || "";
    if (ctype.includes("application/json")) {
      const data = await res.json();
      return data?.reply ?? "";
    }

    // 2) Streaming text/plain oder SSE-ähnlich
    if (!res.body || typeof res.body.getReader !== "function") {
      // Fallback: Volltext lesen
      return await res.text();
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let full = "";
    // Wir streamen direkt in die UI (letzte AI-Message updaten)
    setMessages((prev) => {
      const draft = { id: crypto.randomUUID(), from: "ai", text: "", ts: Date.now() };
      return [...prev, draft];
    });

    // Index der gerade hinzugefügten AI-Message merken
    let aiIndex = -1;

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      full += chunk;

      setMessages((prev) => {
        // finde die letzte AI-Nachricht, die noch leer sein kann
        if (aiIndex < 0) {
          aiIndex = [...prev].reverse().findIndex((m) => m.from === "ai" && m.text === "");
          if (aiIndex >= 0) aiIndex = prev.length - 1 - aiIndex; // in Vorwärtsindex umrechnen
        }
        if (aiIndex >= 0) {
          const copy = [...prev];
          copy[aiIndex] = { ...copy[aiIndex], text: full };
          return copy;
        }
        return prev;
      });
    }

    return full.trim();
  }

  const sendMessage = async (e) => {
    e?.preventDefault?.();
    setError("");

    const text = input.trim();
    if (!text) return;

    const userMsg = { id: crypto.randomUUID(), from: "user", text, ts: Date.now() };
    setMessages((m) => [...m, userMsg]);
    setInput("");

    setAiTyping(true);
    try {
      const reply = await callBackend([...messages, userMsg]);

      // Falls Streaming bereits die AI-Bubble gefüllt hat, nur dann hinzufügen,
      // wenn noch keine neue AI-Bubble entstanden ist.
      if (reply) {
        setMessages((prev) => {
          // check: existiert eine AI-Bubble, die durch Streaming bereits gefüllt wurde?
          const hasFreshAi = prev.length > 0 && prev[prev.length - 1].from === "ai" && prev[prev.length - 1].ts > userMsg.ts;
          if (hasFreshAi) return prev; // already streamed in
          return [...prev, { id: crypto.randomUUID(), from: "ai", text: reply, ts: Date.now() }];
        });
      }
    } catch (err) {
      if (err?.name !== "AbortError") {
        setError("Backend nicht erreichbar. Bitte später erneut versuchen.");
      }
    } finally {
      setAiTyping(false);
      abortRef.current = null;
    }
  };

  const clearChat = () => {
    // Abort laufender Request
    try { abortRef.current?.abort(); } catch {}
    setAiTyping(false);
    setError("");

    const seed = { id: "seed-1", from: "ai", text: "Neuer Chat gestartet. Wie kann ich helfen?", ts: Date.now() };
    setMessages([seed]);
  };

  // Keyboard: Enter send, Shift+Enter newline
  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(e);
    }
  };

  // Minimiert
  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="agent-fab btn btn-accent"
        aria-label="Chat öffnen"
        title="Chat öffnen"
      >
        💬
      </button>
    );
  }

  return (
    <div className="agent-panel" role="dialog" aria-label="AIX Aleph Chat">
      {/* Header */}
      <div className="agent-header">
        <div className="brand-mini" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            className="dot"
            aria-hidden="true"
            style={{
              width: 12, height: 12, borderRadius: 4,
              background: "radial-gradient(24px 16px at 50% 0%, var(--primary), transparent 70%), #0c0c0c",
              border: "1px solid color-mix(in srgb, var(--primary) 30%, var(--line))",
              boxShadow: "0 0 12px color-mix(in srgb, var(--primary) 40%, transparent)"
            }}
          />
          <span className="agent-title">AIX Aleph Chat</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={clearChat}
            className="agent-close"
            title="Verlauf löschen"
            style={{ fontSize: 12 }}
          >
            Verlauf löschen
          </button>
          <button
            onClick={() => {
              try { abortRef.current?.abort(); } catch {}
              setOpen(false);
            }}
            className="agent-close"
            aria-label="Chat schließen"
            title="Chat schließen"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Messages */}
      <div ref={listRef} className="agent-messages">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`agent-bubble ${msg.from === "user" ? "is-user" : "is-ai"}`}
          >
            <div style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{msg.text}</div>
            <div
              className="muted"
              style={{
                marginTop: 4,
                fontSize: 10,
                opacity: msg.from === "user" ? 0.7 : 1
              }}
            >
              {fmtTime(msg.ts)}
            </div>
          </div>
        ))}

        {aiTyping && (
          <div className="agent-bubble is-ai" aria-live="polite">
            <span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
              <Dots />
              <span className="muted" style={{ fontSize: 12 }}>Tippt…</span>
            </span>
          </div>
        )}

        {!!error && (
          <div className="agent-bubble is-ai" role="alert" style={{ borderColor: "crimson" }}>
            {error}
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={sendMessage} className="agent-input">
        <textarea
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Nachricht schreiben… (Enter = senden, Shift+Enter = Zeile)"
          className="agent-field"
        />
        <button type="submit" className="btn btn-accent" aria-label="Senden">
          Senden
        </button>
      </form>
    </div>
  );
}

function Dots() {
  // einfache „tippt…“-Animation ohne Tailwind
  const base = { display: "inline-block", width: 6, height: 6, borderRadius: 999 };
  return (
    <span style={{ display: "inline-flex", gap: 4 }}>
      <span style={{ ...base, background: "var(--muted)", animation: "aixDot 1s infinite" }} />
      <span style={{ ...base, background: "var(--muted)", animation: "aixDot 1s infinite .15s" }} />
      <span style={{ ...base, background: "var(--muted)", animation: "aixDot 1s infinite .3s" }} />
      <style>{`
        @keyframes aixDot { 
          0%, 80%, 100% { transform: translateY(0); opacity:.6; }
          40% { transform: translateY(-2px); opacity:1; }
        }
      `}</style>
    </span>
  );
}
