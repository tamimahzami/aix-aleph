import React from "react";

export default function Home() {
  return (
    <div>
      <Hero />
      <Features />
      <CTA />
      <SubFooter />
    </div>
  );
}

function Hero() {
  return (
    <section style={{ display: "grid", gap: 16, padding: "32px 0" }}>
      <h1 style={{ margin: 0, fontSize: 38, lineHeight: 1.1 }}>
        Test- & Routing-Plattform für <span style={{ color: "#0ea5e9" }}>AI-Erlebnisse</span>
      </h1>
      <p style={{ color: "#475569", fontSize: 18, maxWidth: 720 }}>
        Shippe A/B- und Canary-Experimente, rotiere Modelle intelligent und triff datengetriebene Entscheidungen –
        mit einem schlanken Dashboard und einer robusten API.
      </p>
      <div style={{ display: "flex", gap: 12 }}>
        <a href="/experiments" style={btnPrimary}>Experiments ansehen</a>
        <a href="#features" style={btnGhost}>Wie es funktioniert</a>
      </div>
    </section>
  );
}

function Features() {
  const items = [
    { h: "A/B & Canary", p: "Erzeuge Experimente in Sekunden und verteile Traffic zuverlässig." },
    { h: "Live-Metriken", p: "Sammle KPIs pro Arm; triff Promotion-Entscheidungen faktenbasiert." },
    { h: "Einfache API", p: "Saubere Endpoints für Create/List/Delete inkl. CORS & Proxy." },
    { h: "Zero-Config Dev", p: "CRA Proxy + Express – sofort startklar lokal." },
  ];
  return (
    <section id="features" style={{ padding: "16px 0" }}>
      <h2 style={{ fontSize: 28, marginBottom: 16 }}>Features</h2>
      <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
        {items.map((x, i) => (
          <div key={i} style={card}>
            <div style={{ fontWeight: 800, marginBottom: 6 }}>{x.h}</div>
            <div style={{ color: "#475569" }}>{x.p}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="get-started" style={{ padding: "28px 16px", marginTop: 24, background: "#0f172a", borderRadius: 16, color: "#fff" }}>
      <h3 style={{ marginTop: 0, fontSize: 24 }}>Bereit für den ersten Test?</h3>
      <p style={{ color: "rgba(255,255,255,.8)", marginBottom: 16 }}>
        Erstelle ein Experiment und verteile 50/50 auf Champion/Challenger – live in deiner lokalen DB.
      </p>
      <a href="/experiments" style={btnLight}>Jetzt Experiment erstellen</a>
    </section>
  );
}

function SubFooter() {
  return (
    <section style={{ marginTop: 24, color: "#64748b", fontSize: 14 }}>
      Made with ❤️ – lokal lauffähig, produktionsreif erweiterbar.
    </section>
  );
}

const card = {
  background: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: 12,
  padding: 14,
};

const btnPrimary = {
  padding: "10px 14px",
  borderRadius: 10,
  border: "1px solid #0f172a",
  background: "#0f172a",
  color: "#fff",
  textDecoration: "none",
};

const btnGhost = {
  padding: "10px 14px",
  borderRadius: 10,
  border: "1px solid #cbd5e1",
  background: "#fff",
  color: "#0f172a",
  textDecoration: "none",
};

const btnLight = {
  padding: "10px 14px",
  borderRadius: 10,
  border: "1px solid rgba(255,255,255,.25)",
  background: "#ffffff",
  color: "#0f172a",
  textDecoration: "none",
};
