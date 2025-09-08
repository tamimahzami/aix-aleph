// src/components/common/Skeleton.jsx
import React from "react";

export function Skeleton({ className = "" }) {
  return <div className={`animate-pulse rounded-md bg-[var(--color-line)]/40 ${className}`} />;
}
