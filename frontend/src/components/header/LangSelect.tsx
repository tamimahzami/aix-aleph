import React from "react";
import { detectLangFromPath, switchLangPath, Lang } from "../../hooks/useI18nPath";

export default function LangSelect() {
  const { lang } = detectLangFromPath(location.pathname);
  return (
    <div className="relative">
      <select
        aria-label="Sprache wählen"
        defaultValue={lang}
        onChange={(e) => (location.href = switchLangPath(location.pathname, e.target.value as Lang))}
        className="appearance-none bg-white/10 border border-white/20 rounded-lg px-3 pr-7 py-2 font-semibold text-white"
      >
        <option value="de">🇩🇪 DE</option>
        <option value="en">🇬🇧 EN</option>
        <option value="fr">🇫🇷 FR</option>
      </select>
      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-white/70 pointer-events-none">▾</span>
    </div>
  );
}
