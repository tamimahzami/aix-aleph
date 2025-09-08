import React from "react";
import { Link } from "react-router-dom";

/* ──────────────────────────────────────────────────────────────
 * Kleine UI-Bausteine
 * ────────────────────────────────────────────────────────────── */
function Badge({ children }) {
  return (
    <span className="px-2 py-1 rounded-full text-xs bg-[var(--color-surface)] border border-[var(--color-line)]">
      {children}
    </span>
  );
}

function KpiCard({ label, value, hint }) {
  return (
    <div className="panel p-4">
      <div className="text-sm text-muted">{label}</div>
      <div className="text-2xl font-extrabold mt-1">{value}</div>
      {hint ? <div className="text-xs text-muted mt-1">{hint}</div> : null}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
 * Hero – Human ♥ KI
 * ────────────────────────────────────────────────────────────── */
function DemoHero() {
  return (
    <header className="relative overflow-hidden text-center py-20">
      <div className="absolute inset-0 bg-hero-gradient pointer-events-none" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex justify-center items-center mb-6">
          {/* pulsierendes Herz */}
          <div className="relative w-16 h-16 sm:w-20 sm:h-20">
            <div
              className="absolute inset-0 bg-[var(--blurple)] rounded-full opacity-25 animate-pulse"
              style={{ animationDuration: "2s" }}
            />
            <div className="absolute inset-2 sm:inset-3 bg-[var(--blurple)] rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold">
          Live-Demo · Das Betriebssystem für Mobilität
        </h1>
        <p className="mt-4 text-lg md:text-xl text-[var(--color-ink-muted)] max-w-prose mx-auto">
          AIX ALEPH vereint die Seele des Menschen mit der Logik der KI. Sehen Sie,
          wie unser <strong>AIX Neural Core</strong> Ladefenster, Flotten und Energie in Echtzeit orchestriert –
          erklärbar und auditierbar.
        </p>

        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Link to="/dashboard" className="btn btn-primary">Zum Live-Dashboard</Link>
          <Link to="/tech/overview" className="btn btn-ghost">Technologie entdecken</Link>
          <Link to="/preise" className="btn btn-ghost">Preise & Pläne</Link>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-wave-mask opacity-70 pointer-events-none" />
    </header>
  );
}

/* ──────────────────────────────────────────────────────────────
 * Szenario-Toggles + Panels
 * ────────────────────────────────────────────────────────────── */
const SCREENS = ["E-Depot", "Flotte", "Ladeinfra"];

function ScenarioSwitch({ current, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {SCREENS.map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onChange(s)}
          className={`px-4 py-2 rounded-full border text-sm transition
            ${current === s ? "bg-[var(--blurple)] text-white border-transparent" : "bg-transparent border-[var(--color-line)] hover:bg-[rgba(255,255,255,0.04)]"}`}
          aria-pressed={current === s ? "true" : "false"}
        >
          {s}
        </button>
      ))}
    </div>
  );
}

