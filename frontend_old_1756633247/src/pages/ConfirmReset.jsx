// src/pages/ConfirmReset.jsx
import React, { useState, useMemo } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { confirmPasswordReset } from "../services/api";

function validatePw(pw) {
  return pw.length >= 8 && /[A-Za-z]/.test(pw) && /\d/.test(pw);
}

export default function ConfirmReset() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const initialToken = (params.get("token") || "").trim();

  const [token, setToken] = useState(initialToken);
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const canSubmit = useMemo(() => {
    return token && pw && pw2 && pw === pw2 && validatePw(pw);
  }, [token, pw, pw2]);

  async function onSubmit(e) {
    e.preventDefault();
    setErr(""); setMsg("");
    setLoading(true);
    try {
      const res = await confirmPasswordReset(token, pw);
      setMsg(res?.message || "Passwort wurde aktualisiert.");
      // optional: nach kurzer Pause zum Login
      setTimeout(() => navigate("/login", { replace: true }), 1200);
    } catch (e) {
      setErr(e.message || "Zurücksetzen fehlgeschlagen");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 480, margin: "32px auto" }}>
      <h2>Neues Passwort setzen</h2>
      <p>Bitte vergib ein neues Passwort. Anforderungen: mindestens 8 Zeichen, 1 Buchstabe, 1 Zahl.</p>

      {msg && <p style={{ background:"#e6ffed", border:"1px solid #b7eb8f", padding:"8px 12px", borderRadius:8 }}>{msg}</p>}
      {err && <p style={{ background:"#fff1f0", border:"1px solid #ffa39e", padding:"8px 12px", borderRadius:8 }}>{err}</p>}

      <form onSubmit={onSubmit} style={{ marginTop: 16 }}>
        <label className="label">Token</label>
        <input
          type="text"
          className="input"
          placeholder="Reset-Token"
          value={token}
          onChange={(e)=>setToken(e.target.value.trim())}
          required
        />

        <label className="label mt-12">Neues Passwort</label>
        <input
          type="password"
          className="input"
          placeholder="••••••••"
          value={pw}
          onChange={(e)=>setPw(e.target.value)}
          required
        />

        <label className="label mt-12">Passwort wiederholen</label>
        <input
          type="password"
          className="input"
          placeholder="••••••••"
          value={pw2}
          onChange={(e)=>setPw2(e.target.value)}
          required
        />

        <div style={{ fontSize: 12, color: validatePw(pw) ? "#52c41a" : "#fa8c16", marginTop: 8 }}>
          {validatePw(pw) ? "Passwortanforderungen erfüllt ✔︎" : "Mind. 8 Zeichen, 1 Buchstabe, 1 Zahl"}
        </div>

        <button className="btn btn-primary mt-16" disabled={!canSubmit || isLoading}>
          {isLoading ? "Speichere…" : "Passwort setzen"}
        </button>
      </form>

      <div style={{ marginTop: 16, fontSize: 14 }}>
        <Link to="/login">Zurück zum Login</Link>
      </div>
    </div>
  );
}
