// src/components/Footer.jsx
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#0f1726] text-gray-300 py-8 mt-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Logo & Mission */}
        <div>
          <h3 className="text-cyan-400 font-bold text-xl mb-2">AIX Aleph</h3>
          <p className="text-sm text-gray-400">
            Das Mutterschiff für KI-Agenten & E-Mobilität.  
            Smarte Flotten, 0% CO₂, volle Kontrolle.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-white font-semibold mb-2">Navigation</h4>
          <ul className="space-y-1">
            <li><Link to="/about" className="hover:text-cyan-400">Über uns</Link></li>
            <li><Link to="/features" className="hover:text-cyan-400">Funktionen</Link></li>
            <li><Link to="/pricing" className="hover:text-cyan-400">Preise</Link></li>
            <li><Link to="/contact" className="hover:text-cyan-400">Kontakt</Link></li>
          </ul>
        </div>

        {/* Kontakt */}
        <div>
          <h4 className="text-white font-semibold mb-2">Kontakt</h4>
          <p className="text-sm">Email: <a href="mailto:info@aix-aleph.com" className="hover:text-cyan-400">info@aix-aleph.com</a></p>
          <p className="text-sm">Tel: <a href="tel:+491601234567" className="hover:text-cyan-400">+49 160 1234567</a></p>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="hover:text-cyan-400">LinkedIn</a>
            <a href="#" className="hover:text-cyan-400">X / Twitter</a>
            <a href="#" className="hover:text-cyan-400">GitHub</a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-xs text-gray-500 mt-6">
        © {new Date().getFullYear()} AIX Aleph Mobility. Alle Rechte vorbehalten.
      </div>
    </footer>
  );
}
