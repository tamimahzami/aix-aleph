import React from "react";

/**
 * Bewertet Passwörter auf einer Skala 0–4 und liefert Label & Prozent.
 * Kriterien: Länge, Zeichentypen (Klein, Groß, Zahl, Sonderzeichen), Wiederholung.
 */
function assessPassword(pw) {
  if (!pw) return { score: 0, percent: 0, label: "leer" };

  let score = 0;

  // Länge
  if (pw.length >= 8) score += 1;
  if (pw.length >= 12) score += 1; // Bonus für mehr Länge

  // Vielfalt: Klein/Groß/Zahl/Sonderzeichen
  const lower = /[a-z]/.test(pw);
  const upper = /[A-Z]/.test(pw);
  const digit = /\d/.test(pw);
  const symbol = /[^a-zA-Z0-9]/.test(pw);
  const variety = [lower, upper, digit, symbol].filter(Boolean).length;
  if (variety >= 2) score += 1;
  if (variety >= 3) score += 1;

  // simple Wiederholungen/Sequenzen leicht abstrafen
  const repeats = /(.)\1{2,}/.test(pw);
  const seq = /(0123|1234|2345|3456|4567|5678|6789|abcd|bcde|cdef|qwer|asdf)/i.test(pw);
  if (repeats || seq) score = Math.max(0, score - 1);

  // clamp
  score = Math.max(0, Math.min(4, score));

  const labels = ["sehr schwach", "schwach", "okay", "gut", "stark"];
  const label = labels[score] || "—";
  const percent = [10, 25, 50, 75, 100][score];

  return { score, percent, label };
}

export default function PasswordStrength({ password }) {
  const { score, percent, label } = assessPassword(password || "");

  // CSS-Variante per data-attr für Farbe
  return (
    <div className="pw-strength" data-score={score} aria-live="polite">
      <div className="pw-bar">
        <div className="pw-fill" style={{ width: `${percent}%` }} />
      </div>
      <div className="pw-meta">
        <span className="pw-label">Passwortstärke:</span>
        <span className="pw-value">{label}</span>
      </div>
    </div>
  );
}
