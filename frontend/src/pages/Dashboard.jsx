// src/pages/Dashboard.jsx
import React from "react";
import ContainerMax from "../components/common/ContainerMax.jsx";

/** Badge – nutzt nur Inline-Styles + Design-Tokens, kein Tailwind */
function Badge({ tone = "info", children }) {
  const tones = {
    ok:   { bg: "rgba(0,162,255,.12)", bc: "rgba(0,162,255,.35)", ink: "var(--ink)" },       // primary-ish
    info: { bg: "rgba(0,162,255,.12)", bc: "rgba(0,162,255,.35)", ink: "var(--ink)" },       // primary
    warn: { bg: "rgba(255,159,28,.12)", bc: "rgba(255,159,28,.35)", ink: "#FFBE55" },        // amber
    err:  { bg: "rgba(255,77,77,.12)",  bc: "rgba(255,77,77,.35)",  ink: "#FF8A8A" },        // red
  }[tone];

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        borderRadius: "9999px",
        border: `1px solid ${tones.bc}`,
        background: tones.bg,
        color: tones.ink,
        padding: "6px 12px",
        fontSize: "0.875rem",
        lineHeight: "1.25rem",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

/** KPI-Karte */
function Kpi({ label, value, sub }) {
  return (
    <div className="card">
      <div className="text-sm muted">{label}</div>
      <div style={{ marginTop: 4, fontSize: "1.5rem", fontWeight: 800 }}>{value}</div>
      {sub && <div className="muted" style={{ marginTop: 4, fontSize: "0.9rem", opacity: 0.9 }}>{sub}</div>}
    </div>
  );
}

/** Balken-Komponente */
function Bar({ pct = 0, labelLeft, labelRight }) {
  const clamped = Math.min(Math.max(pct, 0), 100);
  return (
    <div className="card">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: "0.9rem",
        }}
        className="muted"
      >
        <span>{labelLeft}</span>
        <span>{labelRight}</span>
      </div>
      <div
        style={{
          marginTop: 12,
          height: 12,
          width: "100%",
          overflow: "hidden",
          borderRadius: 999,
          background: "rgba(255,255,255,.08)",
          border: "1px solid var(--line)",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${clamped}%`,
            borderRadius: 999,
            background: "var(--primary)",
            transition: "width .25s ease",
          }}
        />
      </div>
    </div>
  );
}

/** Timeline-Item */
function TimelineItem({ time, title, detail, tone = "info" }) {
  const dot = {
    info: "var(--primary)",
    ok:   "var(--primary)",
    warn: "#FF9F1C",
    err:  "#FF4D4D",
  }[tone];

  return (
    <div style={{ position: "relative", paddingLeft: 24 }}>
      <span
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          top: 8,
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: dot,
        }}
      />
      <div className="muted" style={{ fontSize: "0.9rem" }}>{time}</div>
      <div style={{ fontWeight: 600 }}>{title}</div>
      {detail && <div style={{ fontSize: "0.9rem", opacity: 0.9 }}>{detail}</div>}
    </div>
  );
}

export default function Dashboard() {
  return (
    <section className="page-section">
      <ContainerMax>
        {/* Headline + Actions */}
        <div
          className="flex items-center justify-between"
          style={{ gap: 12, flexWrap: "wrap", alignItems: "flex-end" }}
        >
          <div>
            <h1 className="accent-text" style={{ fontSize: "1.875rem", lineHeight: "2.25rem", fontWeight: 800 }}>
              Operations-Cockpit
            </h1>
            <p className="muted" style={{ marginTop: 6, maxWidth: "70ch" }}>
              Klare Übersicht über Flotte, Energie und Lade-Orchestrierung. Sicher, auditierbar, menschzentriert.
            </p>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn">Simulation starten</button>
            <button className="btn btn-ghost">Report erzeugen</button>
          </div>
        </div>

        {/* Health badges */}
        <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 8 }}>
          <Badge tone="ok">Uptime 99.2%</Badge>
          <Badge tone="info">CO₂-Intensität 142 g/kWh</Badge>
          <Badge tone="warn">Peak-Last heute 82% der Schwelle</Badge>
          <Badge tone="ok">Kosten −12% vs. Ø</Badge>
        </div>

        {/* KPI grid */}
        <div
          style={{
            marginTop: 16,
            display: "grid",
            gap: 16,
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          }}
        >
          <Kpi label="Verfügbare Fahrzeuge" value="128 / 140" sub="+3 seit 08:00" />
          <Kpi label="Ladepunkte aktiv" value="42 / 48" sub="6 warten auf Slot" />
          <Kpi label="Durchschnittliche SoC" value="78%" sub="+5% seit Nachtladung" />
          <Kpi label="Progn. Reichweite" value="412 km" sub="Standardprofil" />
        </div>

        {/* Main grid */}
        <div
          style={{
            marginTop: 20,
            display: "grid",
            gap: 20,
            gridTemplateColumns: "1fr",
          }}
        >
          {/* Responsive: 2/3 + 1/3 ab ~1024px */}
          <div
            style={{
              display: "grid",
              gap: 20,
              gridTemplateColumns: "1fr",
            }}
          >
            {/* Energie & Ladung */}
            <div className="card">
              <div
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
              >
                <h2 style={{ fontSize: "1.25rem", fontWeight: 700 }}>Energie & Ladung</h2>
                <span className="muted" style={{ fontSize: "0.9rem" }}>Live 15s</span>
              </div>

              <div
                style={{
                  marginTop: 16,
                  display: "grid",
                  gap: 16,
                  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                }}
              >
                <Bar pct={64} labelLeft="Aktuelle Netzauslastung" labelRight="64%" />
                <Bar pct={38} labelLeft="PV-Eigenanteil" labelRight="38%" />
                <Bar pct={82} labelLeft="Peak-Schwelle heute" labelRight="82%" />
                <Bar pct={55} labelLeft="Kostenbudget (Monat)" labelRight="55%" />
              </div>
            </div>

            {/* Flottenstatus */}
            <div className="card">
              <div
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
              >
                <h2 style={{ fontSize: "1.25rem", fontWeight: 700 }}>Flottenstatus</h2>
                <span className="muted" style={{ fontSize: "0.9rem" }}>Letzte Aktualisierung: 12s</span>
              </div>

              <div
                style={{
                  marginTop: 16,
                  overflow: "hidden",
                  borderRadius: 14,
                  border: "1px solid var(--line)",
                }}
              >
                <table style={{ width: "100%", fontSize: "0.95rem", borderCollapse: "separate", borderSpacing: 0 }}>
                  <thead style={{ background: "rgba(255,255,255,.05)" }}>
                    <tr style={{ textAlign: "left" }}>
                      <th style={{ padding: "8px 12px" }}>Fahrzeug</th>
                      <th style={{ padding: "8px 12px" }}>SoC</th>
                      <th style={{ padding: "8px 12px" }}>Status</th>
                      <th style={{ padding: "8px 12px" }}>Nächster Einsatz</th>
                      <th style={{ padding: "8px 12px", textAlign: "right" }}>Aktionen</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: "E-VAN-12", soc: 91, status: "Bereit", next: "08:45 Tour C" },
                      { id: "E-BUS-04", soc: 63, status: "Lädt", next: "09:10 Linie 2" },
                      { id: "E-TRUCK-07", soc: 34, status: "Queue", next: "10:00 Depot-Run" },
                      { id: "E-CAR-22", soc: 77, status: "Unterwegs", next: "—" },
                    ].map((r, idx) => (
                      <tr key={r.id} style={{ borderTop: idx === 0 ? "none" : "1px solid var(--line)" }}>
                        <td style={{ padding: "8px 12px", fontWeight: 600 }}>{r.id}</td>
                        <td style={{ padding: "8px 12px" }}>{r.soc}%</td>
                        <td style={{ padding: "8px 12px" }}>{r.status}</td>
                        <td style={{ padding: "8px 12px" }}>{r.next}</td>
                        <td style={{ padding: "8px 12px", textAlign: "right" }}>
                          <div style={{ display: "inline-flex", gap: 8 }}>
                            <button className="btn btn-ghost" style={{ padding: "6px 8px", fontSize: "0.8rem" }}>
                              Details
                            </button>
                            <button className="btn" style={{ padding: "6px 8px", fontSize: "0.8rem" }}>
                              Dispatch
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Rechte Spalte */}
          <div style={{ display: "grid", gap: 20 }}>
            <div className="card">
              <div
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
              >
                <h2 style={{ fontSize: "1.25rem", fontWeight: 700 }}>Warnungen</h2>
                <button className="btn btn-ghost" style={{ padding: "6px 10px", fontSize: "0.8rem" }}>
                  Stummschalten
                </button>
              </div>
              <ul style={{ marginTop: 12, display: "grid", gap: 12 }}>
                <li className="panel">
                  <div
                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
                  >
                    <div style={{ fontWeight: 600 }}>Peak-Risiko 10:00–11:00</div>
                    <Badge tone="warn">Tarif: hoch</Badge>
                  </div>
                  <div className="muted" style={{ marginTop: 6, fontSize: "0.9rem" }}>
                    Ladelast wird auf Rampen B/C verschoben.
                  </div>
                </li>
                <li className="panel">
                  <div
                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
                  >
                    <div style={{ fontWeight: 600 }}>E-TRUCK-07 niedriger SoC</div>
                    <Badge tone="err">34%</Badge>
                  </div>
                  <div className="muted" style={{ marginTop: 6, fontSize: "0.9rem" }}>
                    Priorisierte Schnellladung in 12 min eingeplant.
                  </div>
                </li>
                <li className="panel">
                  <div
                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
                  >
                    <div style={{ fontWeight: 600 }}>Energiepreis fällt</div>
                    <Badge tone="ok">−7%</Badge>
                  </div>
                  <div className="muted" style={{ marginTop: 6, fontSize: "0.9rem" }}>
                    Fenster 02:00–05:00 für Bulk-Ladung gesetzt.
                  </div>
                </li>
              </ul>
            </div>

            <div className="card">
              <div
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
              >
                <h2 style={{ fontSize: "1.25rem", fontWeight: 700 }}>Live-Events</h2>
                <span className="muted" style={{ fontSize: "0.9rem" }}>Stream</span>
              </div>
              <div style={{ marginTop: 12, display: "grid", gap: 12 }}>
                <TimelineItem time="08:21" title="Depot-Schedule aktualisiert" detail="4 Ladevorgänge umverteilt" tone="info" />
                <TimelineItem time="08:16" title="Peak-Shield aktiv" detail="Ramp A gedrosselt (−12%)" tone="warn" />
                <TimelineItem time="08:12" title="E-BUS-04: Ladung gestartet" detail="Slot C2, 120 kW" tone="ok" />
                <TimelineItem time="08:08" title="Tarif-Update" detail="Day-Ahead Preise eingespielt" tone="info" />
              </div>
            </div>

            <div className="card">
              <h2 style={{ fontSize: "1.25rem", fontWeight: 700 }}>Operator Controls</h2>
              <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
                <button className="btn" style={{ width: "100%" }}>Depot-Ansicht öffnen</button>
                <button className="btn btn-ghost" style={{ width: "100%" }}>Export: Tagesreport</button>
                <button className="btn btn-ghost" style={{ width: "100%" }}>Regeln anpassen (CO₂ / Kosten)</button>
              </div>
              <p className="muted" style={{ marginTop: 12, fontSize: "0.9rem" }}>
                Änderungen sind auditierbar. AIX plant vorausschauend und passt Lasten intelligent an.
              </p>
            </div>
          </div>
        </div>
      </ContainerMax>

      {/* Responsives 2-Spalten-Layout ab 1024px */}
      <style>{`
        @media (min-width: 1024px){
          section .container-max > div:nth-of-type(3){
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 20px;
          }
        }
      `}</style>
    </section>
  );
}
