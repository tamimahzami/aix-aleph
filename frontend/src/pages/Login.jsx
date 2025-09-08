import React from "react";
import SimplePage from "./_SimplePage.jsx";
export default function Login() {
  return (
    <SimplePage title="Login">
      <form className="space-y-3">
        <input className="w-full px-3 py-2 rounded-md border border-[var(--color-line)] bg-transparent" placeholder="E-Mail" />
        <input type="password" className="w-full px-3 py-2 rounded-md border border-[var(--color-line)] bg-transparent" placeholder="Passwort" />
        <button className="btn btn-primary">Anmelden</button>
      </form>
    </SimplePage>
  );
}
