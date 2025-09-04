export default function Sidebar({ active, onNavigate }) {
  const Item = ({ id, label }) => (
    <button
      onClick={() => onNavigate(id)}
      className={
        "w-full text-left px-3 py-2 rounded-lg transition " +
        (active === id ? "bg-gray-800 text-white" : "text-gray-300 hover:bg-gray-800/70")
      }
    >
      {label}
    </button>
  );

  return (
    <aside className="w-60 bg-gray-950 border-r border-gray-900 flex flex-col">
      <div className="px-4 py-4 text-sm text-gray-400">Navigation</div>
      <nav className="flex-1 p-4 space-y-2">
        <Item id="dashboard"   label="Dashboard" />
        <Item id="experiments" label="Experiments" />
        <Item id="models"      label="Models" />
        <Item id="health"      label="Health" />
        <Item id="settings"    label="Settings" />
      </nav>
      <div className="p-4 text-xs text-gray-500">© {new Date().getFullYear()} AIX</div>
    </aside>
  );
}
