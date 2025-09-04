// src/components/LegalNav.tsx
import { NavLink } from "react-router-dom";

const items = [
  { to: "/legal/terms", label: "AGB" },
  { to: "/legal/privacy", label: "Datenschutz" },
  { to: "/legal/cookies", label: "Cookies" },
  { to: "/legal/guidelines", label: "Richtlinien" },
  { to: "/legal/licenses", label: "Lizenzen" },
  { to: "/legal/acknowledgements", label: "Danksagungen" },
  { to: "/legal/company", label: "Unternehmen / Impressum" },
];

export default function LegalNav() {
  return (
    <nav className="sticky top-20 rounded-xl bg-[#2f3136] p-4 border border-white/10">
      <h2 className="text-sm font-semibold text-white/80 mb-3">Rechtliches</h2>
      <ul className="space-y-1">
        {items.map((it) => (
          <li key={it.to}>
            <NavLink
              to={it.to}
              className={({ isActive }) =>
                "block rounded-md px-3 py-2 text-sm transition-colors " +
                (isActive
                  ? "bg-[#5865F2]/20 text-white"
                  : "text-white/80 hover:bg-white/10")
              }
            >
              {it.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
