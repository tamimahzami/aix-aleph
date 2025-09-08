// src/pages/Login.jsx
import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";

export default function Login(){
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const from = location.state?.from?.pathname || "/dashboard";

  async function handleSubmit(e){
    e.preventDefault();
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      alert("Login fehlgeschlagen.");
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 panel mt-10">
      <h1 className="text-2xl font-extrabold">Login</h1>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input className="w-full px-3 py-2 rounded bg-surface border border-[var(--color-line)]"
               placeholder="E-Mail" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full px-3 py-2 rounded bg-surface border border-[var(--color-line)]"
               placeholder="Passwort" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="btn btn-primary w-full" type="submit">Einloggen</button>
      </form>
      <p className="mt-4 text-center text-muted">
        Kein Konto? <Link className="underline" to="/register">Registrieren</Link>
      </p>
    </div>
  );
}
