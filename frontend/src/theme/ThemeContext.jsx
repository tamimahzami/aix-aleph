import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext({
  theme: "aix",
  setTheme: () => {},
  cycleTheme: () => {},
});

export function ThemeProvider({ children, initial = "aix" }) {
  const [theme, setTheme] = useState(initial);

  // Theme -> <html data-theme="...">
  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("data-theme", theme);
  }, [theme]);

  const cycleTheme = () => {
    // verfügbar: aix (default), sport, expressive, efficient
    const order = ["aix", "sport", "expressive", "efficient"];
    const i = order.indexOf(theme);
    setTheme(order[(i + 1) % order.length]);
  };

  const value = useMemo(() => ({ theme, setTheme, cycleTheme }), [theme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
