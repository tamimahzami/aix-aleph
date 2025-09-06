// src/components/leads/LeadList.jsx
import React, { useEffect, useState } from "react";
import { api } from "../../lib/api";

export default function LeadList() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchLeads() {
      try {
        setLoading(true);
        const data = await api.listLeads();
        setLeads(data.items || []);
      } catch (e) {
        setError(e.message || "Fehler beim Laden der Leads");
      } finally {
        setLoading(false);
      }
    }
    fetchLeads();
  }, []);

  if (loading) return <div className="text-muted">… Loading Leads</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="panel p-4">
      <h2 className="font-bold text-lg mb-3">Leads</h2>
      {leads.length === 0 ? (
        <p className="text-muted">Keine Leads vorhanden.</p>
      ) : (
        <ul className="divide-y divide-[var(--color-line)]">
          {leads.map((lead) => (
            <li key={lead.id} className="py-2 flex justify-between">
              <span>
                <b>{lead.name || "Unbekannt"}</b> — {lead.email}
              </span>
              <span className="text-muted text-sm">
                {new Date(lead.createdAt).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
