// src/pages/_Scaffold.jsx
import React from "react";

export default function Scaffold({ title, subtitle, children }) {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl p-8 border bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
        <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
        {subtitle && <p className="mt-1 text-slate-600 dark:text-slate-300">{subtitle}</p>}
      </div>
      {children && <div className="rounded-2xl border bg-white/70 dark:bg-slate-900/40 backdrop-blur p-6">{children}</div>}
    </div>
  );
}
