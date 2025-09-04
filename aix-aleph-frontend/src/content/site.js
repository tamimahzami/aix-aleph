// src/content/site.js

const site = {
  logos: {
    items: [
      "/logos/acme.svg",
      "/logos/contoso.svg",
      "/logos/umbrella.svg",
      "/logos/wayne.svg",
      "/logos/stark.svg",
      "/logos/straylight.svg",
    ],
  },

  testimonials: {
    title: "Stimmen aus Projekten",
    items: [
      {
        quote:
          "Wir konnten Lade-Peaks glätten und die Depot-OPEX signifikant senken – ohne Komfortverlust.",
        author: "Lea Schneider",
        role: "Ops Lead E-Mobility, FleetCo",
      },
      {
        quote:
          "Die Policy-Engine macht autonome Entscheidungen nachvollziehbar. Audits sind deutlich schneller.",
        author: "Dr. Jonas Weber",
        role: "Head of Compliance, GridOps",
      },
      {
        quote:
          "Die Realtime Fabric hält selbst bei Degradation die SLA-Ziele – beeindruckend robust.",
        author: "Sofia Marin",
        role: "Director of Platform, MoveTech",
      },
    ],
  },

  newsletter: {
    title: "Release-Notes & Praxisberichte",
    text: "Alle 4–6 Wochen. Kein Spam.",
    placeholder: "E-Mail Adresse",
    cta: "Abonnieren",
  },

  cta: {
    title: "Bereit für produktive Autonomie?",
    text: "Buche eine Session mit unserem Solutions-Team – live an deinen Daten & Policies.",
    primary: { label: "Sales kontaktieren", to: "/sales" },
    secondary: { label: "Preise & Pläne", to: "/pricing" },
  },
};

export default site;
