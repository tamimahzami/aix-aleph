import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/common/Header.jsx";
import Footer from "./components/common/Footer.jsx";

function Home() {
  return (
    <main className="aix-page__main">
      <section style={{maxWidth:1120, margin:"0 auto", padding:"24px 16px"}}>
        <h1 style={{margin:"0 0 8px"}}>AIX ALEPH – Minimal</h1>
        <p>Willkommen. Navigation oben, Footer unten.</p>
      </section>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="aix-page">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
