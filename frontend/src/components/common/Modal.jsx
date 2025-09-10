// src/components/common/Modal.jsx
import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ open, onClose, title = "Dialog", children }) {
  const dialogRef = useRef(null);
  const lastActiveRef = useRef(null);
  const titleId = useRef(`modal-title-${Math.random().toString(36).slice(2)}`).current;

  // Guard for SSR/tests
  if (typeof document === "undefined") return null;

  // Scroll lock + remember last focus
  useEffect(() => {
    if (!open) return;
    lastActiveRef.current = document.activeElement;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
      // restore focus
      lastActiveRef.current?.focus?.();
    };
  }, [open]);

  // Key handling (ESC + trap)
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
      if (e.key === "Tab") trapFocus(e);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Focus first focusable on open
  useEffect(() => {
    if (!open) return;
    const node = dialogRef.current;
    if (!node) return;
    const focusables = getFocusables(node);
    (focusables[0] || node).focus();
  }, [open]);

  const getFocusables = (root) =>
    Array.from(
      root.querySelectorAll(
        'a[href],button:not([disabled]),textarea,input,select,[tabindex]:not([tabindex="-1"])'
      )
    ).filter((el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden"));

  const trapFocus = (e) => {
    const node = dialogRef.current;
    if (!node) return;
    const focusables = getFocusables(node);
    if (focusables.length === 0) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    // If focus is on container itself, send to first on Tab
    if (!e.shiftKey && document.activeElement === node) {
      e.preventDefault();
      first.focus();
      return;
    }

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
      return;
    }
    if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
      return;
    }
  };

  if (!open) return null;

  return createPortal(
    <div aria-hidden={!open} className="fixed inset-0 z-[1000] flex items-center justify-center">
      {/* Backdrop */}
      <button
        type="button"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => onClose?.()}
        aria-label="Schließen"
      />
      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        ref={dialogRef}
        className="relative z-[1001] w-[min(92vw,560px)] rounded-xl border"
        style={{
          background: "var(--color-ui, #1e1e1e)",
          borderColor: "var(--color-line, #2a2a2a)",
          color: "var(--color-ink, #f0f0f0)",
          boxShadow: "0 20px 60px rgba(0,0,0,.5)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 py-4 flex items-center justify-between border-b"
          style={{ borderColor: "var(--color-line,#2a2a2a)" }}
        >
          <strong id={titleId}>{title}</strong>
          <button
            type="button"
            className="btn btn-ghost px-2 py-1"
            onClick={() => onClose?.()}
            aria-label="Schließen"
          >
            ✕
          </button>
        </div>
        <div className="p-5">{children}</div>
        <div className="px-5 pb-5 flex justify-end gap-2">
          <button type="button" className="btn btn-ghost" onClick={() => onClose?.()}>
            Schließen
          </button>
          <button type="button" className="btn btn-accent" onClick={() => onClose?.()}>
            OK
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
