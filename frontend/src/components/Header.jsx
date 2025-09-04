// src/components/Header.jsx
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-[#090e18] text-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-cyan-400 font-bold text-xl tracking-wide">
              AIX&nbsp;Aleph
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/about" className="hover:text-cyan-400">Über uns</Link>
            <Link to="/features" className="hover:text-cyan-400">Funktionen</Link>
            <Link to="/pricing" className="hover:text-cyan-400">Preise</Link>
            <Link to="/contact" className="hover:text-cyan-400">Kontakt</Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded hover:bg-white/10"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {open && (
        <div className="md:hidden bg-[#0f1726] px-4 pb-4 space-y-3">
          <Link to="/about" className="block hover:text-cyan-400">Über uns</Link>
          <Link to="/features" className="block hover:text-cyan-400">Funktionen</Link>
          <Link to="/pricing" className="block hover:text-cyan-400">Preise</Link>
          <Link to="/contact" className="block hover:text-cyan-400">Kontakt</Link>
        </div>
      )}
    </header>
  );
}
