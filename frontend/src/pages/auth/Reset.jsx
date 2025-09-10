import React, { useState } from "react";
import { Link } from "react-router-dom";
import SimplePage from "./_SimplePage.jsx";

export default function Reset() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (!email.trim()) return setError("Bitte E-Mail eingeben.");
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError("Bitte gültige E-Mail eingeben.");
    setError("");
    setTimeout(() => setSent(true), 500);
  };

  return (
    <SimplePage title="Passwort zurücksetzen">
      {sent ? (
        <div className="space-y-4">
          <p className="text-[var(--color-ink)]">
            Falls ein Konto existiert, haben wir dir eine E-Mail mit einem Link zum Zurücksetzen gesendet.
          </p>
          <Link to="/login" className="btn btn-accent w-full">Zurück zum Login</Link>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm muted mb-1">E-Mail</label>
            <input
              id="email" name="email" type="email" autoComplete="email" inputMode="email"
              value={email} onChange={(e) => setEmail(e.target.value)}
              className={`w-full rounded-lg border px-3 py-2 bg-transparent outline-none
                focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)]
                ${error ? "border-[var(--color-critical)]" : "border-[var(--color-line)]"}`}
              aria-invalid={!!error}
              aria-describedby={error ? "reset-err" : undefined}
            />
            {error && <p id="reset-err" className="mt-1 text-sm text-[var(--color-critical)]">{error}</p>}
          </div>

          <button type="submit" className="btn btn-primary w-full">Link senden</button>

          <p className="muted text-sm text-center">
            Zurück zum{" "}
            <Link to="/login" className="text-[var(--theme-primary)] hover:opacity-90">Login</Link>
          </p>
        </form>
      )}
    </SimplePage>
  );
}
