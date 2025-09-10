import React from "react";
import clsx from "clsx";

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors duration-200";

  const variants = {
    primary:
      "bg-color-primary text-color-bg hover:bg-color-accent",
    outline:
      "border border-color-primary text-color-primary hover:bg-color-primary/10",
    accent:
      "bg-color-accent text-white hover:bg-color-accent/90",
    link:
      "text-color-primary hover:text-color-accent underline-offset-2 hover:underline",
  };

  return (
    <button
      className={clsx(base, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
