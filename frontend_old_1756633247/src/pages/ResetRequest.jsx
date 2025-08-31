// frontend/src/pages/ResetRequest.jsx
import React, { useState } from "react";
import { requestPasswordReset } from "../services/api";

export default function ResetRequest() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [isLoading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setMsg(""); setErr(""); setLoading(true);
    try {
      const res = await requestPasswordReset(email.trim());
      setMsg(res.message || "Falls ein Konto existiert, wurde ein Reset-Link gesendet.");
    } catch (e) { setErr(e.message || "Fehler beim Anfordern"); }
    finally { setLoading(false); }
  }

  return (
    <div style={{ maxWidth: 420, margin: "24px auto" }}>
      <h2>Passwort zurücksetzen</h2>
      {msg && <p style={{ color: "green" }}>{msg}</p>}
      {err && <p style={{ color: "crimson" }}>{err}</p>}
      <form onSubmit={onSubmit}>
        <label>E-Mail</label>
        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
        <button disabled={isLoading}>{isLoading ? "Sende…" : "Reset-Link anfordern"}</button>
      </form>
    </div>
  );
}
