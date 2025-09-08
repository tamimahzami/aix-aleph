import React from "react";

export default function Logo({ href = "/" }: { href?: string }) {
  return (
    <a className="flex items-center gap-2" href={href} aria-label="AIX Aleph Startseite">
      <svg viewBox="0 0 50 50" className="w-9 h-9" aria-hidden="true">
        <circle cx="25" cy="25" r="22" className="stroke-[3] fill-none"
          style={{ stroke: "var(--blurple, #5865f2)" }} />
        <path d="M10 40 L25 10 L40 40" className="stroke-[3] fill-none"
          style={{ stroke: "var(--blurple, #5865f2)" }} />
      </svg>
      <span className="text-white font-extrabold tracking-wide">AIX ALEPH</span>
    </a>
  );
}
