import React from "react";
import Header from "../components/Header.jsx";

export default function MarketingLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <footer className="mt-16 border-t border-black/10 py-8 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} AIX Aleph · <a href="/impressum" className="underline">Impressum</a> · <a href="/datenschutz" className="underline">Datenschutz</a>
      </footer>
    </>
  );
}
