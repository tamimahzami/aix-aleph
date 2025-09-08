import React, { createContext, useContext, useMemo, useState, useEffect } from "react";

const LangContext = createContext({ lang: "de", setLang: () => {} });
const SUPPORTED = ["de", "en", "fr"];

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem("lang");
    if (saved && SUPPORTED.includes(saved)) return saved;
    // optional: infer from browser
    const guess = (navigator.language || "de").slice(0,2);
    return SUPPORTED.includes(guess) ? guess : "de";
  });

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang }), [lang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}
