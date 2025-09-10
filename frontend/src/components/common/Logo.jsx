// src/components/common/Logo.jsx
import React from "react";
import { Link } from "react-router-dom";

/**
 * AIX Aleph Logo – „Start Engine“-Button mit Wirbelring.
 * - Reagiert auf --color-primary / --color-ring / --color-background
 */
export default function Logo({ size = 32, withText = true }) {
  const s = Number(size);
  return (
    <Link to="/" className="flex items-center gap-2 shrink-0" aria-label="AIX Aleph – Startseite">
      <svg
        width={s}
        height={s}
        viewBox="0 0 64 64"
        className="drop-shadow-sm"
        aria-hidden="true"
      >
        {/* Outer soft ring */}
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.9" />
            <stop offset="70%" stopColor="var(--color-primary)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="ring" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-primary)" />
            <stop offset="100%" stopColor="var(--color-ring)" />
          </linearGradient>
        </defs>

        <circle cx="32" cy="32" r="30" fill="url(#glow)" opacity="0.25" />
        {/* Button base */}
        <circle cx="32" cy="32" r="22" fill="var(--color-background)" />
        {/* Power ring */}
        <circle
          cx="32" cy="32" r="20"
          fill="none" stroke="url(#ring)" strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray="260" strokeDashoffset="40"
        />
        {/* Wirbel / Spark */}
        <path
          d="M32 14c3 0 5 2.2 5 5s-2 5-5 5-5-2.2-5-5 2-5 5-5Z
             M22 28c3 6 9 10 10 18
             M42 28c-3 6-9 10-10 18"
          fill="none" stroke="url(#ring)" strokeWidth="2.5" strokeLinecap="round"
        />
      </svg>

      {withText && (
        <span className="font-extrabold tracking-tight select-none">
          AIX <span className="opacity-80">Aleph</span>
        </span>
      )}
    </Link>
  );
}
