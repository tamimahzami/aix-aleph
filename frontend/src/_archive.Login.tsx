// src/pages/Login.tsx — FINAL
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../state/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState<string | null>(null);

  const { login } = useAuth();
  const nav = useNavigate();
  const loc = useLocation() as any;
  const from = loc.state?.from?.pathname || "/";

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    try {
      await login(email.trim(), pw);
      nav(from, { replace: true });
    } catch (e: any) {
      setErr(e.message || "Login fehlgeschlagen");
    }
  }

  return (
    <div className="min-h-screen grid place-items-center p-6">
      <form onSubmit={submit} className="w-full max-w-md space-y-4 rounded-2xl border p-6">
        <h1 className="text-xl font-semibold">Anmelden</h1>
        {err && <div className="text-sm text-red-600">{err}</div>}

        <div>
          <label className="block text-sm mb-1">E-Mail</label>
          <input
            type="email"
            className="w-full rounded-xl border px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
            required
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Passwort</label>
          <input
            type="password"
            className="w-full rounded-xl border px-3 py-2"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            required
          />
        </div>

        <button className="w-full rounded-xl bg-indigo-600 text-white px-3 py-2 hover:bg-indigo-500">
          Login
        </button>

        <div className="text-sm text-slate-500">
          Kein Konto?{" "}
          <Link className="text-indigo-600 hover:underline" to="/register">
            Registrieren
          </Link>
        </div>
      </form>
    </div>
  );
}
