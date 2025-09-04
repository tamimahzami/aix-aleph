// src/components/Loader.jsx
import React from "react";

export default function Loader({ label = "Laden..." }) {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="loader-spin mr-3" />
      <span className="text-sm text-slate-600 dark:text-slate-300">{label}</span>
    </div>
  );
}
