import React from "react";
import ContainerMax from "../components/common/ContainerMax.jsx";

export default function Status() {
  return (
    <section className="page-section">
      <ContainerMax>
        <div className="card">
          <h1 className="text-2xl font-bold">System Status</h1>
          <p className="mt-2 muted">Hier werden künftig Live-Statusmeldungen und Wartungsfenster angezeigt.</p>
        </div>
      </ContainerMax>
    </section>
  );
}
