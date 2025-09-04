import React from "react";
import { useParams, Link } from "react-router-dom";

/**
 * Ein Dictionary aller "statischen" Footer-/Info-Seiten.
 * key = slug (genau so wie im Footer verlinkt)
 */
const PAGES = {
  // Download / Produkt
  "download": { title: "Download", body: "Hier kommt der App-Download (macOS, Windows, Linux, iOS, Android)." },
  "nitro": { title: "Nitro", body: "Premium-Features, höhere Limits, Perks – Platzhalterseite." },
  "status": { title: "Status", body: "Live-Status deiner Region, Services & APIs – Platzhalterseite." },
  "app-directory": { title: "App Directory", body: "Marketplace/Directory für offizielle Integrationen – Platzhalterseite." },

  // About / Company
  "about": { title: "About", body: "Mission, Vision, Team – Platzhalterseite." },
  "jobs": { title: "Jobs", body: "Offene Stellen, Kultur, Benefits – Platzhalterseite." },
  "brand": { title: "Brand", body: "Logos, Farben, Brand-Guidelines – Platzhalterseite." },
  "newsroom": { title: "Newsroom", body: "Presse, Medienpakete, Releases – Platzhalterseite." },
  "college": { title: "College", body: "Programme & Vergünstigungen für Studierende – Platzhalterseite." },

  // Support / Safety / Community
  "support": { title: "Support", body: "Hilfeartikel, Kontakt, FAQ – Platzhalterseite." },
  "safety": { title: "Safety", body: "Sicherheit, Moderation, Melden – Platzhalterseite." },
  "blog": { title: "Blog", body: "Artikel, Updates, Deep Dives – Platzhalterseite." },
  "streamkit": { title: "StreamKit", body: "Tools für Creator & Streaming – Platzhalterseite." },
  "creators": { title: "Creators", body: "Programme & Ressourcen für Creator – Platzhalterseite." },
  "community": { title: "Community", body: "Community-Hub, Events, Partner – Platzhalterseite." },
  "developers": { title: "Developers", body: "API, SDKs, Beispiele, Docs – Platzhalterseite." },
  "quests": { title: "Quests", body: "Challenges, Rewards – Platzhalterseite." },
  "merch": { title: "Official 3rd Party Merch", body: "Offizielles Merchandise – Platzhalterseite." },
  "feedback": { title: "Feedback", body: "Feature-Wünsche & Bugreports – Platzhalterseite." },

  // Legal
  "terms": { title: "Terms", body: "Allgemeine Geschäftsbedingungen – Platzhalterseite." },
  "privacy": { title: "Privacy", body: "Datenschutz-Hinweise – Platzhalterseite." },
  "cookie-settings": { title: "Cookie Settings", body: "Cookie-Einstellungen – Platzhalterseite." },
  "guidelines": { title: "Guidelines", body: "Community- & Nutzungsrichtlinien – Platzhalterseite." },
  "acknowledgements": { title: "Acknowledgements", body: "Credits & Danksagungen – Platzhalterseite." },
  "licenses": { title: "Licenses", body: "Open-Source- & Drittanbieter-Lizenzen – Platzhalterseite." },
  "company-information": { title: "Company Information", body: "Firmenangaben / Impressum – Platzhalterseite." },
};

export default function StaticPage() {
  const { slug } = useParams();
  const page = PAGES[slug];

  if (!page) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="text-3xl font-extrabold">Seite nicht gefunden</h1>
        <p className="text-[var(--color-ink-muted)] mt-2">
          Für <code className="kbd">{slug}</code> existiert noch kein Eintrag.
        </p>
        <Link className="btn btn-ghost mt-6" to="/">Zurück zur Startseite</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <div className="panel p-6 elev">
        <h1 className="text-3xl font-extrabold">{page.title}</h1>
        <p className="text-[var(--color-ink-muted)] mt-3">{page.body}</p>
        <div className="mt-6">
          <Link className="btn btn-ghost" to="/">← Zurück</Link>
        </div>
      </div>
    </div>
  );
}
