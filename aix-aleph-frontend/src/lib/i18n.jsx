// src/lib/i18n.jsx
import React, { createContext, useContext, useMemo, useState } from "react";

const dict = {
  de: {
    app: "AIX Aleph Mobility",
    links: {
      home: "Start",
      demo: "Demo",
      login: "Login",
      register: "Registrieren",
      dashboard: "Dashboard",
      experiments: "Experimente",
    },
    hero: {
      title: "Optimierte E-Mobility Experimente, sofort einsatzbereit",
      subtitle:
        "Starte A/B-Tests, messe Impact und skaliere Erkenntnisse – sicher, schnell und ohne Overhead.",
      ctaPrimary: "Jetzt starten",
      ctaSecondary: "Live-Demo ansehen",
    },
    features: {
      f1Title: "Guarded Routes",
      f1Desc: "Geschützte Daten nur für eingeloggte Nutzer.",
      f2Title: "Token-Auth",
      f2Desc: "JWT im Header, LocalStorage Handling inklusive.",
      f3Title: "Schnelle API",
      f3Desc: "Saubere REST Endpoints für Experimente & KPIs.",
    },
    demoTeaser: {
      title: "Neugierig?",
      desc: "Die Live-Demo zeigt Health & KPIs – echte Daten siehst du nach Anmeldung.",
    },
    footer: {
      rights: "Alle Rechte vorbehalten.",
      legal: "Impressum",
      privacy: "Datenschutz",
      terms: "AGB",
      pricing: "Preise",
      contact: "Kontakt",
      sales: "Sales",
      developers: "Entwickler",
    },
    auth: {
      loggedInAs: "Eingeloggt als",
      logout: "Logout",
    },
  },
  en: {
    app: "AIX Aleph Mobility",
    links: {
      home: "Home",
      demo: "Demo",
      login: "Login",
      register: "Register",
      dashboard: "Dashboard",
      experiments: "Experiments",
    },
    hero: {
      title: "Optimized e-mobility experiments, ready to ship",
      subtitle:
        "Launch A/B tests, measure impact, and scale insights—securely, fast, with zero overhead.",
      ctaPrimary: "Get started",
      ctaSecondary: "View live demo",
    },
    features: {
      f1Title: "Guarded routes",
      f1Desc: "Protected data only for authenticated users.",
      f2Title: "Token auth",
      f2Desc: "JWT via header, LocalStorage handling included.",
      f3Title: "Fast API",
      f3Desc: "Clean REST endpoints for experiments & KPIs.",
    },
    demoTeaser: {
      title: "Curious?",
      desc: "Live demo shows health & KPIs—sign in to access real data.",
    },
    footer: {
      rights: "All rights reserved.",
      legal: "Imprint",
      privacy: "Privacy",
      terms: "Terms",
      pricing: "Pricing",
      contact: "Contact",
      sales: "Sales",
      developers: "Developers",
    },
    auth: {
      loggedInAs: "Logged in as",
      logout: "Logout",
    },
  },
};

const I18nCtx = createContext(null);

export function I18nProvider({ children, defaultLocale = "de" }) {
  const [locale, setLocale] = useState(() => {
    const saved = localStorage.getItem("AIX_LOCALE");
    return saved || defaultLocale;
  });

  const t = useMemo(() => {
    const bag = dict[locale] || dict.de;
    return function translate(path, fallback = "") {
      const parts = path.split(".");
      let cur = bag;
      for (const p of parts) cur = cur?.[p];
      return cur ?? fallback ?? path;
    };
  }, [locale]);

  const value = useMemo(
    () => ({
      t,
      locale,
      setLocale: (l) => {
        const next = l === "en" ? "en" : "de";
        localStorage.setItem("AIX_LOCALE", next);
        setLocale(next);
      },
    }),
    [t, locale]
  );

  return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nCtx);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

// Simple language switcher UI
export function LangSwitcher({ className = "" }) {
  const { locale, setLocale } = useI18n();
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <button
        onClick={() => setLocale("de")}
        className={`px-2 py-1 rounded-lg border text-xs ${locale === "de" ? "bg-white/60 dark:bg-white/10" : ""}`}
        aria-pressed={locale === "de"}
      >
        DE
      </button>
      <button
        onClick={() => setLocale("en")}
        className={`px-2 py-1 rounded-lg border text-xs ${locale === "en" ? "bg-white/60 dark:bg-white/10" : ""}`}
        aria-pressed={locale === "en"}
      >
        EN
      </button>
    </div>
  );
}
