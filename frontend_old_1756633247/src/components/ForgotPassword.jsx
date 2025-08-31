// src/components/ForgotPassword.jsx
import React, { useState } from "react";
import { requestPasswordReset } from "../services/api";

export default function ForgotPassword({ open, onClose, defaultEmail = "" }) {
  const [email, setEmail] = useState(defaultEmail);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    setErr("");
    setLoading(true);
    try {
      const res = await requestPasswordReset(email.trim());
      setMsg(res.message || "Wenn die E-Mail existiert, wurde ein Link versendet.");
    } catch (e) {
      setErr(e.message || "Fehler beim Anfordern.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Passwort zurücksetzen</h3>
        <form onSubmit={submit}>
          <label className="label mt-12">E-Mail</label>
          <input
            type="email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@beispiel.de"
            required
          />
          {!!msg && <p className="alert success" style={{ marginTop: 12 }}>{msg}</p>}
          {!!err && <p className="alert error" style={{ marginTop: 12 }}>{err}</p>}

          <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
            <button className="btn btn-primary" disabled={loading}>
              {loading ? "Bitte warten…" : "Link senden"}
            </button>
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Schließen
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
