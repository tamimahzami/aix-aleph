// src/components/common/AgentModal.jsx
import React, { useState } from "react";

/**
 * Einfache Stub-Komponente für den AIX Agent
 * - Öffnet als Modal über Footer-Button
 * - Kann später durch echten Chat/Agent ersetzt werden
 */
export default function AgentModal() {
  const [open, setOpen] = useState(false);

  // globale API: Footer kann AgentModal.open() aufrufen
  AgentModal.open = () => setOpen(true);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur">
      <div className="panel relative w-full max-w-md p-6 bg-[var(--surface)] text-white">
        <h2 className="text-lg font-bold mb-4">AIX Aleph Agent</h2>
        <p className="text-sm text-[var(--muted)] mb-6">
          👋 Hallo! Ich bin dein Heartbeat-Agent.  
          Stell mir deine Fragen – bald beantworte ich sie live.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => setOpen(false)}
            className="btn btn-ghost px-4 py-2"
          >
            Schließen
          </button>
          <button
            onClick={() => alert("Feature coming soon 🚀")}
            className="btn btn-primary px-4 py-2"
          >
            Senden
          </button>
        </div>
      </div>
    </div>
  );
}
