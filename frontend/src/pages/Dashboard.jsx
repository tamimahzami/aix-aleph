import React from "react";
import SimplePage from "./_SimplePage.jsx";
export default function Dashboard() {
  return (
    <SimplePage title="Dashboard" lead="Live-Demo KPIs (Platzhalter)">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {["Uptime 99.2%","Kosten −12%","CO₂ −16%","Tickets 9/11"].map((k)=>(
          <div key={k} className="panel p-4 text-center font-semibold">{k}</div>
        ))}
      </div>
    </SimplePage>
  );
}
