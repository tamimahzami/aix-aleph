import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(
    document.documentElement.getAttribute("data-theme") || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <button
      aria-label="Theme wechseln"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      style={{ background: "none", border: "none", fontSize: "1.25rem", cursor: "pointer" }}
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}
