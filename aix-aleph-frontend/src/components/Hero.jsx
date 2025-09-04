import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-slate-900 text-white">
      {/* Hintergrundbild */}
      <img
        src="/media/complex-systems.jpg"
        alt="Verkehr, Energienetz und Datenströme"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      {/* Overlay für bessere Lesbarkeit */}
      <div className="absolute inset-0 -z-10 bg-black/50" />

      <div className="mx-auto max-w-5xl px-6 py-20 md:py-28 text-center space-y-6">
        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
          In einer Welt <span className="text-cyan-300">komplexer Systeme</span> …
          <br className="hidden md:block" />
          reicht Reaktion nicht mehr aus.
        </h1>

        <p className="text-lg text-slate-200 max-w-3xl mx-auto">
          AIX Aleph orchestriert KI-Agenten neuro-symbolisch, policy-geführt und in Echtzeit – 
          von der Edge bis zur planetaren Cloud.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
          <Link
            to="/demo"
            className="inline-flex items-center justify-center rounded-xl bg-cyan-600 px-5 py-3 font-medium hover:bg-cyan-500 transition"
          >
            Demo anfordern
          </Link>
          <Link
            to="/solutions"
            className="inline-flex items-center justify-center rounded-xl border border-white/30 px-5 py-3 font-medium hover:bg-white/10 transition"
          >
            Mehr erfahren
          </Link>
        </div>
      </div>
    </section>
  );
}
