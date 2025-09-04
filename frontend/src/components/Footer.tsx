export default function Footer() {
  return (
    <footer className="h-10 flex items-center justify-between px-4 border-t border-neutral-800 text-xs text-neutral-400">
      <span>© {new Date().getFullYear()} AIX</span>
      <span>v1</span>
    </footer>
  );
}
