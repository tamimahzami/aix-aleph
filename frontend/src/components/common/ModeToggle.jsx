// src/components/common/ModeToggle.jsx
import React from "react";

const MODES = [
  { key: "neutral", label: "Neutral", className: "" },
  { key: "efficient", label: "Efficient", className: "mode-efficient" },
  { key: "sport", label: "Sport", className: "mode-sport" },
];

export default function ModeToggle() {
  const [mode, setMode] = React.useState(
    localStorage.getItem("ui-mode") || "neutral"
  );

  React.useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("mode-sport", "mode-efficient");
    const active = MOD
