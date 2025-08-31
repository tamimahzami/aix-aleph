// src/components/forms/TextField.jsx
import React from "react";

export default function TextField({ label, type="text", value, onChange, placeholder }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label className="muted" style={{ display: "block", marginBottom: "4px" }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "10px 12px",
          borderRadius: "8px",
          border: "1px solid #e5e7eb"
        }}
      />
    </div>
  );
}
