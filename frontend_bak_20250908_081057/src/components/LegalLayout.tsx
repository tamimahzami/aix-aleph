// src/components/LegalLayout.tsx
import { Outlet, NavLink, Link, useLocation } from "react-router-dom";
import { useMemo } from "react";
import { Printer, FileDown } from "lucide-react"; // neue Icons

type Slug = "terms" | "privacy" | "cookies" | "guidelines" | "acknowledgements" | "licenses" | "company";

const TITLES: Record<Slug, string> = {
  terms: "AGB",
  privacy: "Datenschutz",
  cookies: "Cookies",
  guidelines: "Richtlinien",
  acknowledgements: "Danksagungen",
  licenses: "Lizenzen",
  company: "Impressum",
};

const LAST_UPDATED: Partial<Record<Slug, string>> = {
  terms: "2025-08-20",
  privacy: "2025-08-22",
  cookies: "2025-08-19",
  guidelines: "2025-08-18",
  acknowledgements: "2025-08-10",
  licenses: "2025-08-25",
  company: "2025-08-15",
};

function formatDate(iso?: string) {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return new Intl.DateTimeFormat("de-DE", { year: "numeric", month: "long", day: "2-digit" }).format(d);
}

export default function LegalLayout() {
  const location = useLocation();

  const currentSlug = useMemo<Slug | null>(() => {
    const parts = location.pathname.split("/").filter(Boolean);
    if (parts[0] !== "legal" || !parts[1]) return null;
    const s = parts[1] as Slug;
    return s in TITLES ? s : null;
  }, [location.pathname]);

  const currentTitle = currentSlug ? TITLES[currentSlug] : "Rechtliches";
  const currentUpdated = currentSlug ? formatDate(LAST_UPDATED[currentSlug]) : null;

  const legalLinks: Array<{ to: Slug; text: string }> = Object.entries(TITLES).map(([slug, text]) => ({
    to: slug as Slug,
    text,
  }));

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Sidebar */}
      <nav className="md:w-64">
        <ul className="flex flex-col gap-2">
          {legalLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === "terms"}
                className={({ isActive }) =>
                  "block px-4 py-2 rounded-lg transition-colors " +
                  (isActive ? "bg-[#5865F2]/20 text-white" : "hover:bg-white/10 text-gray-300")
                }
              >
                {link.text}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Content */}
      <main className="flex-1">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-4 text-sm text-gray-400">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link to="/" className="hover:text-white">Home</Link>
            </li>
            <li className="opacity-60">/</li>
            <li>
              <Link to="/legal/terms" className="hover:text-white">Rechtliches</Link>
            </li>
            {currentSlug && (
              <>
                <li className="opacity-60">/</li>
                <li aria-current="page" className="text-gray-200">
                  {currentTitle}
                </li>
              </>
            )}
          </ol>
        </nav>

        {/* Headline + Meta + Actions */}
        <header className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">{currentTitle}</h1>
            {currentUpdated && (
              <p className="mt-1 text-xs uppercase tracking-wide text-gray-400">
                Zuletzt aktualisiert: {currentUpdated}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg bg-[#5865F2]/20 hover:bg-[#5865F2]/30 transition"
            >
              <Printer className="w-4 h-4" />
              Drucken
            </button>
            <button
              onClick={() => window.print()} // später durch echtes PDF ersetzt
              className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg bg-[#5865F2]/20 hover:bg-[#5865F2]/30 transition"
            >
              <FileDown className="w-4 h-4" />
              PDF
            </button>
          </div>
        </header>

        {/* Inhalt */}
        <div className="prose prose-invert max-w-none">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
