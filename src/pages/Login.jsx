import React, { useState } from "react";
import { useAuth } from "../auth/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const [role, setRole] = useState("user");

  // !!! DEV ONLY: erzeugt ein Fake-JWT für Demo-Zwecke
  function makeDevToken(role) {
    const header = btoa(JSON.stringify({ alg: "none", typ: "JWT" }));
    const payload = btoa(JSON.stringify({ role }));
    return `${header}.${payload}.`;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const token = makeDevToken(role);
    login(token);
    window.location.href = "/dashboard";
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-[var(--color-bg-2)] rounded shadow">
      <h1 className="text-xl font-bold mb-4">Login (Demo)</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <label className="block">
          <span className="block mb-1">Rolle wählen (Demo):</span>
          <select
            className="w-full border rounded p-2 bg-[var(--color-bg)]"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">user</option>
            <option value="manager">manager</option>
            <option value="admin">admin</option>
          </select>
        </label>
        <button className="px-4 py-2 rounded bg-[var(--color-primary)] text-white">
          Einloggen
        </button>
      </form>
    </div>
  );
}
