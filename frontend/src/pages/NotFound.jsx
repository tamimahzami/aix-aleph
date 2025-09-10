// src/pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";
import ContainerMax from "../components/common/ContainerMax.jsx";

export default function NotFound(){
  return (
    <section className="page-section">
      <ContainerMax>
        <div className="card" style={{textAlign:"center"}}>
          <div style={{display:"grid", placeItems:"center", marginBottom:"1rem"}}>
            <svg width="120" height="120" viewBox="0 0 84 84" aria-hidden>
              <circle cx="42" cy="42" r="38" fill="none" stroke="currentColor" opacity="0.25"/>
              <path d="M42 16 L67 60 H17 Z" fill="url(#g404)" stroke="currentColor" opacity="0.95"/>
              <rect x="41" y="28" width="2.8" height="16" rx="1.4" fill="currentColor"/>
              <rect x="41" y="46.5" width="2.8" height="2.8" rx="1.4" fill="currentColor"/>
              <defs>
                <linearGradient id="g404" x1="17" y1="60" x2="67" y2="16">
                  <stop stopColor="var(--primary)"/>
                  <stop offset="1" stopColor="color-mix(in oklab, var(--primary) 60%, white)"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h1 className="text-2xl font-extrabold">Seite nicht gefunden</h1>
          <p className="muted mt-1">Die angeforderte Route existiert nicht oder wurde verschoben.</p>
          <div className="mt-4" style={{display:"flex", gap:"8px", justifyContent:"center"}}>
            <Link to="/" className="btn">Zur Startseite</Link>
            <Link to="/dashboard" className="btn btn-ghost">Zum Dashboard</Link>
          </div>
        </div>
      </ContainerMax>
    </section>
  );
}
