// src/components/NavBar.tsx — FINAL
import { Link } from "react-router-dom";
import { useAuth } from "../state/AuthContext";

export default function NavBar() {
  const { token, user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-10 bg-white/70 dark:bg-slate-900/70 backdrop-blur border-b">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-semibold">AIX Aleph</Link>
        <nav className="flex items-center gap-3">
          <Link className="hover:underline" to="/experiments">Experimente</Link>
          {token ? (
            <>
              <span className="text-sm text-slate-500">Hi{user?.name ? `, ${user.name}` : ""}</span>
              <button
                onClick={logout}
                className="rounded-xl border px-3 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="rounded-xl border px-3 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-800" to="/login">Login</Link>
              <Link className="rounded-xl bg-indigo-600 text-white px-3 py-1.5 hover:bg-indigo-500" to="/register">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
