import React from "react";

export default function TextField({ label, type = "text", value, onChange, placeholder }) {
  return (
    <div className="form-field">
      {label && <label className="form-label">{label}</label>}
      <input
        type={type}
        className="input"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
      />
    </div>
  );
}
