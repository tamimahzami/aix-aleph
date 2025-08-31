// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import de from "./locales/de.json";
import en from "./locales/en.json";
import fr from "./locales/fr.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { de: { translation: de }, en: { translation: en }, fr: { translation: fr } },
    fallbackLng: "de",
    interpolation: { escapeValue: false },
    detection: { order: ["cookie", "localStorage", "navigator"], caches: ["cookie"] },
  });

export default i18n;
