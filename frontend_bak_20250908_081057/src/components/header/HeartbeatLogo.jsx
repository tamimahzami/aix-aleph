// src/components/header/HeartbeatLogo.jsx
import React from "react";

export default function HeartbeatLogo({ className = "h-6 w-auto" }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Mini-Logo: Herz mit “AIX” */}
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <path
          d="M12 21s-6.7-4.35-9.33-7C-0.5 11.2 1.2 6 5.2 6c2.05 0 3.28 1.33 3.8 2.22C9.52 7.33 10.75 6 12.8 6c4 0 5.7 5.2 2.53 8-2.64 2.65-9.33 7-9.33 7Z"
          fill="currentColor"
        />
      </svg>
      <span className="font-semibold tracking-tight">AIX Aleph</span>
    </div>
  );
}
