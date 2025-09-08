// tailwind.config.js
import typography from "@tailwindcss/typography";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "color-bg": "#0f1117",
        "color-surface": "#1a1d26",
        "color-line": "#2b2d31",
        "color-ink": "#e5e7eb",
        "color-ink-muted": "#9ca3af",
        "color-primary": "#00f2ff",
        "blurple": "#5865f2",
      },
      boxShadow: {
        dc: "0 2px 8px rgba(0,0,0,0.4)",
      },
    },
  },
  plugins: [typography],
};
