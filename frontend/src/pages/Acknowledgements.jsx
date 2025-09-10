import React from "react";
import ContainerMax from "../components/common/ContainerMax.jsx";

export default function Acknowledgements() {
  return (
    <section className="page-section">
      <ContainerMax>
        <div className="card">
          <h1 className="text-2xl font-bold">Acknowledgements</h1>
          <p className="mt-2 muted">
            Wir danken allen Partnern, Teams und Open-Source-Projekten, die AIX Aleph möglich machen.
          </p>
        </div>
      </ContainerMax>
    </section>
  );
}
