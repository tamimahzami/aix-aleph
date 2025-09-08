// src/components/common/HeartbeatIcon.jsx
import React from "react";

export default function HeartbeatIcon({ className = "w-6 h-6" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-label="Heartbeat Icon"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
        2 6 3.99 4 6.5 4c1.74 0 3.41.81 4.5 2.09
        C12.09 4.81 13.76 4 15.5 4
        18.01 4 20 6 20 8.5
        c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}
