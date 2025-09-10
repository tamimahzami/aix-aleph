import React, { createContext, useContext, useMemo, useState, useCallback } from "react";

const ToastCtx = createContext({ show: () => {} });

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const show = useCallback((message, type = "info", ms = 2500) => {
    setToast({ message, type });
    window.clearTimeout(window.__toastTimer);
    window.__toastTimer = window.setTimeout(() => setToast(null), ms);
  }, []);

  // optional: globale Funktion für legacy-Calls
  if (typeof window !== "undefined") window.showToast = show;

  const ctx = useMemo(() => ({ show }), [show]);

  return (
    <ToastCtx.Provider value={ctx}>
      {children}
      <div className="pointer-events-none fixed bottom-4 right-4 z-50">
        {toast ? <Toast message={toast.message} type={toast.type} /> : null}
      </div>
    </ToastCtx.Provider>
  );
}

export function useToast() {
  return useContext(ToastCtx);
}

export function showToast(message, type = "info", ms = 2500) {
  // Fallback, falls außerhalb der Provider-Hierarchie aufgerufen
  if (typeof window !== "undefined" && typeof window.showToast === "function") {
    window.showToast(message, type, ms);
  }
}

function Toast({ message, type = "info" }) {
  const bg =
    type === "error" ? "bg-red-500" :
    type === "success" ? "bg-green-500" :
    "bg-blue-500";
  return (
    <div className={`pointer-events-auto px-4 py-2 rounded-lg shadow ${bg} text-white`}>
      {message}
    </div>
  );
}
