import React from "react";

export default function ContainerMax({ children, className = "", style }) {
  return (
    <div className={`container-max ${className}`} style={style}>
      {children}
    </div>
  );
}
