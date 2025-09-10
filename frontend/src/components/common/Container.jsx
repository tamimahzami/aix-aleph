// src/components/common/Container.jsx
import React from "react";

export default function Container({ className = "", children }) {
  return (
    <div className={["w-full max-w-[1200px] mx-auto px-4 sm:px-6", className].join(" ")}>
      {children}
    </div>
  );
}
