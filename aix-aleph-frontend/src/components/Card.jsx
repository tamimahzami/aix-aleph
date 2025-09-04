// src/components/Card.jsx
import React from "react";
export default function Card({ title, subtitle, children, footer, className="" }) {
  return (
    <section className={`glass p-5 ${className}`}>
      <header className="mb-3">
        {title && <h3 className="text-lg font-semibold">{title}</h3>}
        {subtitle && <p className="text-sm opacity-70">{subtitle}</p>}
      </header>
      <div className="prose prose-sm dark:prose-invert max-w-none">{children}</div>
      {footer && <footer className="mt-4 pt-3 border-t border-white/20 dark:border-white/10">{footer}</footer>}
    </section>
  );
}
