// src/pages/company/PartnerLogin.jsx
import React from "react";
export default function PartnerLogin() {
  return (
    <section className="page-section">
      <div className="container-max">
        <form className="panel max-w-md mx-auto">
          <h1 className="text-2xl font-bold">Partner-Login</h1>
          <div className="mt-4 grid gap-3">
            <label className="grid gap-2">
              <span className="muted">Partner-ID</span>
              <input className="card" type="text" required />
            </label>
            <label className="grid gap-2">
              <span className="muted">Passwort</span>
              <input className="card" type="password" required />
            </label>
            <button className="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    </section>
  );
}
