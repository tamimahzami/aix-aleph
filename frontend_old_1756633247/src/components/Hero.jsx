// src/components/Hero.jsx
import React from "react";
import { useI18n } from "../i18n/I18nProvider";
import "./Hero.css";

export default function Hero() {
  const { t } = useI18n();

  return (
    <section className="hero">
      <div className="hero-container">
        <h1 className="hero-title">{t("hero.title")}</h1>
        <p className="hero-subtitle">{t("hero.subtitle")}</p>
        <p className="hero-description">{t("hero.description")}</p>

        <div className="hero-cta">
          <button className="btn btn-primary">{t("cta.start")}</button>
          <button className="btn btn-secondary">{t("cta.login")}</button>
        </div>

        <div className="hero-stats">
          <div className="stat">
            <span className="stat-value">+40%</span>
            <span className="stat-label">{t("stats.efficiency")}</span>
          </div>
          <div className="stat">
            <span className="stat-value">-35%</span>
            <span className="stat-label">{t("stats.downtime")}</span>
          </div>
          <div className="stat">
            <span className="stat-value">99.9%</span>
            <span className="stat-label">{t("stats.security")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
