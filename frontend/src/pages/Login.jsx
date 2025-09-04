import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useAuth } from "../auth/AuthContext"; // nur EINMAL!

// einfache Fallback-Validierung (ohne zod)
function validate(form) {
  const errs = { email: "", password: "" };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errs.email = "Bitte gültige E-Mail eingeben.";
  }
  if ((form.password || "").length < 6) {
    errs.password = "Mindestens 6 Zeichen.";
  }
  return errs;
}

export default function Login() {
  const nav = useNavigate();

  // defensiv: Context kann im Fehlerfall null sein
  const ctx = useAuth();
  const login = ctx?.login ?? (async () => {});
  const isCtxMissing = !ctx; // falls AuthProvider fehlt

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [zerr, setZerr] = useState({ email: "", password: "" });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    setZerr({ email: "", password: "" });

    const errs = validate(form);
    if (errs.email || errs.password) {
      setZerr(errs);
      setBusy(false);
      return;
    }

    try {
      await login({ email: form.email, password: form.password });
      nav("/dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || "Login fehlgeschlagen");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[color:var(--grey-900)] px-4">
      <div className="w-full max-w-md bg-surface rounded-2xl p-6 shadow-dc ring-1 ring-white/10">
        <h1 className="text-2xl font-extrabold text-white">Einloggen</h1>

        {isCtxMissing && (
          <div className="mt-3 text-[13px] text-pink">
            Achtung: <code>AuthProvider</code> fehlt. Stelle sicher, dass in{" "}
            <code>src/main.jsx</code> der <code>&lt;AuthProvider&gt;</code> um <code>&lt;App /&gt;</code> liegt.
          </div>
        )}

        <form onSubmit={onSubmit} className="mt-5 space-y-4">
          <label className="block">
            <span className="text-sm text-muted">E-Mail</span>
            <input
              className="mt-1 w-full rounded-lg bg-[color:var(--grey-700)] text-white px-3 py-2 outline-none focus:ring-2 focus:ring-[color:var(--blurple)]"
              type="email"
              value={form.email}
              onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
              required
              autoComplete="email"
            />
            {zerr.email && <div className="text-xs text-pink mt-1">{zerr.email}</div>}
          </label>

          <label className="block">
            <span className="text-sm text-muted">Passwort</span>
            <input
              className="mt-1 w-full rounded-lg bg-[color:var(--grey-700)] text-white px-3 py-2 outline-none focus:ring-2 focus:ring-[color:var(--blurple)]"
              type="password"
              value={form.password}
              onChange={(e) => setForm((s) => ({ ...s, password: e.target.value }))}
              required
              autoComplete="current-password"
            />
            {zerr.password && <div className="text-xs text-pink mt-1">{zerr.password}</div>}
          </label>

          {error && (
            <div className="text-sm text-pink bg-white/5 border border-white/10 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary w-full disabled:opacity-60"
            disabled={busy || isCtxMissing}
          >
            {busy ? "Bitte warten…" : "Einloggen"}
          </button>
        </form>

        <p className="mt-4 text-sm text-muted">
          Noch keinen Account?{" "}
          <Link to="/register" className="text-white hover:underline">
            Jetzt registrieren
          </Link>
        </p>
      </div>
    </div>
  );
}
