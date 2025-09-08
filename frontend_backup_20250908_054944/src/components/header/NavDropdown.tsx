import React, { useRef, useState } from "react";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import type { NavLink } from "../../nav.config";

export default function NavDropdown({ label, items }: { label: string; items: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  useOutsideClick(boxRef, () => setOpen(false));

  return (
    <div className="relative" ref={boxRef}>
      <button
        className="aix-link flex items-center gap-1"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setOpen(true)}
      >
        {label} <span className="text-xs">▾</span>
      </button>
      {open && (
        <div
          role="menu"
          className="absolute left-0 top-full mt-2 min-w-[220px] bg-[color:var(--grey-800)] border border-white/15 rounded-xl p-2 shadow-dc"
          onMouseLeave={() => setOpen(false)}
        >
          {items.map((it) => (
            <a key={it.label} role="menuitem" href={it.to}
               className="block px-3 py-2 rounded-lg text-white/90 hover:bg-white/10">
              {it.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
