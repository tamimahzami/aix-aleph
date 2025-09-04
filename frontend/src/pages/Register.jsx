import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useAuth } from "../auth/AuthContext";

const schema = z.object({
  email: z.string().email("Bitte gültige E-Mail eingeben."),
  password: z.string().min(6, "Mindestens 6 Zeichen."),
  confirm: z.string().min(6),
}).refine((data) => data.password === data.confirm, {
  path: ["confirm"],
  message: "Passwörter stimmen nicht überein.",
});

export default function Register() {
  const nav = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [zerr, setZerr] = useState({ email: "", password: "", confirm: "" });

  const onSubmit = async (e) => {
    e.preventDefault(); setError(""); setBusy(true); setZerr({ email:"", password:"", confirm:"" });
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const fe = parsed.error.flatten().fieldErrors;
      setZerr({ email: fe.email?.[0]||"", password: fe.password?.[0]||"", confirm: fe.confirm?.[0]||"" });
      setBusy(false); return;
    }
    try {
      await register({ email: form.email, password: form.password });
      nav("/login");
    } catch (err) {
      setError(err?.response?.data?.message || "Registrierung fehlgeschlagen");
    } finally { setBusy(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[color:var(--grey-900)] px-4">
      <div className="w-full max-w-md bg-surface rounded-2xl p-6 shadow-dc">
        <h1 className="text-2xl font-extrabold text-white">Registrieren</h1>
        <form onSubmit={onSubmit} className="mt-5 space-y-4">
          <label className="block">
            <span className="text-sm text-muted">E-Mail</span>
            <input
              className="mt-1 w-full rounded-lg bg-[color:var(--grey-700)] text-white px-3 py-2 outline-none focus:ring-2 focus:ring-blurple"
              type="email"
              value={form.email}
              onChange={(e)=>setForm((s)=>({...s, email:e.target.value}))}
              required
            />
            {zerr.email && <div className="text-xs text-pink mt-1">{zerr.email}</div>}
          </label>

          <label className="block">
            <span className="text-sm text-muted">Passwort</span>
            <input
              className="mt-1 w-full rounded-lg bg-[color:var(--grey-700)] text-white px-3 py-2 outline-none focus:ring-2 focus:ring-blurple"
              type="password"
              value={form.password}
              onChange={(e)=>setForm((s)=>({...s, password:e.target.value}))}
              required
            />
            {zerr.password && <div className="text-xs text-pink mt-1">{zerr.password}</div>}
          </label>

          <label className="block">
            <span className="text-sm text-muted">Passwort bestätigen</span>
            <input
              className="mt-1 w-full rounded-lg bg-[color:var(--grey-700)] text-white px-3 py-2 outline-none focus:ring-2 focus:ring-blurple"
              type="password"
              value={form.confirm}
              onChange={(e)=>setForm((s)=>({...s, confirm:e.target.value}))}
              required
            />
            {zerr.confirm && <div className="text-xs text-pink mt-1">{zerr.confirm}</div>}
          </label>

          {error && <div className="text-sm text-pink">{error}</div>}

          <button className="btn btn-primary w-full" disabled={busy}>
            {busy ? "Bitte warten…" : "Konto erstellen"}
          </button>
        </form>

        <p className="mt-4 text-sm text-muted">
          Schon ein Konto? <Link to="/login" className="text-[color:var(--blurple)] hover:text-[color:var(--blurple-700)]">Einloggen</Link>
        </p>
      </div>
    </div>
  );
}
