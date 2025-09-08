import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

import { useAuth, useLogout } from "../../auth/AuthContext.jsx";
import { NAV } from "../../nav.config.js";

export default function MobileNav() {
  const { isAuthenticated } = useAuth();
  const logout = useLogout();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);

  const cfg = NAV?.de ?? {
    primary: [{ id: "home", label: "Home", to: "/" }],
    cta: { to: "/register", label: "Kostenlos starten" },
  };

  const isRouteActive = (to) => {
    if (!to) return false;
    const norm = (s) => (s || "").replace(/\/+$/, "") || "/";
    const a = norm(to);
    const b = norm(pathname);
    if (a === "/") return b === "/";
    return b === a || b.startsWith(a + "/");
  };

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onClick = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) setOpen(false);
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="p-2 rounded-md border border-[var(--color-border)]"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Menü schließen" : "Menü öffnen"}
      >
        ☰
      </button>

      {open && (
        <div
          id="mobile-nav"
          ref={panelRef}
          className="absolute top-16 left-0 right-0 bg-[var(--color-bg)] border-b border-[var(--color-border)] shadow-md p-4 space-y-2"
        >
          {(cfg.primary || []).map((item) =>
            item.children ? (
              <div key={item.label} className="space-y-1">
                <div className="font-semibold">{item.label}</div>
                <div className="pl-3 space-y-1">
                  {item.children.map((child) => (
                    <Link
                      key={child.label || child.to}
                      to={child.to}
                      className={`block p-2 rounded hover:bg-[var(--color-muted)] ${
                        isRouteActive(child.to) ? "text-[var(--color-primary)] font-medium" : ""
                      }`}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.id || item.label || item.to}
                to={item.to}
                className={`block p-2 rounded hover:bg-[var(--color-muted)] ${
                  isRouteActive(item.to) ? "text-[var(--color-primary)] font-medium" : ""
                }`}
              >
                {item.label}
              </Link>
            )
          )}

          {!isAuthenticated && cfg.cta?.to && (
            <Link
              to={cfg.cta.to}
              className="inline-block mt-2 w-full text-center px-4 py-2 rounded-md bg-[var(--color-primary)] text-white"
            >
              {cfg.cta.label || "Jetzt starten"}
            </Link>
          )}

          {isAuthenticated ? (
            <button
              type="button"
              onClick={logout}
              className="mt-2 w-full px-4 py-2 rounded-md bg-red-500 text-white"
            >
              Logout
            </button>
          ) : (
            <div className="grid grid-cols-2 gap-2 mt-2">
              <Link to="/login" className="px-4 py-2 text-center rounded-md border border-[var(--color-border)]">
                Login
              </Link>
              <Link to="/register" className="px-4 py-2 text-center rounded-md bg-[var(--color-primary)] text-white">
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </>
  );
}
