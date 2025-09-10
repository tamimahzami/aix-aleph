// src/components/LogoMobility.jsx
import React from "react";

export default function LogoMobility({ className = "" }) {
  return (
    <div
      className={`inline-flex items-center gap-2 ${className}`}
      aria-label="AIX Aleph Mobility"
    >
      {/* Herz mit integriertem Symbol */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="text-rose-500"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                 2 6 4 4 6.5 4c1.74 0 3.41 1.01 4.13 2.44h.74C13.09 5.01 14.76 4 16.5 4
                 19 4 21 6 21 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>

      {/* Textteil */}
      <span className="font-bold text-lg tracking-tight">
        <span className="text-cyan-400">AIX</span>{" "}
        <span className="text-rose-500">Aleph</span>{" "}
        <span className="text-gray-600">Mobility</span>
      </span>
    </div>
  );
}
