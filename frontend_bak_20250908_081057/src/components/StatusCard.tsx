// src/components/StatusCard.tsx
import React from "react";

export default function StatusCard({
  title,
  value,
  hint,
}: { title: string; value: React.ReactNode; hint?: string }) {
  return (
    <div className="message">
      <div className="message-avatar">✓</div>
      <div className="message-content">
        <div className="message-author">{title}</div>
        <div className="message-text text-xl font-semibold">{value}</div>
        {hint && <div className="message-text text-white/60 text-sm">{hint}</div>}
      </div>
    </div>
  );
}
