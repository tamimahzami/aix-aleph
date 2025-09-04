// src/components/Header.jsx
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../lib/auth";
import LogoMobility from "./LogoMobility";

function LanguageSwitcher({ className = "" }) {
  const { i18n } = useTranslation();
  const current = i18n.language || "de";
  const toggle = () => i18n.changeLanguage(current.startsWith("de") ? "en" : "de");
  return (
    <button
      onClick={toggle}
      className={`text-sm rounded-xl border px-3 py-1.5 hover:bg-white/60 dark:hover:bg-white/10 ${className}`}
      aria-label="Change language"
      title="Sprache wechseln"
    >
      {current.startsWith("de") ? "DE" : "EN"}
    </button>
  );
}

export default function Header({ Container = ({ children }) => <div className="mx-auto max-w-7xl">{children}</div> }) {
  const { t } = useTranslation();
  const { user, logout } = useAuth();

  const nav = [
    { to: "/products",  label: t("nav.products", { defaultValue: "Produkte" }) },
    { to: "/solutions", label: t("nav.solutions", { defaultValue: "Lösungen" }) },
    { to: "/docs",      label: t("nav.docs", { defaultValue: "Docs" }) },
    { to: "/demo",      label: t("nav.demo", { defaultValue: "Demo" }) },
    { to: "/support",   label: t("nav.support", { defaultValue: "Support" }) },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/70 backdrop-blur-md border-b">
      <Container>
        <div className="px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <LogoMobility size={28} className="text-cyan-600 dark:text-cyan-300" />
          </Link>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) =>
                  `text-sm transition hover:text-cyan-700 dark:hover:text-cyan-300 ${
                    isActive ? "text-cyan-700 dark:text-cyan-300 font-medium" : "text-slate-600 dark:text-slate-300"
                  }`
                }
              >
                {n.label}
              </NavLink>
            ))}
          </nav>

          {/* Right: Lang + Auth */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            {user ? (
              <>
                <span className="hidden sm:block text-sm text-slate-500">
                  {user.name || user.email}
                </span>
                <button
                  onClick={logout}
                  className="text-sm rounded-xl border px-3 py-1.5 hover:bg-white/60 dark:hover:bg-white/10"
                >
                  {t("auth.logout", { defaultValue: "Logout" })}
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm rounded-xl border px-3 py-1.5 hover:bg-white/60 dark:hover:bg-white/10"
                >
                  {t("nav.login", { defaultValue: "Login" })}
                </Link>
                <Link
                  to="/register"
                  className="text-sm rounded-xl bg-cyan-600 text-white px-3 py-1.5 hover:bg-cyan-700"
                >
                  {t("nav.register", { defaultValue: "Registrieren" })}
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
}
