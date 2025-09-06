// src/components/header/NavItem.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

/**
 * group kann entweder ein Link-Objekt {label,to} oder
 * ein Dropdown {label, children:[{label,to},...]} sein.
 */
export default function NavItem({ group }) {
  const isDropdown = "children" in group && Array.isArray(group.children);
  const [open, setOpen] = useState(false);

  if (!isDropdown) {
    // einfacher Link
    return (
      <Link
        to={group.to || "#"}
        className="px-3 py-2 rounded-md text-sm font-medium hover:bg-[var(--color-muted)]"
      >
        {group.label}
      </Link>
    );
  }

  // Dropdown
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className="px-3 py-2 rounded-md text-sm font-medium hover:bg-[var(--color-muted)]"
        type="button"
      >
        {group.label}
      </button>
      {open && (
        <div className="absolute left-0 mt-2 w-56 rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] shadow-lg z-50">
          <div className="py-2">
            {group.children.map((child) => (
              <Link
                key={child.label}
                to={child.to || "#"}
                className="block px-4 py-2 text-sm hover:bg-[var(--color-muted)]"
              >
                {child.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
