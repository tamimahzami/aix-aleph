// frontend/src/pages/ConfirmResetPassword.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { confirmPasswordReset } from "../services/api";

const pwRules = {
  minLen: 8,
  hasLetter: /[A-Za-z]/,
  hasDigit: /\d/,
};

function validatePassword(pw) {
  if (!pw || pw.length < pwRules.minLen) return "Mind. 8 Zeichen.";
  if (!pwRules.hasLetter.test(pw)) return "Mind. ein Buchstabe erforderlich.";
  if (!pwRules.hasDigit.test(pw)) return "Mind. eine Ziffer erforderlich.";
  return null;
}

export default function ConfirmResetPassword() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const tokenFromUrl = params.get("token") || "";

  const [token, setToken] = useState(tokenFromUrl);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [showPw, setShowPw] = useState(false);

  const [loading, setLoading] = useState(false);
  const [okMsg, setOkMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const passwordHint = useMemo(() => validatePassword(password), [password]);

  useEffect(() => {
    if (tokenFromUrl) setToken(tokenFromUrl.trim());
  }, [tokenFromUrl]);

  async function onSubmit(e) {
    e.preventDefault();
    setErrMsg("");
    setOkMsg("");

    // Client-Side Checks
    if (!token?.trim()) {
      setErrMsg("Reset-Token fehlt. Bitte den Link erneut anfordern.");
      return;
    }
    const hint = validatePassword(password);
    if (hint) {
      setErrMsg(hint);
      return;
    }
    if (password !== password2) {
      setErrMsg("Passwörter stimmen nicht überein.");
      return;
    }

    setLoading(true);
    try {
      const res = await confirmPasswordReset(token, password);
      setOkMsg(res?.message || "Passwort erfolgreich aktualisiert.");

      // Optional: nach 2s zum Login
      setTimeout(() => navigate("/login", { replace: true }), 2000);
    } catch (err) {
      setErrMsg(err.message || "Zurücksetzen fehlgeschlagen.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card" style={{ maxWidth: 460, margin: "24px auto" }}>
      <h2>Neues Passwort setzen</h2>
      <p className="muted" style={{ marginTop: 4 }}>
        Bitte neues Passwort vergeben. Der Token stammt üblicherweise aus dem Link in deiner E-Mail.
      </p>

      {okMsg && <p className="alert success" style={{ marginTop: 12 }}>{okMsg} Weiterleitung zum Login…</p>}
      {errMsg && <p className="alert error" style={{ marginTop: 12 }}>{errMsg}</p>}

      <form onSubmit={onSubmit} style={{ marginTop: 12 }}>
        <label className="label mt-12">Reset-Token</label>
        <input
          className="input"
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Token aus dem Link"
        />

        <label className="label mt-12">Neues Passwort</label>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            className="input"
            type={showPw ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="new-password"
          />
          <button
            type="button"
            className="btn"
            onClick={() => setShowPw((s) => !s)}
            aria-label={showPw ? "Passwort verbergen" : "Passwort anzeigen"}
          >
            {showPw ? "🙈" : "👁️"}
          </button>
        </div>
        <small className="muted">
          Mind. 8 Zeichen, inkl. Buchstabe & Ziffer.
          {password && passwordHint && <span style={{ color: "#c00" }}> – {passwordHint}</span>}
        </small>

        <label className="label mt-12">Passwort bestätigen</label>
        <input
          className="input"
          type={showPw ? "text" : "password"}
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          placeholder="nochmal eingeben"
          autoComplete="new-password"
        />

        <button className="btn btn-primary mt-16" disabled={loading}>
          {loading ? "Speichere…" : "Passwort setzen"}
        </button>
      </form>

      <div style={{ marginTop: 16 }}>
        <Link to="/login" className="link">Zurück zum Login</Link>
      </div>
    </div>
  );
}
