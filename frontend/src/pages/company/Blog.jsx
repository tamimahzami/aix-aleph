// src/pages/company/Blog.jsx
import React from "react";
export default function Blog() {
  const posts = [
    { t: "Warum Heavy-Duty KI braucht", d: "Strategie • 6 min" },
    { t: "OCPP im Depot richtig nutzen", d: "Tech • 8 min" },
  ];
  return (
    <section className="page-section">
      <div className="container-max">
        <div className="panel">
          <h1 className="text-2xl font-bold">Blog</h1>
          <div className="mt-4 grid md:grid-cols-2 gap-4">
            {posts.map((p) => (
              <article key={p.t} className="card">
                <h3 className="font-semibold">{p.t}</h3>
                <p className="muted">{p.d}</p>
                <button className="btn btn-ghost mt-2">Lesen</button>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
