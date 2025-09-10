// src/pages/company/Karriere.jsx
import React from "react";
export default function Karriere() {
  const jobs = [
    { title: "Full-Stack Engineer (m/w/d)", loc: "Remote/Frankfurt", type: "Vollzeit" },
    { title: "Data Engineer (m/w/d)", loc: "Remote", type: "Vollzeit" },
  ];
  return (
    <section className="page-section">
      <div className="container-max">
        <div className="panel">
          <h1 className="text-2xl font-bold">Karriere</h1>
          <p className="muted mt-1">Werde Teil unserer Mission.</p>
          <div className="mt-4 space-y-3">
            {jobs.map((j) => (
              <div key={j.title} className="card">
                <div className="font-semibold">{j.title}</div>
                <div className="muted text-sm">{j.loc} — {j.type}</div>
                <button className="btn btn-primary mt-3">Jetzt bewerben</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
