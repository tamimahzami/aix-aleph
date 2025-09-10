import React from "react";
import AgentWidget from "./AgentWidget.jsx";

export default function ChatGPTAgent() {
  return (
    <AgentWidget
      provider="openai"
      title="ChatGPT · Human ♥ KI"
      welcome="Ich bin AIX ALEPH ChatGPT — frag mich alles rund um Orchestrierung, Policies & Realtime."
    />
  );
}
