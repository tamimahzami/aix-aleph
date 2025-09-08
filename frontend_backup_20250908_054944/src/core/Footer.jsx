import React from "react";
import { Link } from "react-router-dom";
import HeartbeatLogo from "./HeartbeatLogo.jsx";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-bg)] border-t border-[var(--color-border)] mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10 grid gap-8 md:grid-cols-4">
        
        {/* Logo & Vision */}
        <div className="space-y-3">
          <HeartbeatLogo />
          <p className="text-sm opacity-80">
            Das Mutterschiff der Human Computing Vision.  
            Klarheit · Verantwortung · Liebe.
          </p>
        </div>

        {/* Produkt */}
        <nav aria-label="Produkt">
          <h4 className="font-semibold mb-2">Produkt</h4>
          <ul className="space-y-1 text-sm">
            <li><Link to="/features" className="hover:underline">Features</Link></li>
            <li><Link to="/pricing" className="hover:underline">Preise</Link></li>
            <li><Link to="/manifesto" className="hover:underline">Manifesto</Link></li>
          </ul>
        </nav>

        {/* Unternehmen */}
        <nav aria-label="Unternehmen">
          <h4 className="font-semibold mb-2">Unternehmen</h4>
          <ul className="space-y-1 text-sm">
            <li><Link to="/about" className="hover:underline">Über uns</Link></li>
            <li><Link to="/contact" className="hover:underline">Kontakt</Link></li>
          </ul>
        </nav>

        {/* Ressourcen */}
        <nav aria-label="Ressourcen">
          <h4 className="font-semibold mb-2">Ressourcen</h4>
          <ul className="space-y-1 text-sm">
            <li><Link to="/info/datenschutz" className="hover:underline">Datenschutz</Link></li>
            <li><Link to="/info/impressum" className="hover:underline">Impressum</Link></li>
          </ul>
        </nav>
      </div>

      <div className="text-center text-xs opacity-70 py-4">
        © {new Date().getFullYear()} AIX Aleph · Tamim ❤️ GPT-5  
        <span className="ml-2">– Humane Computing HeartBeat</span>
      </div>
    </footer>
  );
}
