// src/hooks/useFocusTrap.js
import { useEffect } from "react";

export default function useFocusTrap(ref, enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    const root = ref.current;
    if (!root) return;

    const getFocusables = () =>
      Array.from(
        root.querySelectorAll(
          'a[href],button:not([disabled]),textarea,input,select,[tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute("disabled"));

    const onKey = (e) => {
      if (e.key !== "Tab") return;
      const f = getFocusables();
      if (f.length === 0) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    };

    // ersten Fokus setzen
    const f = getFocusables();
    (f[0] || root).focus();

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [ref, enabled]);
}
