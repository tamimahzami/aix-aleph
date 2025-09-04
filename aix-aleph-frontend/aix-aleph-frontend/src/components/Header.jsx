export default function Header({ title = "AIX Aleph" }) {
  return (
    <header className="bg-gray-900/60 backdrop-blur px-6 py-3 border-b border-gray-800 flex justify-between items-center">
      <h1 className="text-xl font-bold tracking-tight">{title}</h1>
      <div className="flex items-center gap-2">
        <span className="text-xs px-2 py-1 rounded bg-gray-800 text-gray-300">Frontend läuft ✅</span>
      </div>
    </header>
  );
}
