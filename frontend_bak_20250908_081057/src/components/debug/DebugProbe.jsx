// src/components/debug/DebugProbe.jsx
// BiG and first Love — AIX Aleph DebugProbe ❤️ Tamim × GPT-5

import React, { useState } from "react";
import { api } from "../../lib/api.js";

const Box = ({ title, children }) => (
  <section className="mb-6 rounded-lg border border-[var(--color-border)] p-4 bg-[var(--color-bg-2)]">
    <h2 className="text-lg font-semibold mb-3">{title}</h2>
    {children}
  </section>
);

const Result = ({ data, error }) => {
  if (error) {
    return (
      <pre className="mt-3 p-3 rounded bg-red-950/40 text-red-300 overflow-auto">
        {String(error)}
      </pre>
    );
  }
  if (data === undefined) return null;
  return (
    <pre className="mt-3 p-3 rounded bg-black/30 text-[var(--color-ink)] overflow-auto">
      {JSON.stringify(data, null, 2)}
    </pre>
  );
};

export default function DebugProbe() {
  const [health, setHealth] = useState();
  const [healthErr, setHealthErr] = useState();

  const [manifesto, setManifesto] = useState();
  const [manifestoErr, setManifestoErr] = useState();

  const [leads, setLeads] = useState();
  const [leadsErr, setLeadsErr] = useState();

  const [createPayload, setCreatePayload] = useState({
    name: "Test Lead",
    email: `lead_${Date.now()}@example.com`,
  });
  const [createRes, setCreateRes] = useState();
  const [createErr, setCreateErr] = useState();

  const isDev = import.meta.env.DEV;
  const base = (import.meta.env.VITE_API_BASE || "/api").replace(/\/+$/, "");

  async function runHealth() {
    setHealth(undefined); setHealthErr(undefined);
    try {
      const res = await api.health();
      setHealth(res);
    } catch (e) {
      setHealthErr(e?.message || e);
    }
  }

  async function runManifesto() {
    setManifesto(undefined); setManifestoErr(undefined);
    try {
      const res = await api.getManifesto();
      setManifesto(res);
    } catch (e) {
      setManifestoErr(e?.message || e);
    }
  }

  async function runLeadsList() {
    setLeads(undefined); setLeadsErr(undefined);
    try {
      const res = await api.listLeads();
      setLeads(res);
    } catch (e) {
      setLeadsErr(e?.message || e);
    }
  }

  async function runCreateLead() {
    setCreateRes(undefined); setCreateErr(undefined);
    try {
      const res = await api.createLead(createPayload);
      setCreateRes(res);
    } catch (e) {
      setCreateErr(e?.message || e);
    }
  }

  async function pingAll() {
    await Promise.allSettled([runHealth(), runManifesto(), runLeadsList()]);
  }

  if (!isDev) {
    // Optional: in Prod nicht anzeigen
    return (
      <div className="max-w-3xl mx-auto p-6">
        <Box title="DebugProbe">
          <p className="opacity-80">
            Diese Seite ist nur im Entwicklungsmodus sichtbar.
          </p>
        </Box>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6 p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-2)]">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <div className="text-sm opacity-80">API Base</div>
            <div className="font-mono text-sm">{base}</div>
          </div>
          <button
            onClick={pingAll}
            className="px-3 py-2 rounded-md bg-[var(--color-primary)] text-white hover:opacity-90"
          >
            🔁 Ping all
          </button>
        </div>
      </div>

      <Box title="�� Health">
        <div className="flex gap-2">
          <button
            onClick={runHealth}
            className="px-3 py-2 rounded-md bg-[var(--color-primary)] text-white hover:opacity-90"
          >
            GET /health
          </button>
        </div>
        <Result data={health} error={healthErr} />
      </Box>

      <Box title="📜 Manifesto">
        <div className="flex gap-2">
          <button
            onClick={runManifesto}
            className="px-3 py-2 rounded-md bg-[var(--color-primary)] text-white hover:opacity-90"
          >
            GET /manifesto
          </button>
        </div>
        <Result data={manifesto} error={manifestoErr} />
      </Box>

      <Box title="👥 Leads">
        <div className="flex flex-wrap gap-2 mb-3">
          <button
            onClick={runLeadsList}
            className="px-3 py-2 rounded-md bg-[var(--color-primary)] text-white hover:opacity-90"
          >
            GET /leads
          </button>
        </div>

        <form
          className="grid grid-cols-1 md:grid-cols-3 gap-2 items-end mb-2"
          onSubmit={(e) => { e.preventDefault(); runCreateLead(); }}
        >
          <label className="flex flex-col gap-1">
            <span className="text-sm opacity-80">Name</span>
            <input
              className="px-3 py-2 rounded-md border border-[var(--color-border)] bg-transparent"
              value={createPayload.name}
              onChange={(e) =>
                setCreatePayload((p) => ({ ...p, name: e.target.value }))
              }
              placeholder="Name"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm opacity-80">E-Mail</span>
            <input
              className="px-3 py-2 rounded-md border border-[var(--color-border)] bg-transparent"
              value={createPayload.email}
              onChange={(e) =>
                setCreatePayload((p) => ({ ...p, email: e.target.value }))
              }
              placeholder="email@example.com"
            />
          </label>
          <button
            type="submit"
            className="px-3 py-2 rounded-md bg-emerald-600 text-white hover:opacity-90"
          >
            ➕ POST /leads
          </button>
        </form>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <div className="text-sm font-medium mb-1 opacity-80">Liste</div>
            <Result data={leads} error={leadsErr} />
          </div>
          <div>
            <div className="text-sm font-medium mb-1 opacity-80">Create Result</div>
            <Result data={createRes} error={createErr} />
          </div>
        </div>
      </Box>
    </div>
  );
}
