// src/pages/auth/Login.jsx
import React, { useState } from "react";
import ContainerMax from "../../components/common/ContainerMax.jsx";
import { Link, useNavigate } from "react-router-dom";

export default function Login(){
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const nav = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    // TODO: Backend anbinden (Session erstellen)
    nav("/dashboard");
  };

  return (
    <section className="page-section">
      <ContainerMax>
        <div className="auth-wrap">
          <div className="auth-card auth-glow">
            <header className="auth-head">
              <h1 className="auth-title">Login</h1>
              <p className="auth-sub">Willkommen zurück bei AIX Aleph.</p>
            </header>

            <form className="auth-form" onSubmit={onSubmit}>
              {/* E-Mail */}
              <div className="form-field">
                <label className="form-label" htmlFor="login-email">E-Mail</label>
                <div className="input-wrap">
                  <svg className="input-icon" viewBox="0 0 20 20" aria-hidden>
                    <path fill="currentColor" d="M2.5 5.5h15v9h-15v-9Zm.9 0 6.6 5.2c.6.47 1.4.47 2 0l6.6-5.2" />
                  </svg>
                  <input
                    id="login-email"
                    type="email"
                    className="input"
                    placeholder="name@firma.de"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Passwort */}
              <div className="form-field">
                <label className="form-label" htmlFor="login-pw">Passwort</label>
                <div className="input-wrap">
                  <svg className="input-icon" viewBox="0 0 20 20" aria-hidden>
                    <path fill="currentColor" d="M5 9h10v7H5V9Zm2-3a3 3 0 1 1 6 0v3H7V6Z" />
                  </svg>
                  <input
                    id="login-pw"
                    type="password"
                    className="input"
                    placeholder="••••••••"
                    value={pw}
                    onChange={(e)=>setPw(e.target.value)}
                    required
                  />
                </div>
                <div className="helper">Mind. 8 Zeichen empfohlen.</div>
              </div>

              {/* Aktionen */}
              <div className="auth-actions">
                <button className="btn btn-primary" type="submit">Einloggen</button>
                <button className="btn-outline" type="button" onClick={()=>nav("/")}>Abbrechen</button>
              </div>
            </form>

            <div className="auth-foot">
              Noch kein Konto?{" "}
              <Link to="/register" className="accent-text hover:underline">Registrieren</Link>
            </div>
          </div>
        </div>
      </ContainerMax>
    </section>
  );
}
