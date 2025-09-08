import React from "react";
import AgentWidget from "./AgentWidget.jsx";
import { askChat } from "../../lib/api.js";

export default function GeminiAgent() {
  return (
    <AgentWidget
      provider="gemini"
      title="Gemini · Human ♥ KI"
      welcome="Ich bin AIX ALEPH Gemini — Herz & KI, vereint. Frag mich zu Technologie, Demo, Preisen oder Sicherheit."
    />
  );
}
