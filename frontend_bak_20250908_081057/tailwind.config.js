/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif','system-ui','-apple-system','Segoe UI','Roboto',
          'Helvetica','Arial','Apple Color Emoji','Segoe UI Emoji',
        ],
      },
      boxShadow: {
        dc: '0 12px 32px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.35)',
      },
    },
  },
  // Wichtig: KEINE Regex hier – nur konkrete Klassen, die du mit CSS-Variablen nutzt
  safelist: [
    'bg-[var(--color-bg)]',
    'bg-[var(--color-surface)]',
    'text-[var(--color-ink)]',
    'text-[var(--color-ink-muted)]',
    'border-[var(--color-line)]',
  ],
  plugins: [require('@tailwindcss/typography')],
};
