import React from "react";
export default function SimplePage({ title, lead, children }) {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10 space-y-6">
      <header>
        <h1 className="text-2xl md:text-3xl font-extrabold">{title}</h1>
        {lead ? <p className="text-muted mt-2">{lead}</p> : null}
      </header>
      <div className="panel p-5">
        {children ?? <p className="text-muted">Inhalt folgt…</p>}
      </div>
    </div>
  );
}
