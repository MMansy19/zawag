"use client";

import React from "react";
import { toast, Toaster as HotToaster } from "react-hot-toast";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

// Custom toast component
const CustomToast = ({
  message,
  type,
  onClose,
}: {
  message: string;
  type: "success" | "error" | "warning" | "info";
  onClose: () => void;
}) => {
  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertTriangle,
    info: Info,
  };

  const Icon = icons[type];

  const typeClasses = {
    success: "border-secondary bg-secondary/10 text-secondary",
    error: "border-error bg-error/10 text-error",
    warning: "border-accent bg-accent/10 text-accent",
    info: "border-primary bg-primary/10 text-primary",
  };

  return (
    <div
      className={cn(
        "flex items-center gap-3 p-4 rounded-lg border shadow-lg bg-background",
        typeClasses[type],
      )}
    >
      <Icon className="h-5 w-5 flex-shrink-0" />
      <p className="flex-1 text-sm font-medium text-text">{message}</p>
      <button
        onClick={onClose}
        className="flex-shrink-0 text-text-secondary hover:text-text"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

// Toast helper functions
export const showToast = {
  success: (message: string) => {
    toast.custom((t) => (
      <CustomToast
        message={message}
        type="success"
        onClose={() => toast.dismiss(t.id)}
      />
    ));
  },

  error: (message: string) => {
    toast.custom((t) => (
      <CustomToast
        message={message}
        type="error"
        onClose={() => toast.dismiss(t.id)}
      />
    ));
  },

  warning: (message: string) => {
    toast.custom((t) => (
      <CustomToast
        message={message}
        type="warning"
        onClose={() => toast.dismiss(t.id)}
      />
    ));
  },

  info: (message: string) => {
    toast.custom((t) => (
      <CustomToast
        message={message}
        type="info"
        onClose={() => toast.dismiss(t.id)}
      />
    ));
  },

  promise: <T,>(
    promise: Promise<T>,
    msgs: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: any) => string);
    },
  ) => {
    return toast.promise(promise, {
      loading: msgs.loading,
      success: msgs.success,
      error: msgs.error,
    });
  },
};

// Main Toaster component
export function Toaster() {
  return (
    <HotToaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        duration: 4000,
        style: {
          background: "transparent",
          boxShadow: "none",
          padding: 0,
          margin: 0,
        },
        success: {
          duration: 3000,
        },
        error: {
          duration: 5000,
        },
      }}
    />
  );
}
