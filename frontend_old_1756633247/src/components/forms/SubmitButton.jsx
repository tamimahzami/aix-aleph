import React from "react";

export default function SubmitButton({ children = "Absenden", ...props }) {
  return (
    <button className="btn btn-primary" type="submit" {...props}>
      {children}
    </button>
  );
}
