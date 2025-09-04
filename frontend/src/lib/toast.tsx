// src/lib/toast.tsx
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

export type ToastKind = "info" | "success" | "error";

type Toast = { id: number; message: string; type: ToastKind };

type ToastContextType = {
  addToast: (message: string, type?: ToastKind) => void;
};

// --- Globale Listener, damit wir auch außerhalb von React (z. B. in api.ts) toasten können:
const listeners = new Set<(message: string, type: ToastKind) => void>();
export function toast(message: string, type: ToastKind = "info") {
  for (const l of Array.from(listeners)) {
    try {
      l(message, type);
    } catch {/* noop */}
  }
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: ToastKind = "info") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  // beim Mount registrieren wir addToast als globalen Listener
  useEffect(() => {
    const handler = (m: string, t: ToastKind) => addToast(m, t);
    listeners.add(handler);
    return () => {
      listeners.delete(handler);
    };
  }, [addToast]);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-4 right-4 space-y-2 z-[9999]">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`px-4 py-2 rounded shadow-lg text-white ${
              t.type === "success" ? "bg-green-600"
                : t.type === "error" ? "bg-red-600"
                : "bg-gray-900"
            }`}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside a ToastProvider");
  return ctx;
};
