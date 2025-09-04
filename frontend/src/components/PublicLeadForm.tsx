import { useState } from "react";
import { api } from "../api";

type Props = {
  onSuccess?: () => void;
};

export default function PublicLeadForm({ onSuccess }: Props) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError("Bitte eine gültige E-Mail angeben.");
      return;
    }
    try {
      setSubmitting(true);
      setError(null);
      await api.createLead(email.trim(), name.trim() || undefined);
      setDone(true);
      setEmail("");
      setName("");
      onSuccess?.();
    } catch (err: any) {
      setError(err?.message || "Senden fehlgeschlagen.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="embed" role="status" aria-live="polite">
        <div className="embed-title">Danke! ✅</div>
        <div className="embed-description">
          Wir haben deine Anfrage erhalten. Wir melden uns bei dir.
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="embed" style={{ display: "grid", gap: 12 }}>
      <div className="embed-title">Interesse? Bleib auf dem Laufenden.</div>
      <div className="embed-description">
        Trag dich ein und erhalte Updates zu AIX Aleph (E-Mobility, Routing, Smart Charging).
      </div>

      <label>
        <div className="embed-description" style={{ marginBottom: 6 }}>E-Mail *</div>
        <input
          className="message-input"
          style={{ height: 40 }}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
        />
      </label>

      <label>
        <div className="embed-description" style={{ marginBottom: 6 }}>Name (optional)</div>
        <input
          className="message-input"
          style={{ height: 40 }}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Dein Name"
        />
      </label>

      {error && (
        <div className="embed" style={{ borderLeftColor: "#ed4245" }}>
          <div className="embed-title">Fehler</div>
          <div>{error}</div>
        </div>
      )}

      <div>
        <button className="btn-primary" disabled={submitting}>
          {submitting ? "Senden…" : "Updates erhalten"}
        </button>
      </div>
    </form>
  );
}
