import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FlaskConical,
  Users,
  Settings,
  GraduationCap,
} from "lucide-react";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/leads", label: "Leads", icon: Users },
  { to: "/professors", label: "Professors", icon: GraduationCap },
  { to: "/experiments", label: "Experiments", icon: FlaskConical },
  { to: "/settings", label: "Settings", icon: Settings },
];

function linkClasses(isActive: boolean) {
  return [
    "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
    isActive
      ? "bg-[#404249] text-white"
      : "text-[#B5BAC1] hover:bg-[#35373C] hover:text-white",
  ].join(" ");
}

export default function Sidebar() {
  return (
    <aside className="h-screen w-64 shrink-0 bg-[#2B2D31] text-[#F2F3F5] border-r border-[#1F2125] flex flex-col">
      <div className="h-14 flex items-center px-4 border-b border-[#1F2125]">
        <div className="text-white font-semibold tracking-wide">AIX • Aleph</div>
      </div>

      <nav className="p-3 space-y-1">
        {nav.map((n) => {
          const Icon = n.icon;
          return (
            <NavLink key={n.to} to={n.to} end={n.end}
              className={({ isActive }) => linkClasses(isActive)}>
              <Icon className="w-5 h-5" />
              <span>{n.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-auto p-3 text-xs text-[#9CA3AF]">
        <div className="border-t border-[#1F2125] pt-3">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded bg-[#404249] grid place-items-center text-sm">TU</div>
            <div>
              <div className="text-[#F2F3F5]">TU Account</div>
              <div className="text-[#9CA3AF]">research@uni.example</div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
