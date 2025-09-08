// frontend/src/pages/Feedback.jsx
import { useState } from "react";

export default function Feedback() {
  const [msg, setMsg] = useState("");
  const [sent, setSent] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    // TODO: Hier später API-Call zu backend (/api/feedback)
    setSent(true);
    setMsg("");
  };

  return (
    <main className="aix-feedback max-w-xl mx-auto py-20 px-6 text-gray-100">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Feedback</h1>
        <p className="text-gray-400">
          Teile uns mit, was wir verbessern können.
        </p>
      </header>

      <form onSubmit={onSubmit} className="space-y-4">
        <textarea
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          className="w-full h-32 rounded-xl bg-black/30 border border-white/10 p-4 outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          placeholder="Dein Feedback…"
          required
        />
        <button
          type="submit"
          className="w-full rounded-xl py-3 font-semibold bg-[var(--color-primary)] text-white hover:opacity-90 transition"
        >
          Absenden
        </button>
      </form>

      {sent && (
        <p className="mt-6 text-green-400 text-center font-medium">
          Danke! Wir haben dein Feedback erhalten.
        </p>
      )}
    </main>
  );
}
