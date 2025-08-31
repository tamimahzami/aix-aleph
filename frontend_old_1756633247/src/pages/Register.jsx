// src/pages/Register.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import PasswordField from "../components/forms/PasswordField";
import PasswordStrength from "../components/forms/PasswordStrength";
import "../styles/page.css";
import "../styles/forms.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    // TODO: API-Call (z.B. Prisma/Backend) -> register({ email, password })
  };

  return (
    <div className="page-container">
      <section className="page-hero">
        <h1>Konto erstellen</h1>
        <p className="muted">Starte kostenlos mit AIX Aleph.</p>
      </section>

      <section className="card">
        <form onSubmit={onSubmit} noValidate>
          <div className="grid cols-2">
            <div>
              <label htmlFor="reg-email">E-Mail</label>
              <input
                id="reg-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="du@beispiel.de"
              />
            </div>

            <div>
              <label htmlFor="reg-password">Passwort</label>
              <PasswordField
                id="reg-password"
                name="password"
                autoComplete="new-password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-describedby="pw-hint"
              />
              <div id="pw-hint" className="help" style={{ marginTop: 4 }}>
                Tipp: Groß-/Kleinbuchstaben, Zahl & Sonderzeichen erhöhen die Stärke.
              </div>
              <PasswordStrength password={password} />
            </div>
          	</div>
		 <div className="checkbox-row">
  		<input id="terms" type="checkbox" required />
  		<label htmlFor="terms">
  		Ich akzeptiere die{" "}
  		<a href="/agb" target="_blank" rel="noopener noreferrer">AGB</a>{" "}
  		&amp;{" "}
		<a href="/datenschutz" target="_blank" rel="noopener noreferrer">Datenschutz</a>.
		</label>
		</div>		
          <div className="btn-row" style={{ marginTop: 14 }}>
            <button className="btn btn-primary" type="submit">Registrieren</button>
            <Link className="btn" to="/login">Ich habe bereits ein Konto</Link>
          </div>
        </form>
      </section>
    </div>
  );
}
