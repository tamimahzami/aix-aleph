// src/pages/Vision.tsx
export default function Vision() {
  return (
    <>
      {/* Intro */}
      <div className="message">
        <div className="message-avatar">AA</div>
        <div className="message-content">
          <div className="message-author">
            AIX Aleph Vision <span className="timestamp">Komfort zuerst • Grün im Kern</span>
          </div>
          <div className="message-text">
            Menschen ändern Verhalten, wenn es ihren Alltag verbessert. Darum liefert AIX Aleph
            sofort spürbaren <strong>Komfort</strong> – und senkt dabei <strong>unsichtbar</strong> den
            CO₂-Fußabdruck durch intelligente Energie-Orchestrierung.
          </div>
        </div>
      </div>

      {/* Value Props as cards */}
      <div className="message">
        <div className="message-avatar">KP</div>
        <div className="message-content">
          <div className="message-author">Wertversprechen</div>
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">⚡️</div>
              <h3>Komfort out-of-the-box</h3>
              <p>Smartes Laden ohne Denken: Auto anstecken, Rest macht Aleph. Weniger Wartezeit, planbare Kosten.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🧠</div>
              <h3>KI-Orchestrierung</h3>
              <p>Routen, Ladestops und Netzlast werden live optimiert – für Flotten & Privatnutzer.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌱</div>
              <h3>Grün im Hintergrund</h3>
              <p>Lastverschiebung, Ökostrom-Fenster und Forecasts reduzieren Emissionen – ganz ohne Mehraufwand.</p>
            </div>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="message">
        <div className="message-avatar">HW</div>
        <div className="message-content">
          <div className="message-author">So funktioniert’s</div>
          <div className="embed">
            <div className="embed-title">Mutterschiff-Architektur</div>
            <div className="embed-description">
              <ul style={{ marginLeft: 16, lineHeight: 1.6 }}>
                <li><code>Sensor → Erkennt</code>: Fahrzeugstatus, Netzpreise, Ladepunkte.</li>
                <li><code>Planner → Entscheidet</code>: Neuronale Routen & Ladefenster.</li>
                <li><code>Actuator → Steuert</code>: Start/Stop-Laden, Leistung, Abrechnung.</li>
              </ul>
            </div>
            <div className="embed-footer">Sicher • Skalierbar • API-first</div>
          </div>
        </div>
      </div>

      {/* Proof / KPIs */}
      <div className="message">
        <div className="message-avatar">📊</div>
        <div className="message-content">
          <div className="message-author">Impact (Demo-KPIs)</div>
          <div className="feature-grid">
            <div className="feature-card"><h3>−18–25% Energiekosten</h3><p>durch dynamische Tarife & Lastverschiebung</p></div>
            <div className="feature-card"><h3>−12–20% CO₂</h3><p>durch grüne Zeitfenster & Netzsignale</p></div>
            <div className="feature-card"><h3>+15% Auslastung</h3><p>durch bessere Planung & Routing</p></div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="message">
        <div className="message-avatar">→</div>
        <div className="message-content">
          <div className="message-author">Nächster Schritt</div>
          <div className="message-text">
            Starte mit der Demo-Flotte oder verknüpfe deine bestehende Ladeinfrastruktur.
          </div>
          <div style={{ marginTop: 8 }}>
            <a className="btn-primary" href="/experiments">Live-Dashboard öffnen</a>
            <button className="btn-secondary" style={{ marginLeft: 8 }}>Whitepaper anfordern</button>
          </div>
        </div>
      </div>
    </>
  );
}
