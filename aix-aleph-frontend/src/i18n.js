// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const saved = localStorage.getItem("AIX_LANG");
const fallbackLng = "de";

const resources = {
  de: {
    common: {
      brand: "AIX Aleph Mobility",
      nav: {
        home: "Start",
        demo: "Demo",
        login: "Login",
        register: "Registrieren",
        pricing: "Preise",
        billing: "Abrechnung",
        payments: "Zahlungsmethoden",
        sales: "Sales",
        contact: "Anfrage",
        api: "Entwickler-API",
        impressum: "Impressum",
        privacy: "Datenschutz",
        terms: "AGB",
      },
      cta: { getStarted: "Jetzt starten", viewDemo: "Dashboard-Demo ansehen" },
      footer: { tagline: "Leichte Experimentation-Suite für E-Mobility Teams." }
    },
    home: {
      heroTitle: "Experimente in Minuten – nicht Wochen.",
      heroLead: "Login & Registrierung integriert. Guarded Routes. Token-Handling.",
      bullets: {
        jwt: "JWT im LocalStorage (AIX_TOKEN)",
        bearer: "Bearer Header automatisch",
        guard: "Gesicherte /experiments",
        ui: "UI-Bindings & Toasts"
      },
      features: {
        status: { title: "Systemstatus", sub: "Live-Health", desc: "Backend-Verbindung & Service-Ping in Echtzeit." },
        revenue: { title: "Revenue Impact", sub: "Letzte 7 Tage", desc: "Experiment-Einfluss auf Umsätze transparent." },
        ctr: { title: "CTR", sub: "Median", desc: "Variantenvergleich mit klaren Metriken." }
      },
      why: {
        title: "Warum AIX Aleph?",
        text: "Sauberes API-Design, moderne React-Patterns und ein UI, das Spaß macht."
      }
    },
    pricing: {
      title: "Preise & Pläne",
      monthly: "monatlich",
      plan: {
        starter: { name: "Starter", price: "€0", features: ["1 Projekt", "Basis-Dashboard", "Community Support"] },
        pro:     { name: "Pro",     price: "€49", features: ["Unl. Projekte", "A/B Experimente", "Team-Rollen", "E-Mail Support"] },
        enterprise: { name: "Enterprise", price: "Kontakt", features: ["SLA & SSO", "Audit Logs", "Datenexport", "Priorisierter Support"] }
      }
    },
    billing: {
      title: "Abrechnung",
      desc: "Verwalte Rechnungsadresse, Steuerangaben und Belege.",
      btn: { addVat: "USt-IdNr. hinzufügen", download: "Letzte Rechnung herunterladen" }
    },
    payments: {
      title: "Zahlungsmethoden",
      desc: "Hinterlege oder tausche deine Zahlungsmittel aus.",
      methods: { card: "Kredit-/Debitkarte", sepa: "SEPA-Lastschrift", apple: "Apple Pay", google: "Google Pay" },
      btn: { add: "Zahlungsmittel hinzufügen", makeDefault: "Als Standard setzen" }
    },
    sales: { title: "Mit Sales sprechen", desc: "Enterprise Anforderungen? Wir freuen uns." },
    contact: { title: "Anfrage stellen", desc: "Schick uns deine Frage – wir melden uns." },
    api: {
      title: "Entwickler-API",
      intro: "Globale, stabile Endpunkte für Integrationen.",
      endpointsTitle: "Basis-Endpunkte",
      authTitle: "Authentifizierung",
      exTitle: "Beispiel",
      note: "Setze deinen Token via Bearer Header."
    },
    legal: {
      impressum: { title: "Impressum" },
      privacy:   { title: "Datenschutzerklärung" },
      terms:     { title: "Allgemeine Geschäftsbedingungen" }
    }
  },
  en: {
    common: {
      brand: "AIX Aleph Mobility",
      nav: {
        home: "Home",
        demo: "Demo",
        login: "Login",
        register: "Register",
        pricing: "Pricing",
        billing: "Billing",
        payments: "Payment Methods",
        sales: "Sales",
        contact: "Contact",
        api: "Developer API",
        impressum: "Imprint",
        privacy: "Privacy",
        terms: "Terms"
      },
      cta: { getStarted: "Get started", viewDemo: "View dashboard demo" },
      footer: { tagline: "Lightweight experimentation suite for e-mobility teams." }
    },
    home: {
      heroTitle: "Run experiments in minutes, not weeks.",
      heroLead: "Login & registration built-in. Guards. Token handling.",
      bullets: {
        jwt: "JWT in LocalStorage (AIX_TOKEN)",
        bearer: "Bearer header automatically",
        guard: "Protected /experiments",
        ui: "UI bindings & toasts"
      },
      features: {
        status: { title: "System status", sub: "Live health", desc: "API connectivity & service ping." },
        revenue: { title: "Revenue impact", sub: "Last 7 days", desc: "Transparent experiment influence." },
        ctr: { title: "CTR", sub: "Median", desc: "Variant comparison with crisp metrics." }
      },
      why: {
        title: "Why AIX Aleph?",
        text: "Clean API design, modern React patterns, and a UI that sparks joy."
      }
    },
    pricing: {
      title: "Pricing & Plans",
      monthly: "monthly",
      plan: {
        starter: { name: "Starter", price: "$0", features: ["1 project", "Basic dashboard", "Community support"] },
        pro:     { name: "Pro",     price: "$49", features: ["Unlimited projects", "A/B experiments", "Team roles", "Email support"] },
        enterprise: { name: "Enterprise", price: "Contact", features: ["SLA & SSO", "Audit logs", "Data export", "Priority support"] }
      }
    },
    billing: {
      title: "Billing",
      desc: "Manage billing address, tax details and invoices.",
      btn: { addVat: "Add VAT No.", download: "Download last invoice" }
    },
    payments: {
      title: "Payment Methods",
      desc: "Add or change your payment instruments.",
      methods: { card: "Credit/Debit Card", sepa: "SEPA Direct Debit", apple: "Apple Pay", google: "Google Pay" },
      btn: { add: "Add payment method", makeDefault: "Make default" }
    },
    sales: { title: "Talk to Sales", desc: "Enterprise needs? We'd love to chat." },
    contact: { title: "Contact us", desc: "Send your question – we’ll get back to you." },
    api: {
      title: "Developer API",
      intro: "Global, stable endpoints for integrations.",
      endpointsTitle: "Base endpoints",
      authTitle: "Authentication",
      exTitle: "Example",
      note: "Provide your token via Bearer header."
    },
    legal: {
      impressum: { title: "Imprint" },
      privacy:   { title: "Privacy Policy" },
      terms:     { title: "Terms & Conditions" }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: saved || fallbackLng,
    fallbackLng,
    ns: ["common","home","pricing","billing","payments","sales","contact","api","legal"],
    defaultNS: "common",
    interpolation: { escapeValue: false }
  });

export function setLanguage(lng) {
  i18n.changeLanguage(lng);
  localStorage.setItem("AIX_LANG", lng);
}
export default i18n;
