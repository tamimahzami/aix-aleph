// frontend/src/components/Footer.tsx
import React from "react";
import { Link } from "react-router-dom";

/* ──────────────────────────────────────────────────────────────
 * Types
 * ────────────────────────────────────────────────────────────── */
type InternalLink = { label: string; to: string };
type ExternalLink = { label: string; href: string };
type FooterLink = InternalLink | ExternalLink;
type Section = { title: string; links: FooterLink[] };

/* ──────────────────────────────────────────────────────────────
 * Data
 * ────────────────────────────────────────────────────────────── */
const year = new Date().getFullYear();

const sections: Section[] = [
  {
    title: "Product",
    links: [
      { label: "Download", href: "#" },
      { label: "Nitro", href: "#" },
      { label: "Status", to: "/status" },
      { label: "App Directory", href: "#" },
      { label: "Pricing", to: "/preise" },
      { label: "Demo", to: "/demo" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/ueber-uns" },
      { label: "Jobs", to: "/karriere" },
      { label: "Newsroom", to: "/blog" },
      { label: "Contact", to: "/kontakt" },
      { label: "Company Information", to: "/impressum" },
      { label: "Brand", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Developers", to: "/developers" },
      { label: "Creators", to: "/creators" },
      { label: "Community", href: "#" },
      { label: "StreamKit", href: "#" },
      { label: "College", href: "#" },
      { label: "Support", href: "#" },
      { label: "Safety", href: "#" },
      { label: "Blog", to: "/blog" },
      { label: "Quests", href: "#" },
      { label: "Official 3rd Party Merch", href: "#" },
      { label: "Feedback", to: "/feedback" },
    ],
  },
  {
    title: "Policies",
    links: [
      { label: "Terms", to: "/agb" },
      { label: "Privacy", to: "/datenschutz" },
      { label: "Cookie Settings", to: "/cookie-settings" },
      { label: "Guidelines", to: "/guidelines" },
      { label: "Acknowledgements", to: "/acknowledgements" },
      { label: "Licenses", to: "/licenses" },
    ],
  },
];

const socials = [
  { label: "X / Twitter", href: "https://x.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "YouTube", href: "https://youtube.com" },
  { label: "TikTok", href: "https://tiktok.com" },
];

/* ──────────────────────────────────────────────────────────────
 * Heartbeat Icon
 * ────────────────────────────────────────────────────────────── */
function HeartbeatIcon({ pulse = true }: { pulse?: boolean }) {
  return (
    <span className="relative inline-flex items-center justify-center">
      <svg
        width="18"
        height="18"
        viewBox="0 0 108 108"
        aria-hidden="true"
        style={{ animation: pulse ? "heartbeat 1600ms ease-in-out infinite" : undefined }}
      >
        <defs>
          <linearGradient id="hb" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#5865f2" />
            <stop offset="100%" stopColor="#eb459e" />
          </linearGradient>
        </defs>
        <path
          d="M54 92C24 72 12 58 12 42C12 31 21 22 32 22c8 0 14 5 22 14c8-9 14-14 22-14c11 0 20 9 20 20c0 16-12 30-42 50z"
          fill="url(#hb)"
        />
      </svg>
      <style>{`
        @keyframes heartbeat {
          0%   { transform: scale(1); }
          20%  { transform: scale(1.06); }
          40%  { transform: scale(1); }
          60%  { transform: scale(1.06); }
          100% { transform: scale(1); }
        }
      `}</style>
    </span>
  );
}

/* ──────────────────────────────────────────────────────────────
 * Footer Component
 * ────────────────────────────────────────────────────────────── */
export default function Footer() {
  const [agentOpen, setAgentOpen] = React.useState(false);

  return (
    <footer className="border-t border-white/10 bg-[#070b13] text-white">
      <div className="mx-auto max-w-[1200px] px-6 py-12">
        {/* Head row */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-white/10" aria-hidden="true" />
            <div>
              <p className="text-base font-semibold tracking-tight">AIX ALEPH</p>
              <p className="text-xs text-white/60">Human ♥ AI — HeartBeat</p>
            </div>
          </div>

          {/* Socials */}
          <nav className="flex flex-wrap items-center gap-3" aria-label="Social">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-white/10 px-3 py-1.5 text-sm text-white/80 hover:border-white/20 hover:bg-white/5 hover:text-white transition"
              >
                {s.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Link grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {sections.map((sec) => (
            <div key={sec.title}>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/70">
                {sec.title}
              </h3>
              <ul className="space-y-2">
                {sec.links.map((l) => (
                  <li key={l.label}>
                    {"to" in l ? (
                      <Link to={l.to} className="text-sm text-white/80 hover:text-white">
                        {l.label}
                      </Link>
                    ) : (
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-white/80 hover:text-white"
                      >
                        {l.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="my-8 h-px w-full bg-white/10" />

        {/* Bottom row */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-xs text-white/60">© {year} AIX ALEPH. All rights reserved.</p>

          <div className="flex items-center gap-3">
            {/* Agent Trigger */}
            <button
              onClick={() => setAgentOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm hover:bg-white/10 transition"
              aria-haspopup="dialog"
              aria-expanded={agentOpen}
            >
              <HeartbeatIcon />
              <span>Heartbeat Agent</span>
            </button>

            {/* secondary quick links */}
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs">
              <Link to="/datenschutz" className="text-white/60 hover:text-white">
                Privacy
              </Link>
              <span className="text-white/20">•</span>
              <Link to="/agb" className="text-white/60 hover:text-white">
                Terms
              </Link>
              <span className="text-white/20">•</span>
              <Link to="/cookie-settings" className="text-white/60 hover:text-white">
                Cookie Settings
              </Link>
              <span className="text-white/20">•</span>
              <Link to="/impressum" className="text-white/60 hover:text-white">
                Company Information
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ───────────────────── Agent Dialog ───────────────────── */}
      {agentOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[1200] flex items-end sm:items-center sm:justify-center"
        >
          <div className="absolute inset-0 bg-black/60" onClick={() => setAgentOpen(false)} />
          <div className="relative mx-auto w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl bg-[var(--color-surface)] border border-white/10 p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HeartbeatIcon />
                <h4 className="font-semibold">Heartbeat Agent</h4>
              </div>
              <button
                onClick={() => setAgentOpen(false)}
                className="rounded-lg px-2 py-1 text-white/70 hover:bg-white/10"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Provider-Switch + KPI Demo */}
            <div className="mt-3 flex items-center gap-2">
              <label htmlFor="agent-provider" className="text-xs text-white/70">
                Provider
              </label>
              <select
                id="agent-provider"
                className="rounded-lg bg-black/30 border border-white/10 px-2 py-1 text-sm"
                defaultValue="gpt"
                onChange={(e) => {
                  (window.localStorage as any).agentProvider = (e.target as HTMLSelectElement).value;
                }}
              >
                <option value="gpt">GPT</option>
                <option value="gemini">Gemini</option>
              </select>

              <button
                className="ml-auto text-xs rounded-lg border border-white/10 px-2 py-1 hover:bg-white/10"
                onClick={async () => {
                  // Demo: einfache KPI-Analyse
                  const provider = (window.localStorage as any).agentProvider || "gpt";
                  const payload = {
                    mode: "analyze",
                    provider,
                    telemetry: [
                      {
                        soc: 64,
                        powerKW: 43,
                        speed: 0,
                        tempC: 28,
                        odometerKm: 40215,
                        timestamp: new Date().toISOString(),
                      },
                      {
                        soc: 62,
                        powerKW: 50,
                        speed: 0,
                        tempC: 30,
                        odometerKm: 40215.1,
                        timestamp: new Date(Date.now() - 300000).toISOString(),
                      },
                    ],
                  };
                  try {
                    const res = await fetch("/api/agent/ask", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(payload),
                    });
                    const data = await res.json();
                    alert("KPIs:\n" + JSON.stringify((data as any).result || data, null, 2));
                  } catch (e: any) {
                    alert("Fehler: " + (e?.message || "Unbekannt"));
                  }
                }}
              >
                KPI-Analyse (Demo)
              </button>
            </div>

            {/* Mini Chat */}
            <ChatMini />
          </div>
        </div>
      )}
    </footer>
  );
}

/* ──────────────────────────────────────────────────────────────
 * Mini Chat Component (inline)
 * ────────────────────────────────────────────────────────────── */
function ChatMini() {
  const [history, setHistory] = React.useState<
    { role: "user" | "assistant" | "system"; content: string }[]
  >([]);
  const [q, setQ] = React.useState("");
  const [busy, setBusy] = React.useState(false);

  async function send() {
    if (!q.trim()) return;
    const provider = (window.localStorage as any).agentProvider || "gpt";
    const body = { mode: "chat", provider, history, question: q.trim() };

    setBusy(true);
    setHistory((h) => [...h, { role: "user", content: q.trim() }]);
    setQ("");

    try {
      const res = await fetch("/api/agent/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      const answer = (data as any)?.answer || (data as any)?.result || "…";
      setHistory((h) => [...h, { role: "assistant", content: String(answer) }]);
    } catch (e: any) {
      setHistory((h) => [
        ...h,
        { role: "assistant", content: "Fehler: " + (e?.message || "unknown") },
      ]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-3">
      <div className="h-48 overflow-y-auto rounded-xl bg-black/20 border border-white/10 p-3 text-sm space-y-2">
        {history.length === 0 && (
          <div className="text-white/50">
            Frag mich etwas über AIX ALEPH, Flotten, Energie oder Agenten.
          </div>
        )}
        {history.map((m, i) => (
          <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
            <span
              className={
                "inline-block rounded-lg px-3 py-2 " +
                (m.role === "user" ? "bg-white/10" : "bg-white/5")
              }
            >
              {m.content}
            </span>
          </div>
        ))}
      </div>
      <form
        className="mt-3 flex items-stretch gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          if (!busy) send();
        }}
      >
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          type="text"
          className="flex-1 rounded-xl bg-black/30 border border-white/10 px-3 py-2 outline-none"
          placeholder="Frag den Agenten…"
          required
        />
        <button
          disabled={busy}
          className="rounded-xl px-4 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-50"
        >
          {busy ? "…" : "Senden"}
        </button>
      </form>
    </div>
  );
}
