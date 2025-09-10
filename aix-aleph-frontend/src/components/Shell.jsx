import React from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

export default function Shell({ children }) {
  return (
    <div className="min-h-full flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container-app py-10">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
