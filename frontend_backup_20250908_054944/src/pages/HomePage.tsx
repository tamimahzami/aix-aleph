
// frontend/src/pages/HomePage.tsx
import React from "react";
import SEO from "../components/common/SEO";

export default function HomePage() {
  return (
    <>
      <SEO
        title="AIX ALEPH — Human ♥ AI Mobility OS"
        description="Agent OS für E-Depot-Orchestrierung, Flottensteuerung & Ladeinfrastruktur. Transparent, auditierbar, emissions- & kostenoptimiert."
        url="https://aixaleph.com/"
        image="/og/aix-aleph-og.jpg"
        siteName="AIX ALEPH"
      />

      {/* HERO mit Heartbeat-Wave */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cyan-600 via-blue-900 to-black text-white">
        <div className="mx-auto max-w-6xl px-6 pt-24 pb-20 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
            Human <span className="text-cyan-400">♥</span> AI
            <br /> The Mobility Operating System
          </h1>

          <p className="mt-6 text-lg md:text-xl opacity-80 max-w-3xl mx-auto">
            AIX ALEPH verbindet Flotten, Energie und Städte.
            Transparente KI-Agenten orchestrieren Laden, Kosten & CO₂ in Echtzeit.
          </p>

          {/* CTA */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="/register"
              className="px-6 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-600 font-bold shadow-lg"
            >
              Demo starten
            </a>
            <a
              href="/investor-relations"
              className="px-6 py-3 rounded-2xl border border-white/20 hover:bg-white/10 font-semibold"
            >
              Investor Relations
            </a>
          </div>

          {/* Animierte Heartbeat-Wave */}
          <div className="relative mt-14 mx-auto max-w-5xl">
            <HeartbeatWave />
          </div>
        </div>
      </section>

      {/* VALUE CARDS */}
      <section className="mx-auto max-w-6xl px-6 py-24 grid md:grid-cols-3 gap-8">
        {[
          {
            title: "E-Depot Orchestrierung",
            text: "Optimales Laden & Disposition von E-Bussen & Trucks – Kosten, Netzdienlichkeit & Batteriegesundheit.",
            icon: "⚡",
          },
          {
            title: "Fleet Intelligence",
            text: "Autonome KI-Agenten überwachen KPIs, Routen & Wartung. Weniger Ausfälle, planbare OPEX.",
            icon: "🧠",
          },
          {
            title: "CO₂ & Energy KPIs",
            text: "Echtzeit-Messung von Verbrauch, Emission & Effizienz. Reporting für Betreiber & Regulatoren.",
            icon: "��",
          },
        ].map((f) => (
          <div
            key={f.title}
            className="rounded-2xl bg-white/5 border border-white/10 p-8 hover:bg-white/10 transition"
          >
            <div className="text-4xl mb-4">{f.icon}</div>
            <h3 className="text-xl font-semibold">{f.title}</h3>
            <p className="mt-3 opacity-80">{f.text}</p>
          </div>
        ))}
      </section>

      {/* KPI LIVE */}
      <section className="bg-black/30 border-t border-white/10 py-20">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">Live Heartbeat KPIs</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white/5">
              <p className="text-3xl font-bold text-cyan-400">97%</p>
              <p className="opacity-70">Depot Efficiency</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5">
              <p className="text-3xl font-bold text-green-400">-42%</p>
              <p className="opacity-70">CO₂ Emissionen</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5">
              <p className="text-3xl font-bold text-yellow-400">15min</p>
              <p className="opacity-70">Avg. Charging Slot</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5">
              <p className="text-3xl font-bold text-pink-400">∞</p>
              <p className="opacity-70">Scalability</p>
            </div>
          </div>
        </div>
      </section>

      {/* HUMAN ♥ AI */}
      <section className="mx-auto max-w-6xl px-6 py-24 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
          Human <span className="text-cyan-400">♥</span> AI
        </h2>
        <p className="text-lg opacity-80 max-w-3xl mx-auto">
          AIX ALEPH ist das Mutterschiff für KI-Agenten in Mobilität, Energie & Smart Cities.
          Erklärbar. Auditierbar. Global skalierbar.
        </p>
      </section>
    </>
  );
}

/* ──────────────────────────────────────────────────────────────
   HeartbeatWave: Pulsierende EKG-Linie mit Glow & Gradient
   - Keine externen Styles nötig (Keyframes inline)
   - Skaliert responsiv, barrierefrei mit aria-hidden
   ────────────────────────────────────────────────────────────── */
function HeartbeatWave() {
  return (
    <div className="relative">
      {/* Glow hinter dem Pfad */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          filter: "blur(14px)",
          background:
            "radial-gradient(closest-side, rgba(34,211,238,0.20), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <svg
        viewBox="0 0 1200 220"
        role="img"
        aria-label="AIX ALEPH Heartbeat – Human ♥ AI"
        className="w-full h-[180px] md:h-[220px]"
      >
        <defs>
          <linearGradient id="hbLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="50%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#e879f9" />
          </linearGradient>

          {/* animierter gradient stroke */}
          <linearGradient id="hbAnim" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#22d3ee">
              <animate
                attributeName="offset"
                values="-0.2;1.2"
                dur="2.2s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="0.2" stopColor="#ffffff" />
            <stop offset="0.4" stopColor="#22d3ee" stopOpacity="0" />
          </linearGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Grundlinie */}
        <path
          d="M0 110 L1200 110"
          stroke="url(#hbLine)"
          strokeOpacity="0.25"
          strokeWidth="2"
          fill="none"
        />

        {/* Heartbeat-Kurve (EKG-like) */}
        <g filter="url(#glow)">
          <path
            d="
              M0 110
              L180 110
              C210 110, 220 60, 240 110
              L280 110
              L320 30
              L360 150
              L390 110
              L480 110
              C520 110, 540 80, 560 110
              L640 110
              L680 30
              L720 150
              L760 110
              L880 110
              C910 110, 930 60, 950 110
              L1000 110
              L1040 30
              L1080 150
              L1120 110
              L1200 110
            "
            stroke="url(#hbLine)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          {/* Laufendes „Pulse“-Highlight */}
          <path
            d="
              M0 110
              L180 110
              C210 110, 220 60, 240 110
              L280 110
              L320 30
              L360 150
              L390 110
              L480 110
              C520 110, 540 80, 560 110
              L640 110
              L680 30
              L720 150
              L760 110
              L880 110
              C910 110, 930 60, 950 110
              L1000 110
              L1040 30
              L1080 150
              L1120 110
              L1200 110
            "
            stroke="url(#hbAnim)"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
            style={{ mixBlendMode: "screen" }}
          />
        </g>
      </svg>

      {/* Keyframes (für fallback scale-pulse des SVG Containers) */}
      <style>{`
        @keyframes hb-scale {
          0% { transform: scale(1); }
          20% { transform: scale(1.015); }
          40% { transform: scale(1); }
          60% { transform: scale(1.015); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
