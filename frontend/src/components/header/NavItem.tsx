import React from "react";
import NavDropdown from "./NavDropdown";
import type { NavGroup } from "../../nav.config";

export default function NavItem({ group }: { group: NavGroup }) {
  if ("children" in group) {
    return <NavDropdown label={group.label} items={group.children} />;
  }
  return (
    <a href={group.to} className="aix-link">
      {group.label}
    </a>
  );
}
