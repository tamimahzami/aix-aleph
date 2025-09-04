// src/lib/toast.jsx
import React, { createContext, useContext, useMemo, useState, useCallback, useEffect } from "react";

const ToastCtx = createContext({
  show: () => {}, info: () => {}, success: () => {}, error: () => {}, warn: () => {},
});

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const remove = useCallback((id) => setToasts(xs => xs.filter(t => t.id !== id)), []);
  const push = useCallback((msg, type = "info", ttl = 3500) => {
    const id = Date.now() + Math.random();
    setToasts(xs => [...xs, { id, msg, type }]);
    setTimeout(() => remove(id), ttl);
  }, [remove]);

  const api = useMemo(() => ({
    show: (m) => push(m, "info"), info: (m) => push(m, "info"),
    success: (m) => push(m, "success"), warn: (m) => push(m, "warn"),
    error: (m) => push(m, "error"),
  }), [push]);

  useEffect(() => {
    const id = "toast-inline-style";
    if (document.getElementById(id)) return;
    const el = document.createElement("style");
    el.id = id;
    el.textContent = `
      .toast-container{position:fixed;right:16px;bottom:16px;display:flex;flex-direction:column;gap:8px;z-index:9999}
      .toast{padding:10px 14px;border-radius:8px;box-shadow:0 8px 20px rgba(0,0,0,.08);background:#2563eb;color:#fff;font:600 14px system-ui}
      .toast.success{background:#10b981}
      .toast.error{background:#ef4444}
      .toast.warn{background:#f59e0b}
      .toast.info{background:#2563eb}
    `;
    document.head.appendChild(el);
  }, []);

  return (
    <ToastCtx.Provider value={api}>
      {children}
      <div className="toast-container">
        {toasts.map(t => <div key={t.id} className={`toast ${t.type}`}>{t.msg}</div>)}
      </div>
    </ToastCtx.Provider>
  );
}

export const useToast = () => useContext(ToastCtx);
