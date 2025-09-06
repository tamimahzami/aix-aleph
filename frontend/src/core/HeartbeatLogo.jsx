import React from "react";

export default function HeartbeatLogo() {
  return (
    <div className="flex items-center space-x-2 group">
      <div className="w-6 h-6 rounded-full bg-[var(--color-primary)] animate-ping group-hover:scale-110 transition-transform" />
      <span className="font-bold text-[var(--color-primary)] group-hover:rotate-6 transition-transform">
        Human ♥ Computing
      </span>
    </div>
  );
}
