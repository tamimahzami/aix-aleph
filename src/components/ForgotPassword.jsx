// src/components/ForgotPassword.jsx
import React, { useState } from "react";
import { requestPasswordReset, resetPassword } from "../services/api";

export default function ForgotPassword({ open, onClose, defaultEmail = "" }) {
  const [tab, setTab] = useState("request"); // "request" | "reset"
  const [email, setEmail] = useState(defaultEmail);
  const [token, setToken] = useState("");
  const [newPw, setNewPw] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());
  const pwValid = newPw.length >= 8 && /[A-Za-z]/.test(newPw) && /\d/.test(newPw);
  const canRequest = tab === "request" ? emailValid : token && pwValid;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!canRequest) return;
    setLoading(true);
    setMsg("");
    setErr("");

    try {
      if (tab === "request") {
        const res = await requestPasswordReset(email);
        setMsg(res?.message || "Wenn die E-Mail existiert, wurde ein Reset-Link gesendet.");
      } else {
        const res = await resetPassword(token, newPw);
        setMsg(res?.message || "Passwort wurde zurückgesetzt. Du kannst dich nun einloggen.");
      }
    } catch (e2) {
      setErr(e2.message || "Fehler beim Passwort-Reset.");
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Passwort zurücksetzen"
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(2,6,23,.66)",
        display: "grid",
        placeItems: "center",
        padding: 16,
        zIndex: 50
      }}
      onClick={onClose}
    >
      <div
        className="card"
        style={{ width: "100%", maxWidth: 480 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ margin: 0 }}>Passwort zurücksetzen</h3>
          <button
            type="button"
            className="btn btn-outline"
            onClick={onClose}
            aria-label="Dialog schließen"
          >
            Schließen
          </button>
        </div>

        {/* Tabs */}
        <div className="btn-row" style={{ marginTop: 12 }}>
          <button
            type="button"
            className={`btn ${tab === "request" ? "btn-primary" : "btn-outline"}`}
            onClick={() => setTab("request")}
          >
            Link anfordern
          </button>
          <button
            type="button"
            className={`btn ${tab === "reset" ? "btn-primary" : "btn-outline"}`}
            onClick={() => setTab("reset")}
          >
            Mit Token setzen
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-16">
          {tab === "request" ? (
            <>
              <label className="p-muted" style={{ display: "block", marginBottom: 6 }}>
                E-Mail
              </label>
              <input
                className="input"
                type="email"
                placeholder="z. B. name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={!emailValid}
                required
              />
            </>
          ) : (
            <>
              <label className="p-muted" style={{ display: "block", marginBottom: 6 }}>
                Reset-Token (aus E-Mail)
              </label>
              <input
                className="input"
                type="text"
                placeholder="Token einfügen"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                required
              />

              <label className="p-muted" style={{ display: "block", margin: "12px 0 6px" }}>
                Neues Passwort
              </label>
              <input
                className="input"
                type="password"
                placeholder="Mind. 8 Zeichen, 1 Buchst., 1 Zahl"
                value={newPw}
                onChange={(e) => setNewPw(e.target.value)}
                aria-invalid={!pwValid}
                required
              />
              <div className="pw-hints">
                <div className="pw-meter"><span style={{
                  width: `${Math.min(3, (newPw.length >= 8) + (/[A-Za-z]/.test(newPw) ? 1 : 0) + (/\d/.test(newPw) ? 1 : 0)) / 3 * 100}%`
                }} className={(newPw.length >= 8 && /[A-Za-z]/.test(newPw) && /\d/.test(newPw)) ? "pw-strong" : (newPw.length >= 8 && (/[A-Za-z]/.test(newPw) || /\d/.test(newPw))) ? "pw-mid" : "pw-weak"} /></div>
                <div className="pw-legend">
                  <span>Länge {newPw.length >= 8 ? "✅" : "❌"}</span>
                  <span>Buchstabe {/[A-Za-z]/.test(newPw) ? "✅" : "❌"}</span>
                  <span>Zahl {/\d/.test(newPw) ? "✅" : "❌"}</span>
                </div>
              </div>
            </>
          )}

          <div className="btn-row" style={{ marginTop: 16 }}>
            <button type="submit" className="btn btn-primary" disabled={!canRequest || loading}>
              {loading ? "Bitte warten…" : tab === "request" ? "Link senden" : "Passwort setzen"}
            </button>
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Abbrechen
            </button>
          </div>
        </form>

        {!!msg && <p className="alert success mt-12">{msg}</p>}
        {!!err && <p className="alert error mt-12">{err}</p>}
      </div>
    </div>
  );
}
