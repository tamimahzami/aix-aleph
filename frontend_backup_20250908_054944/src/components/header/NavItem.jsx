// src/components/header/NavItem.jsx
import React, { useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";

export default function NavItem({ group, isActive }) {
  const hasChildren = Array.isArray(group?.children) && group.children.length > 0;
  const [open, setOpen] = useState(false);
  const openTimer = useRef(null);
  const closeTimer = useRef(null);
  const wrapperRef = useRef(null);

  const clearTimers = () => {
    if (openTimer.current) { clearTimeout(openTimer.current); openTimer.current = null; }
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
  };

  const scheduleOpen = useCallback(() => {
    clearTimers();
    openTimer.current = setTimeout(() => setOpen(true), 60);
  }, []);

  const scheduleClose = useCallback(() => {
    clearTimers();
    closeTimer.current = setTimeout(() => setOpen(false), 130);
  }, []);

  const onPointerEnter = () => scheduleOpen();
  const onPointerLeave = (e) => {
    // nur schließen, wenn der Cursor wirklich den Wrapper verlässt
    if (!wrapperRef.current?.contains(e.relatedTarget)) scheduleClose();
  };

  const onFocusIn = () => scheduleOpen();
  const onFocusOut = (e) => {
    if (!wrapperRef.current?.contains(e.relatedTarget)) scheduleClose();
  };

  const onKeyDown = (e) => {
    if (e.key === "Escape") {
      setOpen(false);
      wrapperRef.current?.querySelector("[data-trigger]")?.focus();
    }
    if ((e.key === "Enter" || e.key === "ArrowDown") && hasChildren) {
      setOpen(true);
      e.preventDefault();
    }
  };

  if (!hasChildren) {
    return (
      <Link
        to={group?.to || "#"}
        className={`px-3 py-2 rounded-md transition-colors duration-200 outline-none
          ${isActive ? "text-[var(--color-primary)]" : "text-[var(--color-ink)] hover:text-[var(--color-primary)]"}`}
      >
        {group?.label}
      </Link>
    );
  }

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onMouseEnter={onPointerEnter}
      onMouseLeave={onPointerLeave}
      onFocus={onFocusIn}
      onBlur={onFocusOut}
    >
      {/* Trigger */}
      <button
        type="button"
        data-trigger
        aria-haspopup="true"
        aria-expanded={open ? "true" : "false"}
        onKeyDown={onKeyDown}
        className={`px-3 py-2 rounded-md inline-flex items-center gap-1 outline-none
          transition-colors duration-200
          ${isActive ? "text-[var(--color-primary)]" : "text-[var(--color-ink)] hover:text-[var(--color-primary)]"}`}
      >
        <span>{group?.label}</span>
        <svg width="14" height="14" viewBox="0 0 20 20" aria-hidden="true"
          className={`transition-transform ${open ? "rotate-180" : ""}`}>
          <path d="M5.5 7.5L10 12l4.5-4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>

      {/* Dropdown-Panel */}
      {open && (
        <div
          role="menu"
          className="absolute left-0 top-full mt-2 min-w-[220px] z-50
                     rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] shadow-dc p-2"
          onMouseEnter={onPointerEnter}
          onMouseLeave={onPointerLeave}
        >
          <ul className="py-1">
            {group.children.map((child, i) => (
              <li key={child.to || child.label || i}>
                <Link
                  to={child.to || "#"}
                  role="menuitem"
                  className="block w-full text-left px-3 py-2 rounded-md
                             text-[var(--color-ink)] hover:bg-[var(--color-bg)] hover:text-[var(--color-primary)]
                             transition-colors duration-150"
                >
                  {child.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
