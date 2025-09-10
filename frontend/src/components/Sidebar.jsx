export default function Sidebar() {
  return (
    <aside className="hidden lg:block w-64 p-4 border-r border-white/10">
      <nav className="space-y-2 text-sm">
        <a href="/demo" className="block opacity-80 hover:opacity-100">Demo</a>
        <a href="/preise" className="block opacity-80 hover:opacity-100">Preise</a>
      </nav>
    </aside>
  );
}
