// src/pages/auth/_SimplePage.jsx
import React from "react";

export default function SimplePage({ title, children }) {
  return (
    <div className="min-h-dvh flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <div className="card">{children}</div>
      </div>
    </div>
  );
}
