import React from "react";

export default function Docs() {
  return (
    <main className="max-w-[1100px] mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-4xl font-extrabold">Doku</h1>
      <p className="mt-4 text-muted">API-Referenzen und Integrationshinweise folgen.</p>
      <div className="panel p-6 mt-6">
        <ul className="list-disc pl-6 text-muted">
          <li>Auth & Tokens</li>
          <li>Experiments API</li>
          <li>Leads API</li>
          <li>Webhooks</li>
        </ul>
      </div>
    </main>
  );
}
