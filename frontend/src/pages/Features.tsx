export default function Features() {
  return (
    <>
      <h1 className="page-title">Funktionen</h1>
      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon"><i className="fas fa-brain" /></div>
          <h3 className="feature-title">Experimente</h3>
          <p className="feature-description">
            A/B-Tests, Metriken, Dashboard – alles integriert.
          </p>
        </div>
        <div className="feature-card">
          <div className="feature-icon"><i className="fas fa-chart-bar" /></div>
          <h3 className="feature-title">Analytics</h3>
          <p className="feature-description">
            Überblick über KPIs, Trends und Impact-Messung.
          </p>
        </div>
        <div className="feature-card">
          <div className="feature-icon"><i className="fas fa-robot" /></div>
          <h3 className="feature-title">Automation</h3>
          <p className="feature-description">
            Workflows und Trigger für wiederkehrende Aufgaben.
          </p>
        </div>
      </div>
    </>
  );
}
