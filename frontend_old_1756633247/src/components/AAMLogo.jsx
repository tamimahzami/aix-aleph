import React from "react";

export default function AAMLogo({ size = 100, className }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      aria-label="AIX ALEPH Mobility Logo"
    >
      <circle cx="50" cy="50" r="45" fill="none" stroke="var(--logo-circle)" strokeWidth="6" />
      <path d="M25,50 Q35,30 50,25 Q65,30 75,50 Q65,70 50,75 Q35,70 25,50 Z"
            fill="none" stroke="var(--logo-primary)" strokeWidth="4" />
      <path d="M30,40 L40,65 M40,65 L50,40 M50,40 L60,65 M60,65 L70,40"
            stroke="var(--logo-accent)" strokeWidth="6" strokeLinecap="round" />
      <circle cx="50" cy="50" r="7" fill="var(--logo-accent)" />
    </svg>
  );
}
