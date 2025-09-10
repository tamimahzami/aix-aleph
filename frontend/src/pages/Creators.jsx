// src/pages/Creators.jsx
import React from "react";
export default function Creators() {
  return (
    <section className="page-section">
      <div className="container-max">
        <div className="panel">
          <h1 className="text-2xl font-bold">Creators</h1>
          <p className="muted">Design-Kits, Logos, Screenshots.</p>
          <div className="grid md:grid-cols-3 gap-4 mt-3">
            <div className="card">Brand Kit</div>
            <div className="card">UI Kit</div>
            <div className="card">Screens & Mockups</div>
          </div>
        </div>
      </div>
    </section>
  );
}
