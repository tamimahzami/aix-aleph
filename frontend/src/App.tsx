import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

const Page = (title: string) => (
  <main style={{ background: "#fff", minHeight: "100vh" }}>
    <div style={{ maxWidth: 880, margin: "0 auto", padding: 24 }}>
      <h1 style={{ marginBottom: 8 }}>{title}</h1>
      <p>Inhalt folgt.</p>
      <nav style={{ marginTop: 16 }}>
        <Link to="/" style={{ marginRight: 12 }}>Home</Link>
        <Link to="/preise" style={{ marginRight: 12 }}>Preise</Link>
        <Link to="/unternehmen" style={{ marginRight: 12 }}>Unternehmen</Link>
        <Link to="/legal/datenschutz">Datenschutz</Link>
      </nav>
    </div>
  </main>
);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={Page("AIX ALEPH")} />
        <Route path="/preise" element={Page("Preise")} />
        <Route path="/unternehmen" element={Page("Unternehmen")} />
        <Route path="/legal/datenschutz" element={Page("Datenschutz")} />
      </Routes>
    </BrowserRouter>
  );
}
