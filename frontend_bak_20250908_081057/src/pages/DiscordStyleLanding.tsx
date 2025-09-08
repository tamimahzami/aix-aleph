import { useState, useEffect } from "react";

export default function DiscordStyleLanding() {
  const [navOpen, setNavOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = navOpen ? "hidden" : "";
  }, [navOpen]);

  return (
    <div className="min-h-screen text-white bg-[var(--grey-900)]">
      <SiteStyles />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[var(--grey-900)]/70 backdrop-blur supports-[backdrop-filter]:bg-[color:rgba(35,39,42,0.75)] border-b border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="size-8 rounded-xl bg-[var(--blurple)] shadow-dc flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M4 6.5A3.5 3.5 0 0 1 7.5 3h9A3.5 3.5 0 0 1 20 6.5v5A3.5 3.5 0 0 1 16.5 15H12l-4 4v-4H7.5A3.5 3.5 0 0 1 4 11.5v-5Z" fill="white"/>
              </svg>
            </div>
            <span className="font-semibold tracking-tight text-white text-[17px] leading-none">AIXcord</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 text-[15px]">
            {[
              ["Download", "#download"],
              ["Nitro", "#nitro"],
              ["Discover", "#discover"],
              ["Safety", "#safety"],
              ["Support", "#support"],
            ].map(([label, href]) => (
              <a key={label} href={href} className="text-white/90 hover:text-white transition-colors">
                {label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="#login" className="btn btn-ghost">Einloggen</a>
            <a href="#signup" className="btn btn-primary">Registrieren</a>
          </div>

          {/* Mobile Burger */}
          <button
            onClick={() => setNavOpen(true)}
            className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-white/90 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--blurple)]"
            aria-label="Menü öffnen"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Mobile Panel */}
        {navOpen && (
          <div className="lg:hidden fixed inset-0 z-50">
            <div className="absolute inset-0 bg-black/60" onClick={() => setNavOpen(false)} />
            <div className="ml-auto h-full w-[84%] max-w-sm bg-[var(--grey-800)] shadow-2xl p-6 flex flex-col gap-6 overflow-y-auto">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="size-9 rounded-xl bg-[var(--blurple)] flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M4 6.5A3.5 3.5 0 0 1 7.5 3h9A3.5 3.5 0 0 1 20 6.5v5A3.5 3.5 0 0 1 16.5 15H12l-4 4v-4H7.5A3.5 3.5 0 0 1 4 11.5v-5Z" fill="white"/>
                    </svg>
                  </div>
                  <span className="font-semibold">AIXcord</span>
                </div>
                <button
                  onClick={() => setNavOpen(false)}
                  className="p-2 rounded-md hover:bg-white/10"
                  aria-label="Menü schließen"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>

              <div className="flex flex-col gap-4 text-[15px]">
                {[
                  ["Download", "#download"],
                  ["Nitro", "#nitro"],
                  ["Discover", "#discover"],
                  ["Safety", "#safety"],
                  ["Support", "#support"],
                ].map(([label, href]) => (
                  <a key={label} href={href} onClick={() => setNavOpen(false)} className="text-white/90 hover:text-white">
                    {label}
                  </a>
                ))}
              </div>

              <div className="mt-auto grid grid-cols-2 gap-3">
                <a href="#login" className="btn btn-ghost w-full">Einloggen</a>
                <a href="#signup" className="btn btn-primary w-full">Registrieren</a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-hero-gradient opacity-100" />
          <div className="absolute inset-x-0 bottom-[-1px] h-28 bg-wave-mask pointer-events-none" />
          <div className="pointer-events-none absolute -left-24 -top-24 size-[380px] rounded-full bg-[radial-gradient(circle_at_30%_30%,_rgba(88,101,242,0.75),_transparent_60%)] blur-2xl" />
          <div className="pointer-events-none absolute right-[-80px] top-[-60px] size-[320px] rounded-full bg-[radial-gradient(circle_at_60%_40%,_rgba(64,78,237,0.75),_transparent_55%)] blur-2xl" />
          <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-6 size-[520px] rounded-full bg-[radial-gradient(circle_at_50%_50%,_rgba(88,101,242,0.35),_transparent_65%)] blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-16 pb-24 text-center">
          <h1 className="font-extrabold tracking-tight text-white text-4xl sm:text-5xl md:text-[56px] leading-[1.05]">
            Deine Community, 
            <span className="block text-[var(--blurple)] drop-shadow-[0_2px_10px_rgba(64,78,237,0.45)]">vereint in Echtzeit</span>
          </h1>
          <p className="mt-5 text-white/85 text-base sm:text-lg max-w-3xl mx-auto">
            Voice, Video und Chat – alles an einem Ort. Sicher, schnell und mit Tools für jede Größe.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#download" className="btn btn-primary shadow-dc">Für macOS herunterladen</a>
            <a href="#browser" className="btn btn-secondary">Im Browser öffnen</a>
          </div>
        </div>
      </section>

      {/* Features */}
      <main className="relative z-0">
        <FeatureRow
          title="Organisierte Kanäle"
          copy="Strukturiere Gespräche in Themenkanäle – bleib fokussiert, ohne den Überblick zu verlieren."
          pattern="grid"
          flip={false}
        />
        <FeatureRow
          title="Kristallklare Gespräche"
          copy="Sprich als wärt ihr im selben Raum – niedrige Latenzen, hohe Stabilität."
          pattern="circles"
          flip
        />
        <FeatureRow
          title="Events & Communities"
          copy="Starte Livestreams, plane Events und wachse mit Rollen, Rechten und Automationen."
          pattern="stripes"
          flip={false}
        />

        {/* Final CTA */}
        <section className="relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-final-cta pointer-events-none" />
          <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center relative">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Bereit, loszulegen?</h2>
            <p className="mt-3 text-white/85 max-w-2xl mx-auto">
              Hol dir die App oder nutze AIXcord direkt im Browser.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <a href="#download" className="btn btn-primary">Download</a>
              <a href="#browser" className="btn btn-ghost">Im Browser öffnen</a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="pt-16 pb-10 bg-[var(--grey-800)] border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            <FooterCol title="Produkt" links={["Download", "Nitro", "Status", "iOS & Android"]} />
            <FooterCol title="Unternehmen" links={["Über uns", "Jobs", "Newsroom", "Marke"]} />
            <FooterCol title="Ressourcen" links={["Support", "Sicherheit", "Blog", "Entwickler"]} />
            <FooterCol title="Richtlinien" links={["AGB", "Datenschutz", "Cookie-Richtlinie", "Community"]} />
          </div>

          <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-xl bg-[var(--blurple)] flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M4 6.5A3.5 3.5 0 0 1 7.5 3h9A3.5 3.5 0 0 1 20 6.5v5A3.5 3.5 0 0 1 16.5 15H12l-4 4v-4H7.5A3.5 3.5 0 0 1 4 11.5v-5Z" fill="white"/>
                </svg>
              </div>
              <span className="font-semibold">AIXcord</span>
            </div>

            <div className="flex items-center gap-4 text-white/80">
              <LangSelect />
              <Social icon="x" />
              <Social icon="yt" />
              <Social icon="ig" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureRow({ title, copy, pattern = "grid", flip = false }: { title: string; copy: string; pattern?: "grid" | "circles" | "stripes"; flip?: boolean }) {
  return (
    <section className="py-20">
      <div className={`mx-auto max-w-6xl px-4 sm:px-6 grid items-center gap-10 ${flip ? "md:grid-cols-[1.05fr_1fr]" : "md:grid-cols-[1fr_1.05fr]"}`}>
        {/* Text */}
        <div className={`${flip ? "md:order-2" : ""}`}>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">{title}</h2>
          <p className="mt-4 text-white/85 text-base sm:text-lg">{copy}</p>
          <div className="mt-6 flex gap-3">
            <a href="#" className="btn btn-primary">Mehr erfahren</a>
            <a href="#" className="btn btn-ghost">Doku</a>
          </div>
        </div>

        {/* CSS-generated visual */}
        <div className={`${flip ? "md:order-1" : ""}`}>
          <div className={`relative rounded-2xl overflow-hidden shadow-dc ring-1 ring-white/10 h-[280px] sm:h-[340px] ${
            pattern === "grid" ? "pattern-grid bg-surface" : pattern === "circles" ? "pattern-circles bg-surface" : "pattern-stripes bg-surface"
          }`}>
            <div className="absolute inset-0 pointer-events-none" style={{
              background:
                "radial-gradient(1200px_400px_at_80%_10%, rgba(88,101,242,0.18), transparent 60%), radial-gradient(900px_300px_at_10%_100%, rgba(64,78,237,0.16), transparent 60%)",
            }} />
            <div className="absolute top-0 left-0 right-0 h-11 bg-white/5 backdrop-blur-sm border-b border-white/10 flex items-center gap-2 px-3">
              <span className="size-3 rounded-full bg-[#ff5f57]"/>
              <span className="size-3 rounded-full bg-[#febc2e]"/>
              <span className="size-3 rounded-full bg-[#28c840]"/>
              <span className="ml-2 text-xs text-white/70">aixcord-window</span>
            </div>
            <div className="absolute bottom-4 left-4 flex gap-2">
              <span className="chip chip-green">Live</span>
              <span className="chip chip-pink">Events</span>
              <span className="chip chip-yellow">Neu</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FooterCol({ title, links = [] as string[] }: { title: string; links?: string[] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold tracking-wide text-[var(--blurple)] uppercase">{title}</h3>
      <ul className="mt-4 space-y-2 text-[15px]">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="text-white/80 hover:text-white transition-colors">{l}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function LangSelect() {
  return (
    <label className="inline-flex items-center gap-2 text-sm">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 0c2.5 2.3 4 5.9 4 10s-1.5 7.7-4 10M12 2c-2.5 2.3-4 5.9-4 10s1.5 7.7 4 10M2 12h20" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
      <select className="bg-[var(--grey-700)] text-white/90 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[var(--blurple)]">
        <option>Deutsch</option>
        <option>English</option>
        <option>Français</option>
      </select>
    </label>
  );
}

function Social({ icon = "x" }: { icon?: "x" | "yt" | "ig" }) {
  const icons = {
    x: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M3 3l7.5 9L3 21h3l6-7.3L18.7 21H21l-7.7-9L21 3h-3l-5.6 6.8L6.3 3H3Z" fill="currentColor"/>
      </svg>
    ),
    yt: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M23 12s0-4-.5-5.8a3 3 0 0 0-2.2-2.2C18.5 3.5 12 3.5 12 3.5s-6.5 0-8.3.5A3 3 0 0 0 1.5 6.2C1 8 1 12 1 12s0 4 .5 5.8a3 3 0 0 0 2.2 2.2c1.8.5 8.3.5 8.3.5s6.5 0 8.3-.5a3 3 0 0 0 2.2-2.2C23 16 23 12 23 12ZM10 15.5v-7l6 3.5-6 3.5Z" fill="currentColor"/>
      </svg>
    ),
    ig: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
      </svg>
    ),
  } as const;
  return (
    <a href="#" className="p-2 rounded-md hover:bg-white/10" aria-label={icon}>
      {icons[icon]}
    </a>
  );
}

function SiteStyles() {
  return (
    <style>{`
:root {
  --blurple: #5865f2;
  --blurple-700: #404eed;
  --grey-900: #23272a;
  --grey-800: #2b2d31;
  --grey-700: #313338;
  --green: #57f287;
  --pink: #eb459e;
  --yellow: #fee75c;
}
/* Gradients & masks that don't use Tailwind @apply */
.bg-hero-gradient {
  background:
    radial-gradient(1200px 400px at 50% 0%, rgba(88,101,242,0.35), transparent 60%),
    linear-gradient(180deg, #23272a 0%, #2b2d31 60%, #23272a 100%);
}
.bg-wave-mask {
  background-image: url('data:image/svg+xml;utf8,\
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" preserveAspectRatio="none">\
    <path d="M0,96 C240,144 480,48 720,72 C960,96 1200,144 1440,96 L1440,0 L0,0 Z" fill="%2323272a"/>\
  </svg>');
  background-size: cover;
  background-repeat: no-repeat;
}
.bg-final-cta {
  background:
    radial-gradient(900px 300px at 10% 10%, rgba(88,101,242,0.32), transparent 60%),
    radial-gradient(900px 300px at 90% 90%, rgba(64,78,237,0.28), transparent 60%),
    linear-gradient(180deg, #2b2d31 0%, #23272a 100%);
}
`}</style>
  );
}
