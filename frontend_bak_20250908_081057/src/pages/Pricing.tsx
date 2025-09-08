export default function Pricing() {
  return (
    <>
      <h1 className="page-title">Preise</h1>
      <div className="pricing-cards">
        <div className="pricing-card">
          <h3 className="plan-name">Basic</h3>
          <div className="plan-price">€29 / Monat</div>
          <ul className="plan-features">
            <li>5 Benutzer</li>
            <li>100 GB</li>
            <li>Standard-Support</li>
          </ul>
          <button className="plan-button">Auswählen</button>
        </div>
        <div className="pricing-card popular">
          <h3 className="plan-name">Pro</h3>
          <div className="plan-price">€79 / Monat</div>
          <ul className="plan-features">
            <li>20 Benutzer</li>
            <li>500 GB</li>
            <li>Prioritäts-Support</li>
          </ul>
          <button className="plan-button">Auswählen</button>
        </div>
        <div className="pricing-card">
          <h3 className="plan-name">Enterprise</h3>
          <div className="plan-price">Auf Anfrage</div>
          <ul className="plan-features">
            <li>Unbegrenzt</li>
            <li>Unbegrenzt</li>
            <li>24/7 Support</li>
          </ul>
          <button className="plan-button">Kontakt</button>
        </div>
      </div>
    </>
  );
}
