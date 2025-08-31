// src/context/RegionContext.jsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import i18n from "../i18n";

/**
 * Region / Sprache global steuern und in localStorage persistieren.
 */

export const RegionContext = createContext(null);

export function useRegion() {
  const ctx = useContext(RegionContext);
  if (!ctx) throw new Error("useRegion must be used within RegionProvider");
  return ctx;
}

// Kontinente + bevorzugte Sprachen (Beispielwerte)
const CONTINENTS = [
  { id: "eu", name: "Europe", languages: ["de", "en", "fr", "es"], flag: "🇪🇺" },
  { id: "na", name: "North America", languages: ["en", "es"], flag: "🇺🇸" },
  { id: "sa", name: "South America", languages: ["es", "pt"], flag: "🇧��" },
  { id: "as", name: "Asia", languages: ["zh", "ja", "ko", "en"], flag: "🌏" },
  { id: "af", name: "Africa", languages: ["en", "fr", "ar"], flag: "🌍" },
  { id: "oc", name: "Oceania", languages: ["en"], flag: "🇦🇺" },
];

const ALL_LANGUAGES = [...new Set(CONTINENTS.flatMap((c) => c.languages))];
const STORAGE_KEY = "aix.region.v1";

export function RegionProvider({ children }) {
  const [continent, setContinent] = useState("eu");
  const [language, setLanguage] = useState("de");
  const [isInitialized, setIsInitialized] = useState(false);

  // Initial laden (localStorage -> Browser-Voreinstellung)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const stored = raw ? JSON.parse(raw) : null;

      if (stored?.continent) setContinent(stored.continent);
      if (stored?.language) {
        setLanguage(stored.language);
        i18n.changeLanguage(stored.language).catch(() => {});
      } else {
        // Fallback: Browsersprache
        const navLang = (navigator.language || "de").slice(0, 2);
        const fallback = ALL_LANGUAGES.includes(navLang) ? navLang : "de";
        setLanguage(fallback);
        i18n.changeLanguage(fallback).catch(() => {});
      }
    } catch (e) {
      // Ignorieren, falls JSON defekt
      console.warn("Region settings parse failed:", e);
    } finally {
      setIsInitialized(true);
    }
    // i18n absichtlich nicht als Dep, damit das nur einmal läuft
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persistieren bei Änderungen
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ continent, language })
      );
    } catch (e) {
      console.warn("Persist region failed:", e);
    }
  }, [continent, language, isInitialized]);

  // Sprache setzen (inkl. i18n)
  const selectLanguage = (lng) => {
    if (!lng || lng === language) return;
    const safe = ALL_LANGUAGES.includes(lng) ? lng : "en";
    setLanguage(safe);
    i18n.changeLanguage(safe).catch(() => {});
  };

  // Kontinent setzen + ggf. Sprache anpassen, wenn aktuelle Sprache dort nicht vorkommt
  const selectContinent = (id) => {
    if (!id || id === continent) return;
    setContinent(id);
    const cont = CONTINENTS.find((c) => c.id === id);
    if (cont && !cont.languages.includes(language)) {
      const preferred = cont.languages[0] || "en";
      setLanguage(preferred);
      i18n.changeLanguage(preferred).catch(() => {});
    }
  };

  // Memoisiertes Value – Dependencies vollständig angegeben => kein ESLint-Warning
  const value = useMemo(
    () => ({
      continent,
      language,
      isInitialized,
      continents: CONTINENTS,
      allLanguages: ALL_LANGUAGES,
      setContinent: selectContinent,
      setLanguage: selectLanguage,
    }),
    [continent, language, isInitialized] // CONTINENTS/ALL_LANGUAGES sind konstant
  );

  return <RegionContext.Provider value={value}>{children}</RegionContext.Provider>;
}
