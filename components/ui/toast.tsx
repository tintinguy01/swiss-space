"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheck, FaTimes, FaInfo } from "react-icons/fa";

// Define the toast types and interface
export type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}

// Create a global variable to store the toast function
let globalShowToast: ((type: ToastType, title: string, message?: string) => void) | null = null;

// Export a simple function to show toasts from anywhere
export const toast = {
  success: (title: string, message?: string) => {
    if (globalShowToast) {
      globalShowToast("success", title, message);
    } else {
      console.warn("Toast provider not initialized yet");
    }
  },
  error: (title: string, message?: string) => {
    if (globalShowToast) {
      globalShowToast("error", title, message);
    } else {
      console.warn("Toast provider not initialized yet");
    }
  },
  info: (title: string, message?: string) => {
    if (globalShowToast) {
      globalShowToast("info", title, message);
    } else {
      console.warn("Toast provider not initialized yet");
    }
  },
};

// Toast provider component
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Function to show a toast
  function showToast(type: ToastType, title: string, message?: string) {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, title, message }]);
    
    // Auto dismiss after 5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }

  // Register the global toast function
  useEffect(() => {
    globalShowToast = showToast;
    return () => {
      globalShowToast = null;
    };
  }, []);

  return (
    <>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.8 }}
              className={`p-4 rounded-lg shadow-lg flex items-start gap-3 pointer-events-auto ${
                toast.type === "success" ? "bg-blue-400 text-white" : 
                toast.type === "error" ? "bg-red-400 text-white" : 
                "bg-blue-500 text-white"
              }`}
            >
              <div className="mt-1 flex-shrink-0">
                {toast.type === "success" && <FaCheck />}
                {toast.type === "error" && <FaTimes />}
                {toast.type === "info" && <FaInfo />}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">{toast.title}</h4>
                {toast.message && <p className="text-sm opacity-90">{toast.message}</p>}
              </div>
              <button 
                onClick={() => {
                  setToasts((prev) => prev.filter((t) => t.id !== toast.id));
                }}
                className="text-white opacity-70 hover:opacity-100 transition-opacity"
              >
                <FaTimes size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
} 