import HealthBadge from "./common/HealthBadge";

export function Header() {
  return (
    <header className="h-14 px-4 flex items-center justify-between bg-indigo-600 text-white">
      <div className="font-semibold">AIX Aleph</div>
      <div className="flex items-center gap-3">
        <HealthBadge />
      </div>
    </header>
  );
}
