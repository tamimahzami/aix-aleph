// src/pages/LandingPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  BoltIcon,
  TruckIcon,
  DevicePhoneMobileIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

export default function LandingPage() {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 py-20">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Orchestrierung autonomer Intelligenz — weltweit
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            AIX Aleph ist das Betriebssystem für KI-Agenten: neuro-symbolisch,
            policy-geführt und echtzeit-fähig – von der Edge bis zur planetaren
            Cloud.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/demo"
              className="rounded-xl bg-indigo-600 text-white px-6 py-3 font-medium hover:bg-indigo-500 transition"
            >
              Demo anfordern
            </Link>
            <Link
              to="/docs"
              className="rounded-xl border px-6 py-3 font-medium hover:bg-white/60 dark:hover:bg-white/10 transition"
            >
              Mehr erfahren
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center">
          Was AIX Aleph besonders macht
        </h2>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border bg-white dark:bg-slate-900/50 p-6 hover:shadow-lg transition">
            <BoltIcon className="h-10 w-10 text-indigo-600" />
            <h3 className="mt-4 font-semibold">Neuro-symbolische Steuerung</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Kombination aus Lernen & Logik für robuste Agenten in regulierten
              Domänen.
            </p>
          </div>

          <div className="rounded-2xl border bg-white dark:bg-slate-900/50 p-6 hover:shadow-lg transition">
            <TruckIcon className="h-10 w-10 text-indigo-600" />
            <h3 className="mt-4 font-semibold">Realtime Fabric mit CRDT</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Konsistente Zustände bei sub-ms Latenzen – von Sensor bis Aktion.
            </p>
          </div>

          <div className="rounded-2xl border bg-white dark:bg-slate-900/50 p-6 hover:shadow-lg transition">
            <DevicePhoneMobileIcon className="h-10 w-10 text-indigo-600" />
            <h3 className="mt-4 font-semibold">Mobility Integration</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Ladeinfrastruktur, Fahrtenbuch & E-Depot – vollständig integriert.
            </p>
          </div>

          <div className="rounded-2xl border bg-white dark:bg-slate-900/50 p-6 hover:shadow-lg transition">
            <ShieldCheckIcon className="h-10 w-10 text-indigo-600" />
            <h3 className="mt-4 font-semibold">Trust Layer & Policies</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Explainability, Policy-Durchsetzung & Secrets in Hardware-Enklaven.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
