// src/nav.config.js
export const NAV = {
  brand: { label: "AIX ALEPH", to: "/" },

  groups: [
    {
      label: "Lösungen",
      items: [
        { label: "E-Depot Orchestrierung", to: "/info/e-depot" },
        { label: "Flottensteuerung",       to: "/info/flottensteuerung" },
        { label: "Ladeinfrastruktur",      to: "/info/ladeinfrastruktur" },
        { label: "Demo",                   to: "/demo" },
      ],
    },
    {
      label: "Technologie",
      items: [
        { label: "Übersicht",            to: "/tech/overview" },
        { label: "Neural Architecture",  to: "/tech/neural-architecture" },
        { label: "Echtzeit-Analyse",     to: "/tech/realtime-analytics" },
        { label: "Energiemanagement",    to: "/tech/energy" },
        { label: "API-Doku",             to: "/tech/api" },
        { label: "Systemanforderungen",  to: "/tech/requirements" },
      ],
    },
    {
      label: "Unternehmen",
      items: [
        { label: "Über uns",     to: "/company/about" }, // /pages/About.jsx Wrapper ok
        { label: "Karriere",     to: "/company/karriere" },
        { label: "Partner",      to: "/company/partner" },
        { label: "Pitch Deck",   to: "/pitch-deck" },    // (externe PDF/Seite optional)
        { label: "Blog",         to: "/company/blog" },
        { label: "Kontakt",      to: "/company/kontakt" },
      ],
    },
  ],

  ctas: [
    { label: "Login",       to: "/auth/login",    variant: "ghost" },
    { label: "Demo starten",to: "/demo",          variant: "primary" },
  ],

  legal: [
    { label: "Datenschutz", to: "/legal/datenschutz" },
    { label: "Impressum",   to: "/legal/impressum" },
    { label: "AGB",         to: "/legal/agb" },
    { label: "Cookie-Einstellungen", to: "/legal/cookies" },
  ],

  contact: {
    email: "sales@aix-aleph.com",
    phone: "+49 160 702 9153",
    location: "London, UK",
  },

  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/aix-aleph/" },
    { label: "X",        href: "https://twitter.com/aix_aleph" },
    { label: "GitHub",   href: "https://github.com/aix-aleph" },
  ],
};
