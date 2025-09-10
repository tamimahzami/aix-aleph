// src/components/common/EngineButton.jsx
import React from "react";
import { motion } from "framer-motion";

export default function EngineButton({ label = "Engine Start", onClick }) {
  return (
    <motion.button
      onClick={onClick}
      className="relative inline-flex items-center justify-center rounded-full px-6 py-3
                 text-primary-foreground bg-primary shadow-sm ring-1 ring-inset ring-border
                 hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-ring
                 overflow-hidden"
      initial={{ scale: 0.98 }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 320, damping: 20 }}
    >
      {/* Pulsierender Halo */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full"
        initial={{ opacity: 0.25 }}
        animate={{ opacity: [0.25, 0.5, 0.25] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        style={{
          boxShadow: "0 0 64px 8px color-mix(in oklab, var(--color-primary) 70%, transparent)",
        }}
      />
      {/* Start-Icon */}
      <svg
        className="mr-2 h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        {/* „Start Engine“: Kreis + Pfeil/Impulse */}
        <circle cx="12" cy="12" r="7" />
        <path d="M12 5v3M12 16v3M5 12h3M16 12h3" />
      </svg>
      {label}
    </motion.button>
  );
}
