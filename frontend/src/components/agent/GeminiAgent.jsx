// src/components/agent/AgentWidget.jsx
import React from "react";

export default function AgentWidget({ title = "Agent", welcome = "", provider = "generic" }) {
  return (
    <section className="panel p-4">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm opacity-80">{welcome}</p>
      <div className="mt-3 text-xs opacity-60">Provider: {provider}</div>
    </section>
  );
}
