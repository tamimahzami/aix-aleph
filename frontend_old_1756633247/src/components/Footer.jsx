import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <section className="footer-cta" aria-labelledby="cta-title">
          <h3 id="cta-title">Bereit für AI × Aleph?</h3>
          <p>Starte kostenlos oder erlebe die Demo live.</p>
          <div className="cta-actions" role="group" aria-label="Schnellstart">
            <Link to="/register" className="ftr-btn btn-primary">Kostenlos starten</Link>
            <Link to="/demo" className="ftr-btn btn-outline">Demo ansehen</Link>
          </div>
        </section>

        <div className="footer-bottom">
          <span>© {year} AIX Aleph</span>
          <nav className="footer-mini" aria-label="Rechtliches">
            <Link to="/privacy">Datenschutz</Link>
            <Link to="/terms">AGB</Link>
            <Link to="/imprint">Impressum</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
