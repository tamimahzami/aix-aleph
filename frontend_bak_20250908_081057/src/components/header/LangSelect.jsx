import React from "react";
import { useLang } from "../../context/LangContext";

export default function LangSelect() {
  const { lang, setLang } = useLang();

  return (
    <select
      aria-label="Language"
      value={lang}
      onChange={(e) => setLang(e.target.value)}
      className="px-2 py-1 border rounded-md bg-[var(--color-bg)]"
    >
      <option value="de">DE</option>
      <option value="en">EN</option>
      <option value="fr">FR</option>
    </select>
  );
}
