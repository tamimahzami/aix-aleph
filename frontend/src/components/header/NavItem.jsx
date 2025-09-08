import React, { useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";

export default function NavItem({ group, isActive }) {
  const hasChildren = Array.isArray(group?.children) && group.children.length > 0;
  const [open, setOpen] = useState(false);
  const closeTimer = useRef(null);

  const openNow = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  }, []);

  const closeSoon = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  }, []);

  const onKeyDown = (e) => {
    if (!hasChildren) return;
    if (e.key === "Escape") {
      setOpen(false);
      e.currentTarget.blur();
    }
    if ((e.key === "Enter" || e.key === "ArrowDown") && !open) {
      setOpen(true);
      e.preventDefault();
    }
  };

  if (!hasChildren) {
    return (
      <Link
        to={group.to || "#"}
        className={`aix-nav__link ${isActive ? "is-active" : ""}`}
      >
        {group.label}
      </Link>
    );
  }

  return (
    <div
      className="aix-nav__group"
      onMouseEnter={openNow}
      onMouseLeave={closeSoon}
      onFocus={openNow}
      onBlur={closeSoon}
    >
      <button
        type="button"
        className={`aix-nav__trigger ${isActive ? "is-active" : ""}`}
        aria-haspopup="true"
        aria-expanded={open ? "true" : "false"}
        onKeyDown={onKeyDown}
      >
        <span>{group.label}</span>
        <span className={`aix-caret ${open ? "is-open" : ""}`} aria-hidden>▾</span>
      </button>

      {open && (
        <div className="aix-dropdown" role="menu" onMouseEnter={openNow} onMouseLeave={closeSoon}>
          <ul className="aix-dropdown__list">
            {group.children.map((child, i) => (
              <li key={child.to || child.label || i}>
                <Link to={child.to || "#"} role="menuitem" className="aix-dropdown__item">
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
