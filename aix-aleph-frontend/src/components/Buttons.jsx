import React from "react";
import { Link } from "react-router-dom";

const base = "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-4 focus:ring-brand-500/25";
const variants = {
  primary: "bg-brand-500 text-white hover:shadow-glow active:translate-y-[1px]",
  secondary: "bg-white/70 dark:bg-white/10 text-slate-900 dark:text-slate-100 border border-white/30 dark:border-white/10 hover:shadow-soft",
  ghost: "bg-transparent text-slate-700 dark:text-slate-100 hover:bg-white/50 dark:hover:bg-white/5 border border-transparent",
};

export function Button({ as="button", to, href, variant="primary", className="", ...props }) {
  const cls = `${base} ${variants[variant]} ${className}`;
  if (as === "a" && href) return <a href={href} className={cls} {...props} />;
  if (as === "link" && to) return <Link to={to} className={cls} {...props} />;
  return <button className={cls} {...props} />;
}
