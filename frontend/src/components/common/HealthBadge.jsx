// src/components/common/HealthBadge.jsx
import React from "react";

export default function HealthBadge({ status = "unknown" }) {
  const COLORS = {
    healthy: "bg-green-500",
    warning: "bg-yellow-500",
    error: "bg-red-500",
    unknown: "bg-gray-500",
  };

  const color = COLORS[status] || COLORS.unknown;

  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold text-white ${color}`}
    >
      {status === "healthy" && "✅ Healthy"}
      {status === "warning" && "⚠️ Warning"}
      {status === "error" && "❌ Error"}
      {status === "unknown" && "… Loading"}
    </span>
  );
}
