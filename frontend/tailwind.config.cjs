/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html","./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--primary) / <alpha-value>)",
        accent:  "rgb(var(--accent) / <alpha-value>)",
        ink:     "rgb(var(--ink) / <alpha-value>)",
        ui:      "rgb(var(--ui) / <alpha-value>)",
      }
    }
  },
  plugins: [],
}
