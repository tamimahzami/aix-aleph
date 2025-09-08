import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="hidden lg:block fixed left-0 top-14 bottom-0 w-56 border-r border-white/10 bg-[var(--color-bg)]">
      <nav className="p-3 space-y-1 text-sm">
        <NavLink to="/" end className="block px-3 py-2 rounded hover:bg-white/5">Home</NavLink>
        <NavLink to="/experiments" className="block px-3 py-2 rounded hover:bg-white/5">Experiments</NavLink>
        <NavLink to="/professors" className="block px-3 py-2 rounded hover:bg-white/5">Professors</NavLink>
        <NavLink to="/settings" className="block px-3 py-2 rounded hover:bg-white/5">Settings</NavLink>
      </nav>
    </aside>
  );
}
