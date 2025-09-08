import React, { useState } from "react";
import type { NavGroup } from "../../nav.config";

export default function MobileNav({ items }: { items: NavGroup[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="md:hidden">
      <details className="group">
        <summary
          className="list-none flex items-center justify-between w-10 h-10 rounded-lg bg-white/10 border border-white/20 cursor-pointer select-none"
          aria-label="Menü öffnen"
        >
          <span className="sr-only">Menü</span>
          <div className="w-full h-full grid place-items-center">
            <div className="w-6 h-0.5 bg-white mb-1" />
            <div className="w-6 h-0.5 bg-white mb-1" />
            <div className="w-6 h-0.5 bg-white" />
          </div>
        </summary>

        <nav className="mt-3 bg-[color:var(--grey-800)] border border-white/15 rounded-xl p-2">
          {items.map((g, i) => {
            if ("children" in g) {
              const expanded = openIdx === i;
              return (
                <div key={g.label} className="mb-1">
                  <button
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 text-white/90 flex items-center justify-between"
                    aria-expanded={expanded}
                    onClick={() => setOpenIdx(expanded ? null : i)}
                  >
                    {g.label} <span className="text-xs">{expanded ? "▴" : "▾"}</span>
                  </button>
                  {expanded && (
                    <div className="pl-2">
                      {g.children.map((c) => (
                        <a key={c.label} href={c.to}
                           className="block px-3 py-2 rounded-lg hover:bg-white/10 text-white/80">
                          {c.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            return (
              <a key={g.label} href={g.to}
                 className="block px-3 py-2 rounded-lg hover:bg-white/10 text-white/90">
                {g.label}
              </a>
            );
          })}
        </nav>
      </details>
    </div>
  );
}
