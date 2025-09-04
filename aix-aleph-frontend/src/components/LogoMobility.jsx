// src/components/LogoMobility.jsx
import React from "react";

export default function LogoMobility({
  variant = "solid",
  size = 32,
  label = "AIX Aleph Mobility",
  className = "",
}) {
  const isOutline = variant === "outline";

  return (
    <div
      className={`inline-flex items-center gap-2 ${className}`}
      aria-label={label}
      role="img"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {isOutline ? (
          <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="3" />
        ) : (
          <circle cx="32" cy="32" r="28" fill="currentColor" opacity="0.12" />
        )}

        <path
          d="M22 26c0-4.418 3.582-8 8-8 3.08 0 5.77 1.72 7.13 4.25C38.49 19.72 41.18 18 44.26 18 48.64 18 52 21.36 52 25.74c0 4.24-2.51 7.9-6.12 11.4-3.7 3.58-8.46 7.02-13.88 10.86-5.42-3.84-10.18-7.28-13.88-10.86C14.51 33.64 12 29.98 12 25.74 12 21.36 15.36 18 19.74 18c3.08 0 5.77 1.72 7.13 4.25.31.56.59 1.15.81 1.76.22-.61.5-1.2.81-1.76z"
          fill={isOutline ? "none" : "currentColor"}
          stroke="currentColor"
          strokeWidth={isOutline ? 2 : 0}
          opacity={isOutline ? 0.5 : 0.16}
        />

        <g transform="translate(14,12)">
          <path
            d="M18 36 L26 8 L34 36"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="21"
            y1="28"
            x2="31"
            y2="28"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </g>

        <circle cx="46" cy="20" r="2.2" fill="currentColor" />
      </svg>

      <span className="font-semibold tracking-tight leading-none">
        <span className="text-cyan-500">AIX</span>{" "}
        <span className="text-foreground">Aleph</span>{" "}
        <span className="text-rose-500">Mobility</span>
      </span>
    </div>
  );
}
