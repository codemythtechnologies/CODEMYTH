"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";

const ToastContext = createContext(null);

let idSeq = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef(new Map());

  const showToast = useCallback((title, desc, type = "success") => {
    const id = ++idSeq;
    setToasts((t) => [...t, { id, title, desc, type, leaving: false }]);

    const leaveTimer = setTimeout(() => {
      setToasts((t) => t.map((x) => (x.id === id ? { ...x, leaving: true } : x)));
      const removeTimer = setTimeout(() => {
        setToasts((t) => t.filter((x) => x.id !== id));
        timers.current.delete(id);
      }, 400);
      timers.current.set(id, removeTimer);
    }, 4200);
    timers.current.set(id, leaveTimer);
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div className="toast-wrap">
        {toasts.map((t) => (
          <div key={t.id} className={`toast ${t.type}${t.leaving ? " leaving" : ""}`}>
            {t.type === "success" ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="9 12 11 14 15 10" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            )}
            <div>
              <div className="tt">{t.title}</div>
              <div className="td">{t.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}
