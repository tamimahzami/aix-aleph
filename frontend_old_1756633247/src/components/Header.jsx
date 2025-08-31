import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Header.css";

export default function Header() {
  const { i18n } = useTranslation?.() ?? { i18n: null };
  const [open, setOpen] = useState(false);

  const Item = ({ to, children }) => (
    <NavLink
      to={to}
      className={({ isActive }) => "nav-item" + (isActive ? " active" : "")}
      onClick={() => setOpen(false)}
    >
      {children}
    </NavLink>
  );

  const changeLanguage = (lng) => i18n?.changeLanguage?.(lng);

  return (
    <header className="site-header" role="banner">
      <div className="container header-row">
        <Link to="/" className="brand" aria-label="AIX Aleph – Start">AIX Aleph</Link>

        <nav className={"nav" + (open ? " open" : "")} aria-label="Hauptnavigation">
          <Item to="/demo">Demo</Item>
          <Item to="/orchestrator">Orchestrator</Item>
          <Item to="/models">Models</Item>
          <Item to="/experiments">Experiments</Item>
          <Item to="/data">Data</Item>
          <Item to="/safety">Safety</Item>
          <Item to="/investors">Investors</Item>

          <div className="lang-wrap" aria-label="Sprache wählen">
            <button
              className="lang-btn"
              onClick={() => changeLanguage?.("de")}
              aria-pressed={i18n?.language?.startsWith("de") ? "true" : "false"}
              title="Deutsch"
            >DE</button>
            <span className="lang-sep">/</span>
            <button
              className="lang-btn"
              onClick={() => changeLanguage?.("en")}
              aria-pressed={i18n?.language?.startsWith("en") ? "true" : "false"}
              title="English"
            >EN</button>
          </div>

          <div className="hdr-actions">
            <Link to="/register" className="hdr-btn btn-primary">Kostenlos starten</Link>
            <Link to="/login" className="hdr-btn btn-outline">Login</Link>
          </div>
        </nav>

        <button
          className={"hamburger" + (open ? " is-open" : "")}
          aria-label="Menü"
          aria-expanded={open ? "true" : "false"}
          onClick={() => setOpen(!open)}
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
