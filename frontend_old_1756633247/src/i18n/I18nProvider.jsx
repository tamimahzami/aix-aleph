// src/i18n/I18nProvider.jsx
import React, { createContext, useContext, useMemo } from "react";
import i18n from "i18next";
import { I18nextProvider, initReactI18next, useTranslation } from "react-i18next";

const resources = {
  de: {
    translation: {
      nav: { home: "Start", about: "Über uns", status: "Status" },
      hero: {
        title: "Industrie X trifft auf AI",
        subtitle: "AI × Aleph – die intelligente Mobilitätsplattform",
        description:
          "Ein Dashboard für alles: Ladeplanung, Routen, Sicherheit und Nachhaltigkeit – skaliert von Stadtwerken bis Parkhausnetz."
      },
      cta: { start: "Kostenlos starten", login: "Login" }
    }
  },
  en: {
    translation: {
      nav: { home: "Home", about: "About", status: "Status" },
      hero: {
        title: "Industry X meets AI",
        subtitle: "AI × Aleph – the intelligent mobility platform",
        description:
          "One dashboard for everything: charging, routing, safety and sustainability — from utilities to parking networks."
      },
      cta: { start: "Start free", login: "Login" }
    }
  }
};

// initialize once (if not already)
if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    lng: "de",
    fallbackLng: "en",
    resources,
    interpolation: { escapeValue: false }
  });
}

const Ctx = createContext({ t: (k) => k, i18n });

export function useI18n() {
  // expose react-i18next's useTranslation via your own hook
  const { t, i18n: inst } = useTranslation();
  return useMemo(() => ({ t, i18n: inst }), [t, inst]);
}

export default function I18nProvider({ children }) {
  // Provide both I18nextProvider and a small helper context (optional)
  const value = useI18n();
  return (
    <I18nextProvider i18n={i18n}>
      <Ctx.Provider value={value}>{children}</Ctx.Provider>
    </I18nextProvider>
  );
}
