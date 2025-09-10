// src/components/ChatComponent.tsx
import { useState } from "react";
import { api } from "../api";

export default function ChatComponent() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Füge die Nachricht des Benutzers zur UI hinzu
    const userMessage = { role: "user", text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");

    try {
      const response = await api.chat({
        provider: "gemini",
        sessionId,
        message: input,
      });

      // Aktualisiere die sessionId, falls es eine neue Session ist
      if (!sessionId) {
        setSessionId(response.sessionId);
      }

      // Füge die Antwort des KI-Modells zur UI hinzu
      const aiMessage = { role: "assistant", text: response.reply };
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      console.error("Chat error:", err);
      // Füge eine Fehlermeldung zur UI hinzu
      const errorMessage = { role: "system", text: "Fehler beim Senden der Nachricht." };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  return (
    <div className="chat-container">
      {messages.map((msg, index) => (
        <div key={index} className={`message-box ${msg.role}`}>
          {msg.text}
        </div>
      ))}
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === "Enter" && sendMessage()}
      />
      <button onClick={sendMessage}>Senden</button>
    </div>
  );
}
