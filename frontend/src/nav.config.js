// src/nav.config.js
export const NAV = {
  de: {
    primary: [
      { label: "Home", to: "/" },
      {
        label: "Lösungen",
        children: [
          { label: "E-Depot Orchestrierung", to: "/info/e-depot" },
          { label: "Flottensteuerung", to: "/info/flottensteuerung" },
          { label: "Ladeinfrastruktur", to: "/info/ladeinfrastruktur" },
          { label: "KI-Agenten", to: "/info/technologie" },
        ],
      },
      { label: "Technologie", to: "/info/technologie" },
      { label: "Unternehmen", to: "/info/unternehmen" },
      { label: "Manifesto", to: "/manifesto" },
      { label: "Kontakt", to: "/info/kontakt" },

      // 👇 Dashboard direkt sichtbar
      { label: "Dashboard", to: "/dashboard" },
    ],

    // 👇 Call-To-Action Button im Header
    cta: {
      label: "Jetzt Demo öffnen",
      to: "/dashboard",
    },
  },
};
