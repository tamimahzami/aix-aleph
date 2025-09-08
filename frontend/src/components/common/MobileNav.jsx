import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function MobileNav({ nav, isAuthed, onLogout }) {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((v) => !v);

  return (
    <div>
      <button
        type="button"
        aria-label="Menü öffnen"
        onClick={toggle}
        className="p-2 rounded-md ring-1 ring-[var(--color-line)]"
      >
        ☰
      </button>

      {open && (
        <div
          className="absolute left-0 right-0 top-16 z-50 mx-4 rounded-xl
                     bg-[var(--color-surface)] border border-[var(--color-line)] p-3"
        >
          <nav className="flex flex-col gap-1">
            {(nav.primary || []).map((item, i) => (
              <div key={item.label || item.to || i}>
                {Array.isArray(item.children) && item.children.length > 0 ? (
                  <>
                    <div className="px-3 py-2 font-medium text-[var(--color-primary)]">{item.label}</div>
                    <div className="ml-3 flex flex-col">
                      {item.children.map((c, j) => (
                        <Link
                          key={c.label || c.to || j}
                          to={c.to || "#"}
                          onClick={() => setOpen(false)}
                          className="px-3 py-2 rounded-md hover:bg-[var(--color-muted)]"
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    to={item.to || "#"}
                    onClick={() => setOpen(false)}
                    className="px-3 py-2 rounded-md hover:bg-[var(--color-muted)]"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}

            {nav.cta && (
              <Link
                to={nav.cta.to}
                onClick={() => setOpen(false)}
                className="mt-2 px-3 py-2 rounded-md bg-[var(--color-primary)] text-white text-center"
              >
                {nav.cta.label}
              </Link>
            )}

            <div className="h-px my-2 bg-[var(--color-line)]" />

            {isAuthed ? (
              <button
                type="button"
                onClick={() => { setOpen(false); onLogout?.(); }}
                className="px-3 py-2 rounded-md bg-red-500 text-white"
              >
                Logout
              </button>
            ) : (
              <div className="flex gap-2">
                <Link to="/login" onClick={() => setOpen(false)} className="flex-1 px-3 py-2 rounded-md ring-1 ring-[var(--color-line)] text-center">
                  Login
                </Link>
                <Link to="/register" onClick={() => setOpen(false)} className="flex-1 px-3 py-2 rounded-md bg-[var(--color-primary)] text-white text-center">
                  Register
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </div>
  );
}
