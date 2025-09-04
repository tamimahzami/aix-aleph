// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        discord: {
          dark: "#36393f",
          darker: "#2f3136",
          server: "#202225",
          channel: "#2f3136",
          text: "#dcddde",
          muted: "#72767d",
          primary: "#5865f2",
          success: "#3ba55d",
          danger: "#ed4245",
        },
        aix: {
          primary: "#00f9ff",
          secondary: "#ff00ff",
          tertiary: "#00ffa3",
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
} satisfies Config;
