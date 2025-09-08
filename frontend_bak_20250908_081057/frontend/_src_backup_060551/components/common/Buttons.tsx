import React from "react";
import { cn } from "../../lib/utils";

type BtnProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" };
export function Button({ variant = "primary", className, ...rest }: BtnProps) {
  const base = "btn";
  const v = variant === "ghost" ? "btn-ghost" : "btn-primary";
  return <button className={cn(base, v, className)} {...rest} />;
}
