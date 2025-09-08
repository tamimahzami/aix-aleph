import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#1E1F22] text-[#DBDEE1]">
      <header className="border-b border-[#3F4147] bg-[#2B2D31]">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-6">
          <div className="text-white font-semibold">AIX Aleph</div>
          <nav className="flex gap-4 text-sm">
            <NavLink to="/" end className={({ isActive }) => isActive ? "text-white" : "text-[#B5BAC1] hover:text-white"}>Home</NavLink>
            <NavLink to="/leads" className={({ isActive }) => isActive ? "text-white" : "text-[#B5BAC1] hover:text-white"}>Leads</NavLink>
            <NavLink to="/professors" className={({ isActive }) => isActive ? "text-white" : "text-[#B5BAC1] hover:text-white"}>Professors</NavLink>
            <NavLink to="/experiments" className={({ isActive }) => isActive ? "text-white" : "text-[#B5BAC1] hover:text-white"}>Experiments</NavLink>
            <NavLink to="/settings" className={({ isActive }) => isActive ? "text-white" : "text-[#B5BAC1] hover:text-white"}>Settings</NavLink>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
