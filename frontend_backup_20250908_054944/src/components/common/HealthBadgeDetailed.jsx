// src/components/common/HealthBadgeDetailed.jsx
import React from "react";

export default function HealthBadgeDetailed({ status = "unknown" }) {
  const colorMap = {
    healthy: "bg-green-500",
    error: "bg-red-500",
    unknown: "bg-gray-400",
  };

  const labelMap = {
    healthy: "Healthy",
    error: "Error",
    unknown: "Unknown",
  };

  return (
    <div className="flex items-center space-x-2">
      <span
        className={`inline-block w-3 h-3 rounded-full ${colorMap[status]}`}
        aria-hidden="true"
      ></span>
      <span className="text-sm text-muted">{labelMap[status]}</span>
    </div>
  );
}
