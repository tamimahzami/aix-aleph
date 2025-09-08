import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../lib/api";

export default function RegisterPage() {
  const nav = useNavigate();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null); setLoading(true);
    try {
      const res = await api.register({ name, email, password });
      // bei realem Backend evtl. separate Verify-Email Phase
      const token = res?.token || "demo-token";
      localStorage.setItem("token", token);
      localStorage.setItem("email", email);
      localStorage.setItem("role", "user");
      nav("/settings", { replace: true });
    } catch (err: any) {
      setError(err?.message || "Registrierung fehlgeschlagen");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-md px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Registrieren</h1>
      <form onSubmit={onSubmit} className="panel p-4 space-y-4">
        {error && <div className="text-sm text-red-400">{error}</div>}
        <div>
          <label className="block text-sm mb-1">Name (optional)</label>
          <input
            type="text" value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 outline-none focus:border-white/25"
            placeholder="Dein Name"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">E-Mail</label>
          <input
            type="email" required value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 outline-none focus:border-white/25"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Passwort</label>
          <input
            type="password" required value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 outline-none focus:border-white/25"
            placeholder="Mind. 8 Zeichen"
          />
        </div>
        <button disabled={loading} className="btn btn-primary w-full">
          {loading ? "Registriere…" : "Registrieren"}
        </button>
      </form>
      <p className="mt-4 text-sm text-muted">
        Schon ein Konto? <Link to="/login" className="underline">Jetzt anmelden</Link>
      </p>
    </section>
  );
}
