// src/components/LanguageSelector.jsx
import React from "react";
import { useI18n } from "../i18n/I18nProvider";

export default function LanguageSelector() {
  const { i18n } = useI18n();
  const onChange = (e) => i18n.changeLanguage(e.target.value);

  return (
    <select
      aria-label="Sprache wählen"
      value={i18n.language?.startsWith("de") ? "de" : "en"}
      onChange={onChange}
      style={{ padding: "8px 10px", borderRadius: 8, border: "1px solid #e5e7eb", fontWeight: 600 }}
    >
      <option value="de">DE</option>
      <option value="en">EN</option>
    </select>
  );
}
