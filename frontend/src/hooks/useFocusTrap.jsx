// src/hooks/useFocusTrap.jsx
import { useEffect, useRef } from "react";

/**
 * Trap focus inside `ref.current` while `enabled` is true.
 * Options:
 *  - initialFocus: HTMLElement | () => HTMLElement | null
 *  - restoreFocus: boolean (default true)
 *  - onEscape: () => void
 */
export default function useFocusTrap(
  ref,
  enabled = true,
  { initialFocus = null, restoreFocus = true, onEscape } = {}
) {
  const lastActiveRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;
    const root = ref.current;
    if (!root) return;

    lastActiveRef.current = document.activeElement;

    const getFocusables = () =>
      Array.from(
        root.querySelectorAll(
          'a[href],button:not([disabled]),textarea,input,select,[tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden"));

    const focusFirst = () => {
      const desired =
        (typeof initialFocus === "function" ? initialFocus() : initialFocus) || null;
      if (desired?.focus && root.contains(desired)) {
        desired.focus();
        return;
      }
      const f = getFocusables();
      (f[0] || root).focus();
    };

    // Put focus inside on mount
    focusFirst();

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        if (onEscape) onEscape();
        return;
      }
      if (e.key !== "Tab") return;

      // Only trap if focus is currently inside the root
      if (!root.contains(document.activeElement)) return;

      const f = getFocusables();
      if (f.length === 0) return;

      const first = f[0];
      const last = f[f.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    const onFocusIn = (e) => {
      // If focus moves outside the root while enabled, bring it back
      if (!root.contains(e.target)) {
        // Avoid fight with screen readers: queue a microtask
        queueMicrotask(focusFirst);
      }
    };

    // Capture phase helps intercept earlier
    document.addEventListener("keydown", onKeyDown, true);
    document.addEventListener("focusin", onFocusIn, true);

    return () => {
      document.removeEventListener("keydown", onKeyDown, true);
      document.removeEventListener("focusin", onFocusIn, true);

      if (restoreFocus) {
        lastActiveRef.current?.focus?.();
      }
    };
  }, [ref, enabled, initialFocus, restoreFocus, onEscape]);
}
