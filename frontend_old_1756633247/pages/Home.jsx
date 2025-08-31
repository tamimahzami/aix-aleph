import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./home.css"; // eigener Stylesplit (siehe unten)

export default function Home() {
  // Scroll-Animationen für Cards (Features/Testimonials)
  useEffect(() => {
    const targets = document.querySelectorAll(".feature-card, .testimonial-card");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && e.target.classList.add("animated"));
      },
      { threshold: 0.1 }
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <main className="landing">
      {/* HERO */}
      <section className="hero" id="home">
        <div className="container hero-grid">
          <div className="hero-content">
            <h1>Innovative Lösungen für die digitale Transformation</h1>
            <p>
              AIX Aleph liefert maßgeschneiderte Technologie für Unternehmen, die in der
              digitalen Welt wachsen: von KI über OT-Integration bis Cloud – sicher, skalierbar,
              produktionsnah.
            </p>
            <div className="hero-buttons">
              <Link to="/register" className="btn">Kostenlos starten</Link>
              <a href="#features" className="btn btn-outline">Mehr erfahren</a>
            </div>
          </div>

          {/* Dekorative Illustration (inline SVG – keine externen Icons nötig) */}
          <div className="hero-art">
            <svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <rect x="0" y="0" width="600" height="400" fill="#f0f8ff" />
              <circle cx="450" cy="150" r="80" fill="#6aa6ff" opacity="0.15" />
              <circle cx="350" cy="250" r="50" fill="#22d3ee" opacity="0.15" />
              <rect x="100" y="100" width="300" height="200" rx="20" fill="#ffffff" stroke="#6aa6ff" strokeWidth="2" />
              <circle cx="180" cy="180" r="40" fill="#22d3ee" opacity="0.25" />
              <path d="M220 150 L300 150 L300 230 L220 230 Z" fill="#2563eb" opacity="0.7" />
              <path d="M150 150 L190 150 L190 230 L150 230 Z" fill="#1e40af" opacity="0.7" />
              <circle cx="250" cy="250" r="20" fill="#22d3ee" />
            </svg>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features" id="features">
        <div className="container">
          <div className="section-title">
            <h2>Unsere Kernkompetenzen</h2>
            <p>Entdecken Sie maßgeschneiderte Lösungen für Ihr Unternehmen</p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🧠</div>
              <h3>Künstliche Intelligenz</h3>
              <p>
                Prognosen, Optimierungen &amp; Assistenz – direkt für Flotte und Produktion,
                sicher in Ihre IT/OT integriert.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">☁️</div>
              <h3>Cloud &amp; Edge</h3>
              <p>
                Skalierbare Cloud-Workloads und Edge-Dienste für niedrige Latenzen in
                sensiblen OT-Netzen.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3>Cybersecurity</h3>
              <p>
                Zero-Trust by design: Ende-zu-Ende-Sicherheit, Least-Privilege und
                kontinuierliches Monitoring.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📈</div>
              <h3>Datenanalyse</h3>
              <p>
                Von Rohdaten zu Insights: Dashboards, Ad-hoc-Analysen und ML-Pipelines
                für fundierte Entscheidungen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about" id="about">
        <div className="container about-grid">
          <div className="about-text">
            <h2>Wir gestalten die Zukunft der Technologie</h2>
            <p>
              AIX Aleph ist ein Technologiepartner mit Fokus auf KI, OT-Integration und
              sichere Plattformen. Seit 2010 unterstützen wir Unternehmen bei der
              digitalen Transformation – praxisnah und messbar.
            </p>
            <p>
              Unser Team verbindet Domänenwissen mit exzellenter Umsetzung. Ergebnis:
              Lösungen, die laufen – und echten Mehrwert liefern.
            </p>
            <Link to="/about" className="btn btn-accent">Unser Team kennenlernen</Link>
          </div>

          <div className="about-art">
            <svg viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <rect x="0" y="0" width="500" height="400" fill="#f8f9fa" />
              <rect x="50" y="50" width="400" height="300" rx="20" fill="#ffffff" stroke="#6aa6ff" strokeWidth="2" />
              <circle cx="150" cy="150" r="60" fill="#22d3ee" opacity="0.2" />
              <circle cx="350" cy="150" r="40" fill="#2563eb" opacity="0.2" />
              <rect x="100" y="220" width="120" height="60" rx="10" fill="#2563eb" opacity="0.7" />
              <rect x="280" y="220" width="120" height="60" rx="10" fill="#22d3ee" opacity="0.7" />
              <path d="M200 100 L300 100 L300 180 L200 180 Z" fill="#1e40af" opacity="0.7" />
              <circle cx="250" cy="280" r="20" fill="#22d3ee" />
            </svg>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials" id="testimonials">
        <div className="container">
          <div className="section-title">
            <h2>Was unsere Kunden sagen</h2>
            <p>Erfolgsgeschichten aus Projekten mit AIX Aleph</p>
          </div>

          <div className="testimonial-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                „Die KI-Optimierungen von AIX Aleph haben unsere Effizienz um 40 % erhöht
                und die Kosten signifikant gesenkt.“
              </div>
              <div className="testimonial-author">
                <div className="avatar">MS</div>
                <div>
                  <strong>Markus Schmidt</strong>
                  <div className="muted">CTO, TechInnovate GmbH</div>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-content">
                „Cloud-Migration nahtlos und störungsfrei – technisch top und
                immer business-orientiert.“
              </div>
              <div className="testimonial-author">
                <div className="avatar">SF</div>
                <div>
                  <strong>Sarah Fischer</strong>
                  <div className="muted">IT-Direktorin, Global Retail Group</div>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-content">
                „Zero-Trust-Architektur von AIX Aleph hat uns vor einem
                potenziell schweren Angriff bewahrt.“
              </div>
              <div className="testimonial-author">
                <div className="avatar">TW</div>
                <div>
                  <strong>Thomas Weber</strong>
                  <div className="muted">CEO, FinanzService AG</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta" id="contact">
        <div className="container">
          <h2>Starten Sie Ihre digitale Transformation</h2>
          <p>
            Sichern Sie sich eine kostenlose Erstberatung – und sehen Sie, wie AIX Aleph
            Ihr Unternehmen voranbringt.
          </p>
          <Link to="/register" className="btn cta-btn">Jetzt Termin vereinbaren</Link>
        </div>
      </section>
    </main>
  );
}
