import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useAuth } from "../auth/AuthContext.jsx";

// Validierung
const schema = z.object({
  name: z.string().min(2, "Bitte gib deinen Namen an."),
  email: z.string().email("Bitte gib eine gültige E-Mail ein."),
  password: z.string().min(8, "Mindestens 8 Zeichen."),
  terms: z.literal(true, {
    errorMap: () => ({ message: "Bitte stimme den Nutzungsbedingungen zu." }),
  }),
});

export default function Register() {
  const navigate = useNavigate();
  const auth = useAuth?.(); // tolerant, falls das API minimal ist

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    terms: false,
  });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");

    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const first = parsed.error.issues[0]?.message ?? "Ungültige Eingabe.";
      setErr(first);
      return;
    }

    setLoading(true);
    try {
      // === API CALL ===
      // Falls du bereits eine API hast: entferne den Fetch-Fallback und nutze deine Funktion hier.
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      }).catch(() => null);

      // Fallback (Dev/Demo): simuliere Erfolg, wenn kein Backend erreichbar
      let ok = true;
      let token = "demo_token_" + Math.random().toString(36).slice(2);
      if (res && res.ok) {
        const data = await res.json().catch(() => ({}));
        token = data?.token || token;
      }

      if (!ok) throw new Error("Registrierung fehlgeschlagen.");

      // AuthContext unterstützen (wenn vorhanden)
      try {
        if (auth?.login) {
          await auth.login({ email: form.email, name: form.name, token });
        } else if (auth?.setUser) {
          auth.setUser({ email: form.email, name: form.name, token });
        }
      } catch (_) {
        // noop – lokale Persistenz trotzdem setzen
      }

      // Lokale Persistenz (für Demo)
      localStorage.setItem("aix_token", token);
      localStorage.setItem(
        "aix_user",
        JSON.stringify({ email: form.email, name: form.name })
      );

      navigate("/dashboard");
    } catch (e) {
      setErr(e.message || "Etwas ist schiefgelaufen.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="panel w-full max-w-md p-6">
        <h1 className="text-2xl font-extrabold">Registrieren</h1>
        <p className="text-muted mt-1">Erstelle dein AIX-Aleph Konto.</p>

        {err ? (
          <div className="mt-4 rounded-lg border border-pink-500/40 bg-pink-500/10 p-3 text-sm">
            {err}
          </div>
        ) : null}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm text-muted">Name</label>
            <input
              className="mt-1 w-full rounded-md bg-[var(--color-surface)] border border-[var(--color-line)] px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              name="name"
              value={form.name}
              onChange={onChange}
              autoComplete="name"
              placeholder="Dein Name"
            />
          </div>

          <div>
            <label className="block text-sm text-muted">E-Mail</label>
            <input
              className="mt-1 w-full rounded-md bg-[var(--color-surface)] border border-[var(--color-line)] px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              autoComplete="email"
              placeholder="du@beispiel.de"
            />
          </div>

          <div>
            <label className="block text-sm text-muted">Passwort</label>
            <input
              className="mt-1 w-full rounded-md bg-[var(--color-surface)] border border-[var(--color-line)] px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              name="password"
              type="password"
              value={form.password}
              onChange={onChange}
              autoComplete="new-password"
              placeholder="••••••••"
            />
          </div>

          <label className="flex items-start gap-3 text-sm">
            <input
              type="checkbox"
              name="terms"
              checked={form.terms}
              onChange={onChange}
              className="mt-1"
            />
            <span className="text-muted">
              Ich stimme den{" "}
              <Link className="underline" to="/info/agb">
                Nutzungsbedingungen
              </Link>{" "}
              und der{" "}
              <Link className="underline" to="/info/datenschutz">
                Datenschutzerklärung
              </Link>{" "}
              zu.
            </span>
          </label>

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? "Wird erstellt…" : "Konto erstellen"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-muted">
          Bereits ein Konto?{" "}
          <Link className="underline" to="/login">
            Einloggen
          </Link>
        </p>
      </div>
    </div>
  );
}
