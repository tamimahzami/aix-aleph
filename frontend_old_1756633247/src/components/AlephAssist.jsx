import { useState } from "react";
import styles from "../styles/Landing.module.css";

export default function AlephAssist() {
  const [value, setValue] = useState("");
  const [msgs, setMsgs] = useState([
    { role: "assistant", text: "Hallo, ich bin AIX Aleph Assist. Frage mich nach Wartung, Energie oder Optimierung – ich gebe dir konkrete Handlungsvorschläge." }
  ]);

  const send = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    setMsgs(m => [...m, { role: "user", text: value }]);
    // hier später eure echte Backend-Integration einhängen
    setTimeout(() => {
      setMsgs(m => [...m, { role: "assistant", text: "Beispiel: Für Linie 12 heute Abend empfehle ich 8% Ladepuffer und eine Umleitung über Knoten B, um 12 Minuten zu sparen." }]);
    }, 300);
    setValue("");
  };

  return (
    <div className={styles.assistant}>
      <div className={styles.assistantHeader}>
        <div className={styles.assistantIcon}>A</div>
        <div>
          <h3 style={{ margin: 0 }}>AIX Aleph Assist</h3>
          <p style={{ margin: ".25rem 0 0", opacity: .8 }}>
            Operational AI – direkt für Flotte & OT.
          </p>
        </div>
      </div>

      <div className={styles.assistantContent}>
        <div style={{ display: "grid", gap: "0.75rem", maxHeight: 260, overflow: "auto" }}>
          {msgs.map((m, i) => (
            <div key={i} style={{
              alignSelf: m.role === "user" ? "end" : "start",
              background: m.role === "user" ? "rgba(37,99,235,.12)" : "transparent",
              padding: ".6rem .8rem",
              borderRadius: 8
            }}>
              <strong style={{ marginRight: 6 }}>{m.role === "user" ? "Du" : "Aleph"}</strong>
              <span>{m.text}</span>
            </div>
          ))}
        </div>

        <form className={styles.assistantPrompt} onSubmit={send}>
          <input
            className={styles.assistantInput}
            placeholder="Frage Aleph… (z. B. Routenoptimierung für Linie 12 heute Abend)"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button className={styles.assistantSend} type="submit">Senden</button>
        </form>
        <p className={styles.examplePrompt}>z. B. „Zeig mir Routenoptimierung für Linie 12 heute Abend“</p>
      </div>
    </div>
  );
}
