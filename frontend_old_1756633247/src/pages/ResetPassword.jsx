// src/pages/ResetPassword.jsx
import React, { useState } from "react";
import "../styles/page.css";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: später API call
    setSent(true);
  };

  return (
    <div className="page">
      <section className="page-hero">
        <h1>Passwort zurücksetzen</h1>
        <p className="muted">
          Wir senden dir einen Link zum Zurücksetzen an deine E-Mail-Adresse.
        </p>
      </section>

      {!sent ? (
        <form onSubmit={handleSubmit} className="card" style={{ maxWidth: 420 }}>
          <label className="muted">E-Mail</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="z.B. max@beispiel.de"
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 10,
              border: "1px solid #e5e7eb",
              marginBottom: 12,
            }}
          />
          <button className="btn btn-primary" type="submit">
            Link senden
          </button>
        </form>
      ) : (
        <div className="card" style={{ maxWidth: 420 }}>
          <p>✅ Wenn die E-Mail existiert, haben wir dir einen Link geschickt.</p>
        </div>
      )}
    </div>
  );
}
