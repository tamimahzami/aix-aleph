import React, { useState } from "react";
import "./PasswordField.css";

export default function PasswordField({
  id = "password",
  value,
  onChange,
  placeholder = "Mind. 8 Zeichen",
  autoComplete = "new-password",
  ...rest
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="password-field">
      <input
        id={id}
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...rest}
      />
      <button
        type="button"
        className="toggle-btn"
        aria-label={show ? "Passwort verbergen" : "Passwort anzeigen"}
        onClick={() => setShow(s => !s)}
      >
        {show ? "🙈" : "👁️"}
      </button>
    </div>
  );
}
