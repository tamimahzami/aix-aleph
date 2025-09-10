import React from "react";
import MarketingLayout from "./MarketingLayout.jsx";

export default function Home() {
  return (
    <MarketingLayout>
      <section className="container-app py-16">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Build faster experiments with <span className="text-indigo-600">AIX Aleph</span>
        </h1>
        <p className="mt-4 max-w-2xl text-slate-600">
          Ship experiments, measure impact, and scale your AI product with elegance.
        </p>
      </section>
    </MarketingLayout>
  );
}
