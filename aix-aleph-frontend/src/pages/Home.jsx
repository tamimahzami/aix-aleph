// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import HeroSystems from "../components/HeroSystems";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="space-y-12">
      {/* Hero */}
      <HeroSystems />

      {/* Feature-Cards – vorbereitet für Content-Wachstum */}
      <section className="mx-auto max-w-7xl px-4">
        <h2 className="text-2xl md:text-3xl font-bold">
          {t("home.featuresTitle")}
        </h2>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <article className="rounded-2xl border bg-white dark:bg-slate-900/50 p-5 hover:shadow-lg transition">
            <h3 className="font-semibold">{t("home.feature1")}</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Kombination aus Lernen & Logik für robuste Agenten in regulierten Domänen.
            </p>
            <Link
              to="/docs"
              className="mt-3 inline-block text-cyan-700 dark:text-cyan-300"
              aria-label="Zur Dokumentation"
            >
              {t("nav.docs")} →
            </Link>
          </article>

          <article className="rounded-2xl border bg-white dark:bg-slate-900/50 p-5 hover:shadow-lg transition">
            <h3 className="font-semibold">{t("home.feature2")}</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Konsistente Zustände bei sub-ms Latenzen – von Sensor bis Aktion.
            </p>
            <Link
              to="/solutions"
              className="mt-3 inline-block text-cyan-700 dark:text-cyan-300"
              aria-label="Lösungen ansehen"
            >
              {t("nav.solutions")} →
            </Link>
          </article>

          <article className="rounded-2xl border bg-white dark:bg-slate-900/50 p-5 hover:shadow-lg transition">
            <h3 className="font-semibold">{t("home.feature3")}</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Explainability, Policy-Durchsetzung & Secrets in Hardware-Enklaven.
            </p>
            <Link
              to="/pricing"
              className="mt-3 inline-block text-cyan-700 dark:text-cyan-300"
              aria-label="Preise und Pläne"
            >
              {t("nav.pricing")} →
            </Link>
          </article>
        </div>
      </section>

      {/* Preview-Teaser für Demo/Dashboard */}
      <section className="mx-auto max-w-7xl px-4">
        <div className="rounded-2xl border bg-white dark:bg-slate-900/50 p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold">{t("home.fromDashboard")}</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Probier die Guarded Routes & Token-Auth – ganz ohne Registrierung in der Demo.
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                to="/demo"
                className="rounded-xl bg-cyan-600 text-white px-4 py-2 hover:bg-cyan-500 transition"
                aria-label="Demo öffnen"
              >
                {t("nav.demo")}
              </Link>
              <Link
                to="/dashboard"
                className="rounded-xl border px-4 py-2 hover:bg-white/60 dark:hover:bg-white/10 transition"
                aria-label="Zum Dashboard (Login erforderlich)"
              >
                Dashboard (Login)
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
