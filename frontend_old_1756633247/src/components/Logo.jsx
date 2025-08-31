import React from "react";

export default function Logo({ size = 22 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div
        aria-hidden
        style={{
          width: size, height: size, borderRadius: 6,
          background: "linear-gradient(135deg,#2563eb,#8b5cf6)"
        }}
      />
      <strong style={{ letterSpacing: 0.4 }}>
        AIX <span style={{ color: "#2563eb" }}>Aleph</span>
      </strong>
    </div>
  );
}
