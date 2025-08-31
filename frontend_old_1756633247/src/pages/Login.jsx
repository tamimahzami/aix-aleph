// src/pages/Login.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import PasswordField from "../components/forms/PasswordField";
import "../styles/page.css";
import "../styles/forms.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);

  const onSubmit = (e) => {
    e.preventDefault();
    // TODO: API-Call -> login({ email, password, remember })
  };

  return (
    <div className="page-container">
      <section className="page-hero">
        <h1>Anmelden</h1>
        <p className="muted">Willkommen zurück bei AIX Aleph.</p>
      </section>

      <section className="card">
        <form onSubmit={onSubmit} noValidate>
          <div className="grid cols-2">
            <div>
              <label htmlFor="login-email">E-Mail</label>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="du@beispiel.de"
              />
            </div>

            <div>
              <label htmlFor="login-password">Passwort</label>
              <PasswordField
                id="login-password"
                name="current-password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="checkbox-row" style={{ marginTop: 10 }}>
                <input
                  id="remember"
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <label htmlFor="remember">Angemeldet bleiben</label>
              </div>
            </div>
          </div>

          <div className="btn-row" style={{ marginTop: 14 }}>
            <button className="btn btn-primary" type="submit">Login</button>
            <Link className="btn" to="/reset-password">Passwort vergessen?</Link>
          </div>
        </form>
      </section>
    </div>
  );
}