function ScenarioPanel({ scenario }) {
  if (scenario === "E-Depot") {
    return (
      <div className="panel p-5">
        <div className="flex items-center gap-3">
          <Badge>Ladefenster</Badge>
          <Badge>Tarife</Badge>
          <Badge>Grid-Mix</Badge>
        </div>
        <h3 className="text-xl font-bold mt-4">E-Depot Orchestrierung</h3>
        <p className="text-muted mt-2">
          Nachtstrom-Fenster, SOC-Ziele, Depot-Slots und CO₂-Prioritäten werden automatisch balanciert.
          Agenten sichern KPIs (Kosten, Uptime, Emissionen) – jede Entscheidung bleibt erklärbar.
        </p>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mt-5">
          <KpiCard label="Ø Energiepreis (aktuell)" value="0,21 €/kWh" hint="Nachtstrom aktiv · CO₂ 246 g/kWh" />
          <KpiCard label="Reservierte Slots" value="7 / 10" hint="Peak 04:00–06:30" />
          <KpiCard label="Fahrzeuge ≥ 85% SOC" value="18" hint="+3 in 25 min" />
          <KpiCard label="CO₂-Einsparung (heute)" value="−14%" hint="ggü. Baseline" />
        </div>
      </div>
    );
  }

  if (scenario === "Flotte") {
    return (
      <div className="panel p-5">
        <div className="flex items-center gap-3">
          <Badge>Fleet Health</Badge>
          <Badge>Routen</Badge>
          <Badge>Maintenance</Badge>
        </div>
        <h3 className="text-xl font-bold mt-4">Flottensteuerung</h3>
        <p className="text-muted mt-2">
          Anomalien erkennen, Wartung vorausschauend planen und Umläufe stabil halten – global, policy-geführt.
        </p>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mt-5">
          <KpiCard label="Verfügbarkeit" value="99,2 %" hint="SLA grün" />
          <KpiCard label="Offene Tickets" value="3" hint="1 kritisch (BUS-002)" />
          <KpiCard label="Pünktlichkeit" value="96,8 %" hint="+0,9 % Woche/Woche" />
          <KpiCard label="Ø Verbrauch" value="1,08 kWh/km" hint="City-Mix" />
        </div>
      </div>
    );
  }

  // Ladeinfra
  return (
    <div className="panel p-5">
      <div className="flex items-center gap-3">
        <Badge>Auslastung</Badge>
        <Badge>Tarif-Peaks</Badge>
        <Badge>Wartung</Badge>
      </div>
      <h3 className="text-xl font-bold mt-4">Ladeinfrastruktur</h3>
      <p className="text-muted mt-2">
        Ausfälle voraussagen, Tarif-Peaks umgehen und Last glätten. Agenten priorisieren Ports & Leistung je nach
        Szenario und Policy.
      </p>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mt-5">
        <KpiCard label="Aktive Ports" value="42 / 48" hint="87,5 % Auslastung" />
        <KpiCard label="Vorwarnungen" value="2" hint="Inverter-Temp ↑" />
        <KpiCard label="Peak-Shaving" value="−18 %" hint="heute · 11:30–13:00" />
        <KpiCard label="Wartungsfenster" value="20:15" hint="Slot 7 reserviert" />
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
 * Timeline – Heute
 * ────────────────────────────────────────────────────────────── */
function TodayTimeline() {
  return (
    <section aria-label="Heute – Ablauf" className="panel p-5">
      <h2 className="text-lg font-semibold">Heute · Orchestrierung</h2>
      <p className="text-sm text-muted mt-1">
        Ladefenster → Abfahrten → Rückläufe &amp; Wartung. Policy-gesteuert, kosten- &amp; emissionsoptimiert.
      </p>

      <ul className="mt-4 space-y-4">
        <li className="relative pl-8">
          <span className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-[var(--blurple)]" />
          <div className="flex flex-wrap items-center gap-x-3">
            <time className="text-sm text-muted w-20">04:30</time>
            <Badge>Ladefenster A</Badge>
            <span className="text-sm">Busse M1/M2 priorisiert (Nachtstrom, 350 kW)</span>
          </div>
          <p className="text-xs text-muted ml-20">Tarif-Tiefpreis · Grid-Mix grün · Slots 1–5 belegt</p>
        </li>

        <li className="relative pl-8">
          <span className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-yellow-300" />
          <div className="flex flex-wrap items-center gap-x-3">
            <time className="text-sm text-muted w-20">06:00</time>
            <Badge>Abfahrten – Peak</Badge>
            <span className="text-sm">Umläufe M1/M2/M3 rollen aus · SOC ≥ 85 %</span>
          </div>
          <p className="text-xs text-muted ml-20">Dispatch konsolidiert Verspätungen · SLA Check</p>
        </li>

        <li className="relative pl-8">
          <span className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-green-400" />
          <div className="flex flex-wrap items-center gap-x-3">
            <time className="text-sm text-muted w-20">11:30</time>
            <Badge>Midday Smart Charge</Badge>
            <span className="text-sm">Lastglättung · Spotpreis unter Schwellwert · 150 kW</span>
          </div>
          <p className="text-xs text-muted ml-20">Priorität für Nachmittagsumläufe · Degradation-schonend</p>
        </li>

        <li className="relative pl-8">
          <span className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-pink-400" />
          <div className="flex flex-wrap items-center gap-x-3">
            <time className="text-sm text-muted w-20">20:15</time>
            <Badge>Rückläufe &amp; Maintenance</Badge>
            <span className="text-sm">Anomalie BUS-002 · Check Inverter Temp · Slot 7 reserviert</span>
          </div>
          <p className="text-xs text-muted ml-20">Ticket erzeugt · Ersatzfahrzeug im Morning-Peak vorgemerkt</p>
        </li>
      </ul>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────
 * Interaktiver Agent (Fake-Demo, erweiterbar)
 * ────────────────────────────────────────────────────────────── */
function AgentWidget() {
  const [open, setOpen] = React.useState(true);
  const [messages, setMessages] = React.useState([
    { role: "agent", text: "Willkommen bei AIX ALEPH! Was kann ich heute für dich tun?" },
  ]);
  const [input, setInput] = React.useState("");

  const KB = React.useMemo(
    () => ({
      about:
        "AIX ALEPH ist das Betriebssystem für Mobilität – die Fusion aus menschlicher Seele und KI-Logik. Ziel: Mobilität, Energie und Prozesse nahtlos orchestrieren – transparent, auditierbar, in Echtzeit.",
      vision:
        "Human ♥ KI: Entscheidbare Agenten statt Black Box. Jede Aktion erklärbar, jede Entscheidung mit Kausalpfad. Eine Revolution, die den Mobilitätssektor auf den Kopf stellt – von heute, nicht 2035.",
      tech:
        "AIX Neural Core = neuro-symbolische Architektur: Deep Perception + logikbasierte Planung & Policies + Explainability + World Model (CRDT) + Realtime Fabric + Trust Layer.",
      solutions: {
        edepot:
          "E-Depot: Ladefenster & Umläufe balancieren (SOC, Slots, Tarife, Grid-Mix), CO₂ & Kosten optimieren, SLA-fähig.",
        flotte:
          "Flottensteuerung: Fleet Health, Anomalie-Detektion, prädiktive Wartung, Routen & Uptime – global steuerbar.",
        ladeinfra:
          "Ladeinfrastruktur: vorausschauende Steuerung, Tarif-Peaks vermeiden, Auslastung & Wartung optimieren, Policy-geführt.",
      },
      api:
        "APIs für Events, Policies, Explainability & Telemetrie. Schnelle Integration in bestehende Systemlandschaften.",
      legal: {
        agb: "AGB (B2B): SaaS/On-Prem, Laufzeiten, Preise, SLA, IP, Vertraulichkeit, DSGVO/AVV, Haftung, Force Majeure, Gerichtsbarkeit.",
        impressum: "AIX Aleph UK Ltd (rebranding zu AIX Aleph PLC), Sitz London. Details auf /impressum.",
        datenschutz: "Datenschutz gem. DSGVO. Erklärbarkeit & Datensouveränität sind Architekturprinzipien.",
      },
      company:
        "Über uns: Team aus Engineers, Forscher:innen & Operators von Berlin bis Singapur. Mission: neuro-symbolische KI in die Realität bringen.",
      links: {
        demo: "/demo",
        dashboard: "/dashboard",
        tech: "/tech/overview",
        edepot: "/info/e-depot",
        flotte: "/info/flottensteuerung",
        ladeinfra: "/info/ladeinfrastruktur",
        agb: "/agb",
        impressum: "/impressum",
        datenschutz: "/datenschutz",
        karriere: "/karriere",
        kontakt: "/kontakt",
        preise: "/preise",
        blog: "/blog",
      },
      elevator:
        "AIX ALEPH vereint menschliches Urteilsvermögen und KI-Präzision. Wir orchestrieren Flotten, Energie & Prozesse – erklärbar, auditierbar, in Echtzeit.",
    }),
    []
  );

  function detectIntent(text) {
    const t = text.trim().toLowerCase();
    if (/^(hi|hallo|hey|servus|moin|grüß|hello|hei)\b/.test(t)) return { type: "greet" };
    if (t === "/help" || t.includes("hilfe")) return { type: "help" };
    if (t.startsWith("/links")) return { type: "links" };

    if (t.includes("neural core") || t.includes("technologie") || t.includes("tech"))
      return { type: "tech" };

    if (t.includes("e-depot") || t.includes("edepot")) return { type: "solution", key: "edepot" };
    if (t.includes("flotte") || t.includes("flottensteuerung")) return { type: "solution", key: "flotte" };
    if (t.includes("ladeinfra") || t.includes("ladestation") || t.includes("ladeinfrastruktur"))
      return { type: "solution", key: "ladeinfra" };

    if (t.includes("vision") || t.includes("manifest")) return { type: "vision" };
    if (t.includes("über uns") || t.includes("company") || t.includes("team")) return { type: "company" };

    if (t.includes("impressum")) return { type: "legal", key: "impressum" };
    if (t.includes("datenschutz") || t.includes("privacy")) return { type: "legal", key: "datenschutz" };
    if (t.includes("agb") || t.includes("bedingungen")) return { type: "legal", key: "agb" };

    if (t.includes("preis") || t.includes("plan")) return { type: "link", key: "preise" };
    if (t.includes("demo")) return { type: "link", key: "demo" };
    if (t.includes("dashboard")) return { type: "link", key: "dashboard" };

    if (t.includes("api") || t.includes("entwickler") || t.includes("developer")) return { type: "api" };

    return { type: "fallback" };
  }

  function respond(intent) {
    const L = KB.links;
    switch (intent.type) {
      case "greet":
        return "Willkommen bei AIX ALEPH! Was kann ich heute für dich tun?";
      case "help":
        return [
          "Ich helfe dir bei:",
          "• Technologie (Neural Core, Explainability, Policies)",
          "• Lösungen (E-Depot, Flottensteuerung, Ladeinfrastruktur)",
          "• Company & Legal (Über uns, AGB, Impressum, Datenschutz)",
          "• Navigation (/links) oder direkt: Demo, Dashboard, Preise",
        ].join("\n");
      case "links":
        return [
          `Wichtige Seiten:`,
          `• Demo: ${L.demo}`,
          `• Dashboard: ${L.dashboard}`,
          `• Technologie: ${L.tech}`,
          `• E-Depot: ${L.edepot}`,
          `• Flottensteuerung: ${L.flotte}`,
          `• Ladeinfrastruktur: ${L.ladeinfra}`,
          `• Preise: ${L.preise}`,
          `• Kontakt: ${L.kontakt}`,
          `• AGB: ${L.agb} · Impressum: ${L.impressum} · Datenschutz: ${L.datenschutz}`,
        ].join("\n");
      case "tech":
        return `${KB.tech}\nMehr: ${L.tech}`;
      case "solution":
        if (intent.key === "edepot") return `${KB.solutions.edepot}\nMehr: ${L.edepot}`;
        if (intent.key === "flotte") return `${KB.solutions.flotte}\nMehr: ${L.flotte}`;
        return `${KB.solutions.ladeinfra}\nMehr: ${L.ladeinfra}`;
      case "vision":
        return KB.vision;
      case "company":
        return KB.company;
      case "legal":
        if (intent.key === "impressum") return `${KB.legal.impressum}\n${L.impressum}`;
        if (intent.key === "datenschutz") return `${KB.legal.datenschutz}\n${L.datenschutz}`;
        return `${KB.legal.agb}\n${L.agb}`;
      case "link":
        return `Hier entlang: ${L[intent.key]}`;
      case "api":
        return `${KB.api}\nMehr: ${L.tech}`;
      default:
        return `${KB.elevator}\nTipp: Versuche „Neural Core“, „E-Depot“, „/links“ oder „AGB“.`;
    }
  }

  function push(role, text) {
    setMessages((m) => [...m, { role, text }]);
  }

  const onSend = (e) => {
    e.preventDefault();
    const val = input.trim();
    if (!val) return;
    push("user", val);
    setInput("");
    const intent = detectIntent(val);
    const reply = respond(intent);
    setTimeout(() => push("agent", reply), 300);
  };

  return (
    <div className="fixed bottom-4 right-4 z-[60]">
      {open ? (
        <div className="w-[320px] panel shadow-dc rounded-2xl overflow-hidden">
          <div className="px-3 py-2 flex items-center justify-between bg-[var(--color-surface)] border-b border-[var(--color-line)]">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--blurple)] text-white">♥</span>
              <span className="text-sm font-semibold">AIX ♥ Agent</span>
            </div>
            <button className="text-sm text-muted hover:text-white" onClick={() => setOpen(false)} aria-label="Agent schließen">
              ×
            </button>
          </div>

          <div className="p-3 h-56 overflow-auto space-y-2 text-sm">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-lg px-3 py-2 whitespace-pre-line ${
                  m.role === "agent"
                    ? "bg-[var(--color-surface)] border border-[var(--color-line)]"
                    : "bg-[rgba(255,255,255,0.06)] ml-auto"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>

          <form onSubmit={onSend} className="p-3 border-t border-[var(--color-line)] flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent border border-[var(--color-line)] rounded-md px-3 py-2 text-sm outline-none focus:border-[var(--color-primary)]"
              placeholder='Frag mich: „Neural Core“, „E-Depot“, „/links“…'
              aria-label="Agent Nachricht eingeben"
            />
            <button className="btn btn-primary text-sm px-4 py-2" type="submit">Senden</button>
          </form>
        </div>
      ) : (
        <button
          className="panel px-3 py-2 rounded-full flex items-center gap-2 hover:-translate-y-0.5 transition"
          onClick={() => setOpen(true)}
          aria-label="Agent öffnen"
        >
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--blurple)] text-white">♥</span>
          <span className="text-sm">Agent</span>
        </button>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
 * Hauptseite
 * ────────────────────────────────────────────────────────────── */
export default function Demo() {
  const [scenario, setScenario] = React.useState("E-Depot");

  return (
    <div className="space-y-10">
      <DemoHero />

      <section className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Toggle + Panel */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <h2 className="text-2xl md:text-3xl font-extrabold">Szenarien</h2>
          <ScenarioSwitch current={scenario} onChange={setScenario} />
        </div>
        <ScenarioPanel scenario={scenario} />

        {/* Timeline & KPIs */}
        <div className="grid gap-4 md:grid-cols-2 mt-6">
          <TodayTimeline />
          <div className="panel p-5">
            <h3 className="text-lg font-semibold">Live-KPIs (Demo)</h3>
            <p className="text-sm text-muted mt-1">Beispielhafte Kennzahlen für das gewählte Szenario.</p>
            <div className="grid gap-3 sm:grid-cols-2 mt-4">
              <KpiCard label="Kosten ggü. Baseline" value="−12 %" hint="Policy-geführt" />
              <KpiCard label="Uptime (heute)" value="99,3 %" hint="SLA erfüllt" />
              <KpiCard label="CO₂-Fußabdruck" value="−16 %" hint="Grid-Mix & Ladefenster" />
              <KpiCard label="Tickets gelöst" value="9 / 11" hint="heute · 2 offen" />
            </div>
            <div className="mt-4 text-sm">
              <Link to="/tech/overview" className="hover:text-[var(--color-primary)] underline">
                So rechnet der AIX Neural Core &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <h3 className="text-2xl font-extrabold">Bereit für die echte Fahrt?</h3>
          <p className="text-muted mt-2">Öffnen Sie das Dashboard oder sprechen Sie mit unserem Agenten.</p>
          <div className="mt-5 flex items-center justify-center gap-3">
            <Link to="/dashboard" className="btn btn-primary">Zum Dashboard</Link>
            <Link to="/kontakt" className="btn btn-ghost">Kontakt aufnehmen</Link>
          </div>
        </div>
      </section>

      {/* Floating Agent */}
      <AgentWidget />
    </div>
  );
}
