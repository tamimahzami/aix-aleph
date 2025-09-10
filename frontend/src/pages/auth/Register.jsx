// src/pages/auth/Register.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ContainerMax from "../../components/common/ContainerMax.jsx";

export default function Register() {
  const nav = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [accept, setAccept] = useState(false);

  const [error, setError] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    // einfache Checks
    if (pw.length < 8) {
      setError("Passwort muss mindestens 8 Zeichen lang sein.");
      return;
    }
    if (pw !== pw2) {
      setError("Passwörter stimmen nicht überein.");
      return;
    }
    if (!accept) {
      setError("Bitte AGB & Datenschutz akzeptieren.");
      return;
    }

    setError("");
    // TODO: Hier später Backend-Register-Call einhängen.
    // Erfolgreich -> auf Login leiten
    nav("/login");
  };

  return (
    <section className="page-section">
      <ContainerMax>
        <div className="auth-wrap">
          <div className="auth-card auth-glow">
            <header className="auth-head">
              <h1 className="auth-title">Konto erstellen</h1>
              <p className="auth-sub">
                Willkommen bei AIX Aleph – starte in Minuten.
              </p>
            </header>

            <form className="auth-form" onSubmit={onSubmit}>
              {/* Name */}
              <div className="form-field">
                <label className="form-label" htmlFor="reg-name">Name</label>
                <div className="input-wrap">
                  <svg className="input-icon" viewBox="0 0 20 20" aria-hidden>
                    <path fill="currentColor" d="M10 10a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm0 2.2c-3.2 0-5.8 2-6.7 4.8-.1.3.1.5.4.5h12.6c.3 0 .5-.2.4-.5-.9-2.8-3.5-4.8-6.7-4.8Z" />
                  </svg>
                  <input
                    id="reg-name"
                    type="text"
                    className="input"
                    placeholder="Vor- und Nachname"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* E-Mail */}
              <div className="form-field">
                <label className="form-label" htmlFor="reg-email">E-Mail</label>
                <div className="input-wrap">
                  <svg className="input-icon" viewBox="0 0 20 20" aria-hidden>
                    <path fill="currentColor" d="M2.5 5.5h15v9h-15v-9Zm.9 0 6.6 5.2c.6.47 1.4.47 2 0l6.6-5.2" />
                  </svg>
                  <input
                    id="reg-email"
                    type="email"
                    className="input"
                    placeholder="name@firma.de"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Passwort */}
              <div className="form-field">
                <label className="form-label" htmlFor="reg-pw">Passwort</label>
                <div className="input-wrap">
                  <svg className="input-icon" viewBox="0 0 20 20" aria-hidden>
                    <path fill="currentColor" d="M5 9h10v7H5V9Zm2-3a3 3 0 1 1 6 0v3H7V6Z" />
                  </svg>
                  <input
                    id="reg-pw"
                    type="password"
                    className="input"
                    placeholder="Mind. 8 Zeichen"
                    value={pw}
                    onChange={(e) => setPw(e.target.value)}
                    required
                    minLength={8}
                  />
                </div>
                <div className="helper">Tipp: mind. 1 Zahl & 1 Sonderzeichen.</div>
              </div>

              {/* Passwort wiederholen */}
              <div className="form-field">
                <label className="form-label" htmlFor="reg-pw2">Passwort wiederholen</label>
                <div className="input-wrap">
                  <svg className="input-icon" viewBox="0 0 20 20" aria-hidden>
                    <path fill="currentColor" d="M5 9h10v7H5V9Zm2-3a3 3 0 1 1 6 0v3H7V6Z" />
                  </svg>
                  <input
                    id="reg-pw2"
                    type="password"
                    className="input"
                    placeholder="Nochmals eingeben"
                    value={pw2}
                    onChange={(e) => setPw2(e.target.value)}
                    required
                    minLength={8}
                  />
                </div>
              </div>

              {/* AGB / Datenschutz */}
              <div className="form-field">
                <label className="checkbox-row">
                  <input
                    type="checkbox"
                    checked={accept}
                    onChange={(e) => setAccept(e.target.checked)}
                    style={{ accentColor: "var(--color-primary)" }}
                  />
                  <span>
                    Ich akzeptiere die{" "}
                    <Link to="/legal/agb" className="accent-text hover:underline">AGB</Link>{" "}
                    und die{" "}
                    <Link to="/legal/datenschutz" className="accent-text hover:underline">Datenschutzbestimmungen</Link>.
                  </span>
                </label>
              </div>

              {/* Fehlermeldung */}
              {error && (
                <div className="auth-error" role="alert">
                  {error}
                </div>
              )}

              {/* Aktionen */}
              <div className="auth-actions">
                <button className="btn btn-primary" type="submit">Registrieren</button>
                <button className="btn-outline" type="button" onClick={() => nav("/")}>Abbrechen</button>
              </div>
            </form>

            <div className="auth-foot">
              Bereits ein Konto?{" "}
              <Link to="/login" className="accent-text hover:underline">Zum Login</Link>
            </div>
          </div>
        </div>
      </ContainerMax>
    </section>
  );
}
