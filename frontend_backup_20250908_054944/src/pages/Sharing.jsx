import React from "react";
import { Link } from "react-router-dom";

export default function Sharing() {
  return (
    <main>
      {/* HERO */}
      <section className="bg-hero-gradient">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16 md:py-24">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <div className="inline-flex items-center gap-2 chip chip-on sticker">
                <span className="w-2 h-2 rounded-full" style={{ background: "var(--color-primary)" }} />
                Sharing is caring · Open Mobility
              </div>

              <h1 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight">
                Wissen teilen. <span className="neon">Mobilität beschleunigen.</span>
              </h1>

              <p className="mt-4 text-lg text-muted max-w-[60ch]">
                AIX Aleph steht für Offenheit: Ergebnisse, Best Practices und Tools werden so oft wie möglich
                geteilt – damit Städte, Startups, Hochschulen und Hersteller gemeinsam schneller vorankommen.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/register" className="btn btn-primary neon">Mitmachen</Link>
                <a href="#partner" className="btn btn-ghost focusable">Partner werden</a>
              </div>
            </div>

            {/* Deko/KPI */}
            <div className="panel elev rounded-[var(--radius-xl)] p-6">
              <div className="text-sm text-muted">Impact (Beispiel)</div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {[
                  { label: "Open Datasets", val: "42" },
                  { label: "Student Projects", val: "180+" },
                  { label: "Partner Orgs", val: "65" },
                  { label: "Cities reached", val: "28" },
                ].map((k) => (
                  <div key={k.label} className="kpi">
                    <h4>{k.label}</h4>
                    <div className="val mt-1">{k.val}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-sm text-muted">
                * Demo-Daten. Live-Metriken folgen über API.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 SÄULEN */}
      <section className="py-16">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-extrabold">Unsere drei Säulen des Teilens</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <article className="panel p-6">
              <div className="chip">#1 Open Knowledge</div>
              <h3 className="mt-3 text-xl font-bold">Playbooks & Best Practices</h3>
              <p className="mt-2 text-muted">
                Von Ladeinfrastruktur bis Flottensteuerung – dokumentierte Rezepte, die Teams sofort einsetzen können.
              </p>
            </article>

            <article className="panel p-6">
              <div className="chip">#2 Open Interfaces</div>
              <h3 className="mt-3 text-xl font-bold">APIs & Referenz-Implementierungen</h3>
              <p className="mt-2 text-muted">
                Saubere, versionierte Schnittstellen und Beispielprojekte, die Integration leicht machen.
              </p>
            </article>

            <article className="panel p-6">
              <div className="chip">#3 Open Community</div>
              <h3 className="mt-3 text-xl font-bold">Programm für Partner & Campus</h3>
              <p className="mt-2 text-muted">
                Challenge Weeks, Fellowships und Mentoring – gemeinsam mit Unis, Startups und Städten.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* PARTNER/COMMUNITY */}
      <section id="partner" className="py-16">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
          <div className="panel p-6 rounded-[var(--radius-xl)]">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h3 className="text-2xl font-extrabold">Werde Teil der AIX Community</h3>
                <p className="mt-2 text-muted">
                  Du leitest ein Labor, eine Stadtflotte oder ein Startup? Lass uns Piloten starten – mit echten KPIs.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link to="/register" className="btn btn-primary">Jetzt anmelden</Link>
                <a className="btn btn-ghost" href="mailto:hello@aix-aleph.org">Kontakt aufnehmen</a>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {["Städte", "Hochschulen", "Startups", "Hersteller"].map((t) => (
                <div key={t} className="bg-surface-2 ring-line rounded-xl p-4">
                  <div className="text-sm text-muted">Programm</div>
                  <div className="mt-1 font-semibold">{t}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden py-16">
        <div className="absolute inset-0 bg-final-cta pointer-events-none" />
        <div className="relative max-w-[1100px] mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Sharing is caring – mach mit!
          </h2>
          <p className="mt-3 text-white/85 max-w-2xl mx-auto">
            Gemeinsam schaffen wir die Infrastruktur für die Mobilität von morgen.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/register" className="btn btn-primary">Kostenlos registrieren</Link>
            <Link to="/login" className="btn btn-ghost">Ich habe schon einen Account</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
