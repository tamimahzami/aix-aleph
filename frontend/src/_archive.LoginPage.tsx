// src/pages/LoginPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth";

export default function LoginPage() {
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState<string | null>(null);
  const { login, loading } = useAuth();
  const nav = useNavigate();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
      nav("/professors");
    } catch (err: any) {
      setError(err.message || "Login fehlgeschlagen");
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-sm grid gap-3">
      <h1 className="text-xl font-semibold">Login</h1>
      {error && <div className="text-red-400">{error}</div>}
      <input className="bg-zinc-800 p-2 rounded" value={email} onChange={e=>setEmail(e.target.value)} placeholder="E-Mail" />
      <input className="bg-zinc-800 p-2 rounded" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Passwort" />
      <button disabled={loading} className="bg-white/10 hover:bg-white/20 p-2 rounded">
        {loading ? "Anmeldung…" : "Login"}
      </button>
    </form>
  );
}
