// src/components/AIChatWidget.jsx
import React, { useMemo, useRef, useState } from "react";
import "./ai-chat.css"; // local styles for the widget (see below)

const seedReplies = (q) => {
  // Placeholder logic: simulate Aleph brain
  const lower = q.toLowerCase();
  if (lower.includes("wartung")) return "Ich erkenne erhöhte Vibrationswerte an zwei Achsen. Empfehlung: präventive Wartung in 72h einplanen.";
  if (lower.includes("energie")) return "Lastspitzen zwischen 11–13 Uhr. Vorschlag: Ladevorgänge auf 02–05 Uhr shiften (−18% Stromkosten).";
  if (lower.includes("route")) return "Route B12 ist aktuell staufrei. ETA verkürzt sich um 9 Minuten bei gleicher Energiebilanz.";
  return "Verstanden. Ich analysiere Telemetrie, Auslastung und Energieprofile. Womit soll ich starten – Wartung, Routen oder Kosten?";
};

export default function AIChatWidget(){
  const [messages, setMessages] = useState([
    { role:"assistant", text:"Hallo, ich bin **AIX Aleph Assist**. Frage mich nach Wartung, Energie oder Optimierung – ich gebe dir konkrete Handlungsvorschläge." }
  ]);
  const [input, setInput] = useState("");
  const boxRef = useRef(null);

  const send = () => {
    if(!input.trim()) return;
    const user = { role:"user", text: input.trim() };
    const bot  = { role:"assistant", text: seedReplies(input.trim()) };
    setMessages(m => [...m, user, bot]);
    setInput("");
    requestAnimationFrame(()=> {
      boxRef.current?.scrollTo({ top: boxRef.current.scrollHeight, behavior: "smooth" });
    });
  };

  const handleKey = (e) => {
    if(e.key === "Enter" && !e.shiftKey){
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="aix-chat card">
      <header className="aix-chat__header">
        <div className="dot" /><span>AIX Aleph Assist</span>
      </header>

      <div ref={boxRef} className="aix-chat__box">
        {messages.map((m,i)=>(
          <div key={i} className={`aix-chat__msg ${m.role}`}>
            <div className="bubble" dangerouslySetInnerHTML={{__html: m.text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")}} />
          </div>
        ))}
      </div>

      <div className="aix-chat__input">
        <textarea
          className="textarea"
          rows={2}
          placeholder="Frage Aleph … z. B. 'Zeig mir Routenoptimierung für Linie 12 heute Abend'"
          value={input}
          onChange={e=>setInput(e.target.value)}
          onKeyDown={handleKey}
        />
        <button className="btn btn-primary" onClick={send} aria-label="Senden">Senden</button>
      </div>
      <div className="aix-chat__tips">
        <button onClick={()=>setInput("Empfiehl eine Wartung für Bus 231 basierend auf Telemetrie.")}>Wartung</button>
        <button onClick={()=>setInput("Wie senke ich die Energiekosten zwischen 11–13 Uhr?")}>Energie</button>
        <button onClick={()=>setInput("Optimier die Route für Linie 12 von 16–18 Uhr.")}>Routen</button>
      </div>
    </div>
  );
}
