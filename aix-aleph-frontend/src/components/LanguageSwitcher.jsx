// src/components/LanguageSwitcher.jsx
import React from "react";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const change = (lng) => i18n.changeLanguage(lng);

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => change("de")}
        className={`px-2 py-1 rounded text-sm ${i18n.language === "de" ? "bg-cyan-600 text-white" : "border"}`}
        aria-label="Deutsch"
      >
        DE
      </button>
      <button
        onClick={() => change("en")}
        className={`px-2 py-1 rounded text-sm ${i18n.language === "en" ? "bg-cyan-600 text-white" : "border"}`}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
}
