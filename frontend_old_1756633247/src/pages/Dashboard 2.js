// src/pages/Dashboard.js
import React, { useEffect, useState } from "react";
import { getProtected } from "../services/api";

export default function Dashboard() {
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    getProtected()
      .then((d) => {
        setMsg(d.message || "Willkommen im Dashboard!");
        setErr("");
      })
      .catch((e) => {
        setErr(e.message || "Fehler beim Laden");
        setMsg("");
      });
  }, []);

  return (
    <>
      <h1 className="h1">Dashboard</h1>
      {!!msg && <p className="alert success">{msg}</p>}
      {!!err && <p className="alert error">{err}</p>}
      <div className="card">Hier kommen deine KPIs, Flottenübersicht usw.</div>
    </>
  );
}
