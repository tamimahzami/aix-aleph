import React from "react";
import ContainerMax from "../components/common/ContainerMax.jsx";

export default function Feedback() {
  return (
    <section className="page-section">
      <ContainerMax>
        <div className="card">
          <h1 className="text-2xl font-bold">Feedback</h1>
          <p className="mt-2 muted">Deine Meinung zählt! Teile uns hier mit, was wir verbessern können.</p>
        </div>
      </ContainerMax>
    </section>
  );
}
