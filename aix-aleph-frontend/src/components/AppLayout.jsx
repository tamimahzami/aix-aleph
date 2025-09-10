// src/components/AppLayout.jsx
import React from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

export default function AppLayout({ children }) {
  return (
    <>
      <Header />
      <main className="container py-6">{children}</main>
      <Footer />
    </>
  );
}
