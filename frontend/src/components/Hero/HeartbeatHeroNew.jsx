import React from "react";

export default function HeartbeatHeroNew({ className = "" }) {
  return (
    <section className={`p-8 rounded-2xl border border-slate-200 dark:border-slate-800 ${className}`}>
      <h1 className="text-3xl font-bold">AIX Aleph</h1>
      <p className="mt-2 opacity-80">
        Neuro-symbolische Autonomie. Realtime. Auditierbar.
      </p>
    </section>
  );
}	
