// src/pages/Feedback/index.jsx
import { useState, useEffect } from "react";

export default function Feedback() {
  useEffect(() => { document.title = "Feedback • AIX Aleph"; }, []);

  const [msg, setMsg] = useState("");
  const [sent, setSent] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    // TODO: POST /api/feedback
    setSent(true);
    setMsg("");
  };

  return (
    <section className="page-section" aria-labelledby="feedback-title">
      <div className="max-w-xl mx-auto">
        <header className="mb-6 text-center">
          <h1 id="feedback-title" className="text-3xl font-bold">Feedback</h1>
          <p className="muted">Teile uns mit, was wir verbessern können.</p>
        </header>

        <form onSubmit={onSubmit} className="card space-y-4" noValidate>
          <label htmlFor="feedback-text" className="font-semibold">Dein Feedback</label>
          <textarea
            id="feedback-text"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            className="w-full h-32 rounded-xl bg-black/30 border border-white/10 p-4 outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            placeholder="Schreib uns dein Feedback…"
            required
          />
          <button type="submit" className="w-full btn btn-accent">Absenden</button>
        </form>

        {sent && (
          <p className="mt-6 text-green-400 text-center font-medium" role="status" aria-live="polite">
            Danke! Wir haben dein Feedback erhalten.
          </p>
        )}
      </div>
    </section>
  );
}
