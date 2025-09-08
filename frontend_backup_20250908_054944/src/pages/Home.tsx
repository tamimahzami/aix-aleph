// src/pages/Home.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StatusCard from "../components/StatusCard";
import { getHealth, getProfessors, getLeads } from "../services/api";

export default function Home() {
  const [health, setHealth] = useState<{ ok: boolean; ts: string } | null>(null);
  const [profCount, setProfCount] = useState<number | null>(null);
  const [leadCount, setLeadCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const [h, profs] = await Promise.all([getHealth(), getProfessors()]);
        setHealth(h);
        setProfCount(profs.total ?? profs.items?.length ?? 0);

        // Leads sind geschützt → versuche es mit Token, ignoriere Fehler
        try {
          const leads = await getLeads(true);
          setLeadCount(leads.items?.length ?? 0);
        } catch {
          setLeadCount(null); // nicht eingeloggt oder verboten
        }
      } catch (e: any) {
        setError(e?.message ?? "Unbekannter Fehler");
      }
    })();
  }, []);

  return (
    <div className="prose prose-invert max-w-none">
      <h1>AIX Aleph läuft 🚀</h1>
      <p>Willkommen! Hier siehst du den Systemstatus und Shortcuts.</p>

      {error && (
        <div className="message" role="alert">
          <div className="message-avatar">!</div>
          <div className="message-content">
            <div className="message-author">Fehler beim Laden</div>
            <div className="message-text">{error}</div>
          </div>
        </div>
      )}

      <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 16 }}>
        <StatusCard
          title="Backend-Status"
          value={health ? (health.ok ? "OK ✅" : "Down ❌") : "…"}
          hint={health ? `TS: ${new Date(health.ts).toLocaleString()}` : "prüfe /api/health"}
        />
        <StatusCard
          title="Professors"
          value={profCount ?? "…"}
          hint="öffentliche Liste"
        />
        <StatusCard
          title="Leads"
          value={leadCount ?? "—"}
          hint={leadCount === null ? "Login nötig" : "geschützt"}
        />
      </div>

      <h2>Loslegen</h2>
      <ul>
        <li><Link className="btn-primary" to="/professors">Zu Professors</Link></li>
        <li><Link className="btn-primary" to="/experiments">Zu Experiments</Link></li>
        <li><Link className="btn-primary" to="/leads">Zu Leads (Login)</Link></li>
      </ul>

      <h3>Rechtliches</h3>
      <ul>
        <li><Link to="/legal/terms">AGB</Link></li>
        <li><Link to="/legal/privacy">Datenschutz</Link></li>
        <li><Link to="/legal/cookies">Cookies</Link></li>
        <li><Link to="/legal/company">Impressum</Link></li>
      </ul>
    </div>
  );
}
