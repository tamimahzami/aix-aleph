// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // only list plugins you actually installed:
    import('@tailwindcss/typography'),
    import('@tailwindcss/forms'),
  ],
}
