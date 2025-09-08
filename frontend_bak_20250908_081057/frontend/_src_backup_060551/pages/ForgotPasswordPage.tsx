import React from "react";
import { api } from "../lib/api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<null | { ok: boolean; msg: string }>(null);
  const [submitting, setSubmitting] = React.useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.requestPasswordReset(email);
      setStatus({ ok: true, msg: "Falls ein Konto existiert, wurde ein Link gesendet." });
    } catch (err: any) {
      setStatus({ ok: false, msg: err?.message || "Fehler" });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="mb-2 text-2xl font-bold">Passwort zurücksetzen</h1>
      <p className="text-sm text-muted mb-6">
        Gib deine E-Mail ein. Wir senden dir — falls vorhanden — einen Link zum Zurücksetzen.
      </p>

      <form onSubmit={onSubmit} className="space-y-4">
        <input
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border border-white/15 bg-surface px-3 py-2 outline-none"
        />
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-md bg-[var(--color-primary)] px-3 py-2 font-semibold hover:bg-[var(--color-primary-strong)] disabled:opacity-60"
        >
          {submitting ? "Sende…" : "Reset-Link anfordern"}
        </button>
      </form>

      {status && (
        <div className={`mt-4 rounded-md border px-3 py-2 text-sm ${status.ok ? "border-green-500/40" : "border-red-500/40"}`}>
          {status.msg}
        </div>
      )}
    </div>
  );
}
