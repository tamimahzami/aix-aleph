import React, { useState } from "react";
import { useAuth } from "../lib/auth";

export default function Register() {
  const { register } = useAuth();
  const [form, setForm] = useState({ name:"", email: "", password: "", confirm:"" });
  const [err, setErr] = useState("");

  async function onSubmit(e) {
    e.preventDefault(); setErr("");
    if (form.password !== form.confirm) { setErr("Passwörter stimmen nicht."); return; }
    try { await register({ name: form.name, email: form.email, password: form.password }); }
    catch (e) { setErr(e.message || "Registrierung fehlgeschlagen"); }
  }

  return (
    <div className="mx-auto max-w-md rounded-2xl border p-6">
      <h1 className="text-2xl font-bold">Konto erstellen</h1>
      {err && <div className="mt-3 text-sm text-red-600">{err}</div>}
      <form className="mt-4 space-y-3" onSubmit={onSubmit}>
        <input className="w-full border rounded-xl px-3 py-2" placeholder="Name"
               value={form.name} onChange={e=>setForm(f=>({...f, name: e.target.value}))}/>
        <input className="w-full border rounded-xl px-3 py-2" type="email" placeholder="E-Mail"
               value={form.email} onChange={e=>setForm(f=>({...f, email: e.target.value}))}/>
        <input className="w-full border rounded-xl px-3 py-2" type="password" placeholder="Passwort"
               value={form.password} onChange={e=>setForm(f=>({...f, password: e.target.value}))}/>
        <input className="w-full border rounded-xl px-3 py-2" type="password" placeholder="Passwort bestätigen"
               value={form.confirm} onChange={e=>setForm(f=>({...f, confirm: e.target.value}))}/>
        <button className="w-full rounded-xl bg-cyan-600 text-white py-2">Konto erstellen</button>
      </form>
    </div>
  );
}
