// src/components/LanguageSwitcher.jsx
import React from "react";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  function changeLanguage(lng) {
    i18n.changeLanguage(lng);
    // Cookie für 30 Tage setzen (damit die Wahl bleibt)
    const date = new Date();
    date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000);
    document.cookie = `i18next=${lng};expires=${date.toUTCString()};path=/`;
  }

  const btn = (lng, label) => (
    <button
      key={lng}
      onClick={() => changeLanguage(lng)}
      aria-label={label}
      style={{
        border: "1px solid #ddd",
        background: i18n.language?.startsWith(lng) ? "#0d47a1" : "#fff",
        color: i18n.language?.startsWith(lng) ? "#fff" : "#111",
        padding: "6px 10px",
        borderRadius: 6,
        cursor: "pointer",
        fontSize: 12,
      }}
    >
      {label}
    </button>
  );

  return (
    <div style={{ display: "flex", gap: 8 }}>
      {btn("de", "DE")}
      {btn("en", "EN")}
      {btn("fr", "FR")}
    </div>
  );
}
