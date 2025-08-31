import React from "react";

export default function Spinner({ size = 40, thickness = 4 }) {
  const s = {
    wrapper: {
      display: "inline-block",
      width: size,
      height: size,
    },
    circle: {
      boxSizing: "border-box",
      display: "block",
      width: "100%",
      height: "100%",
      border: `${thickness}px solid #e0e0e0`,
      borderTopColor: "#1976d2",
      borderRadius: "50%",
      animation: "aix-spin 0.8s linear infinite",
    },
    keyframes: `
      @keyframes aix-spin {
        to { transform: rotate(360deg); }
      }
    `,
  };

  return (
    <div style={s.wrapper} aria-label="Laden …">
      <style>{s.keyframes}</style>
      <span style={s.circle} />
    </div>
  );
}
