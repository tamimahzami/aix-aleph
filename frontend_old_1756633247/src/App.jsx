import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Experiments from "./pages/Experiments";

export default function App() {
  return (
    <SiteFrame>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/experiments" element={<Experiments />} />
      </Routes>
    </SiteFrame>
  );
}

function SiteFrame({ children }) {
  return (
    <div style={{ minHeight: "100dvh", background: "#f8fafc", color: "#0f172a" }}>
      <Header />
      <main style={{ maxWidth: 1080, margin: "0 auto", padding: "24px 16px" }}>
        {children}
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header style={{ background: "#ffffff", borderBottom: "1px solid #e5e7eb" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "12px 16px",
                    display: "flex", alignItems: "center", gap: 16 }}>
        <Logo />
        <nav style={{ marginLeft: "auto", display: "flex", gap: 12 }}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/experiments">Experiments</NavLink>
          <a style={btnSecondary} href="https://example.com/docs" rel="noreferrer">Docs</a>
          <a style={btnPrimary} href="#get-started">Get Started</a>
        </nav>
      </div>
    </header>
  );
}

function NavLink({ to, children }) {
  return (
    <Link to={to} style={{ textDecoration: "none", color: "#0f172a", fontWeight: 600 }}>
      {children}
    </Link>
  );
}

function Logo() {
  return <div style={{ fontWeight: 800, fontSize: 18 }}>UW_PICO</div>;
}

function Footer() {
  return (
    <footer style={{ marginTop: 40, padding: "16px",
                     borderTop: "1px solid #e5e7eb", color: "#475569" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        © {new Date().getFullYear()} UW_PICO • All rights reserved.
      </div>
    </footer>
  );
}

const btnPrimary = {
  padding: "8px 12px",
  background: "#0ea5e9",
  color: "#fff",
  borderRadius: 8,
  fontWeight: 700
};
const btnSecondary = {
  padding: "8px 12px",
  background: "#f1f5f9",
  color: "#0f172a",
  borderRadius: 8,
  fontWeight: 700
};
