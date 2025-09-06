export const NAV = {
  de: {
    primary: [
      { label: "Home", to: "/de/" },
      {
        label: "Lösungen",
        children: [
          { label: "Übersicht", to: "/de/loesungen/" },
          { label: "E-Depot Integration", to: "/de/e-depot/" },
          { label: "Flottensteuerung", to: "/de/flottensteuerung/" },
          { label: "Ladeinfrastruktur", to: "/de/ladeinfrastruktur/" },
          { label: "AIX Aleph Demo", to: "/de/demo/" },
          { label: "Partner-Login", to: "/de/partner-login/" },
        ],
      },
      {
        label: "Technologie",
        children: [
          { label: "Übersicht", to: "/de/technologie/" },
          { label: "Neural Architecture", to: "/de/neural-architecture/" },
          { label: "Echtzeit-Analyse", to: "/de/echtzeit-analyse/" },
          { label: "Energiemanagement", to: "/de/energiemanagement/" },
          { label: "API-Dokumentation", to: "/de/api-dokumentation/" },
          { label: "Systemanforderungen", to: "/de/systemanforderungen/" },
        ],
      },
      {
        label: "Unternehmen",
        children: [
          { label: "Über uns", to: "/de/ueber-uns/" },
          { label: "Karriere", to: "/de/karriere/" },
          { label: "Partner", to: "/de/partner/" },
          { label: "Pitch Deck", to: "/de/pitch-deck/" },
          { label: "Blog", to: "/de/blog/" },
          { label: "Kontakt", to: "/de/kontakt/" },
        ],
      },
      { label: "Kontakt", to: "/de/kontakt/", desktopOnly: true },
    ],
    cta: { label: "Demo", to: "/de/demo/" },
  },
  en: {
    primary: [
      { label: "Home", to: "/en/" },
      {
        label: "Solutions",
        children: [
          { label: "Overview", to: "/en/solutions/" },
          { label: "E-Depot", to: "/en/e-depot/" },
          { label: "Fleet Control", to: "/en/fleet-control/" },
          { label: "Charging Infra", to: "/en/charging-infrastructure/" },
          { label: "AIX Aleph Demo", to: "/en/demo/" },
          { label: "Partner Login", to: "/en/partner-login/" },
        ],
      },
      {
        label: "Technology",
        children: [
          { label: "Overview", to: "/en/technology/" },
          { label: "Neural Architecture", to: "/en/neural-architecture/" },
          { label: "Real-Time Analytics", to: "/en/real-time-analytics/" },
          { label: "Energy Management", to: "/en/energy-management/" },
          { label: "API Docs", to: "/en/api-documentation/" },
          { label: "System Requirements", to: "/en/system-requirements/" },
        ],
      },
      {
        label: "Company",
        children: [
          { label: "About", to: "/en/about/" },
          { label: "Careers", to: "/en/careers/" },
          { label: "Partners", to: "/en/partners/" },
          { label: "Pitch Deck", to: "/en/pitch-deck/" },
          { label: "Blog", to: "/en/blog/" },
          { label: "Contact", to: "/en/contact/" },
        ],
      },
      { label: "Contact", to: "/en/contact/", desktopOnly: true },
    ],
    cta: { label: "Demo", to: "/en/demo/" },
  },
  fr: {
    primary: [
      { label: "Accueil", to: "/fr/" },
      {
        label: "Solutions",
        children: [
          { label: "Aperçu", to: "/fr/solutions/" },
          { label: "E-Depot", to: "/fr/e-depot/" },
          { label: "Gestion de flotte", to: "/fr/gestion-de-flotte/" },
          { label: "Infrastructure de charge", to: "/fr/infrastructure-de-charge/" },
          { label: "Démo AIX Aleph", to: "/fr/demo/" },
          { label: "Connexion partenaire", to: "/fr/connexion-partenaire/" },
        ],
      },
      {
        label: "Technologie",
        children: [
          { label: "Aperçu", to: "/fr/technologie/" },
          { label: "Architecture neurale", to: "/fr/architecture-neurale/" },
          { label: "Analyse temps réel", to: "/fr/analyse-temps-reel/" },
          { label: "Gestion énergie", to: "/fr/gestion-energie/" },
          { label: "Doc API", to: "/fr/documentation-api/" },
          { label: "Exigences système", to: "/fr/exigences-systeme/" },
        ],
      },
      {
        label: "Entreprise",
        children: [
          { label: "À propos", to: "/fr/a-propos/" },
          { label: "Carrières", to: "/fr/carrieres/" },
          { label: "Partenaires", to: "/fr/partenaires/" },
          { label: "Pitch Deck", to: "/fr/pitch-deck/" },
          { label: "Blog", to: "/fr/blog/" },
          { label: "Contact", to: "/fr/contact/" },
        ],
      },
      { label: "Contact", to: "/fr/contact/", desktopOnly: true },
    ],
    cta: { label: "Démo", to: "/fr/demo/" },
  },
};

// Standard: Deutsch
const cfg = NAV.de;
export default cfg;
