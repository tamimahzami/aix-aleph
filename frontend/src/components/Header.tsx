// src/components/Header.tsx
import { Link } from "react-router-dom";

export default function Header({ footerToggle }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/50 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="font-semibold tracking-wide">AIX ALEPH</Link>

        <nav className="flex items-center gap-3">
          <Link to="/unternehmen" className="opacity-90 hover:opacity-100">Unternehmen</Link>
          <Link to="/preise" className="opacity-90 hover:opacity-100">Preise</Link>
          <Link to="/legal/datenschutz" className="opacity-90 hover:opacity-100">Datenschutz</Link>

          {footerToggle?.enabled && (
            <button
              onClick={() => footerToggle.setShow(!footerToggle.show)}
              className="ml-4 rounded-md border border-white/15 px-2 py-1 text-xs opacity-75 hover:opacity-100"
              title="Footer ein/aus (Dev)"
            >
              Footer: {footerToggle.show ? "AN" : "AUS"}
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
