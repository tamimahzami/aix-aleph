import React from "react";

export default function AuthMenu({ isAuthed = false }: { isAuthed?: boolean }) {
  if (isAuthed) {
    return (
      <a href="/dashboard" className="rounded-full bg-white/10 hover:bg-white/15 border border-white/20 px-4 py-2">
        Dashboard
      </a>
    );
  }
  return (
    <div className="flex items-center gap-3">
      <a href="/login" className="text-sm text-white/90 hover:underline">Einloggen</a>
      <a href="/register" className="btn btn-primary text-sm">Registrieren</a>
    </div>
  );
}
