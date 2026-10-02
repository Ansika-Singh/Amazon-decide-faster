'use client';

import * as React from 'react';
import Link from 'next/link';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  actionText?: string;
  actionHref?: string;
  variant?: 'success' | 'error' | 'default';
}

interface ToastContextValue {
  toast: (message: Omit<ToastMessage, 'id'>) => void;
}

const ToastContext = React.createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastMessage[]>([]);

  const toast = React.useCallback(
    ({ title, description, actionText, actionHref, variant = 'default' }: Omit<ToastMessage, 'id'>) => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, title, description, actionText, actionHref, variant }]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4000);
    },
    []
  );

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {/* Toast container */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none p-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              'pointer-events-auto flex items-start gap-3 rounded-xl p-4 shadow-lg border backdrop-blur-md transition-all duration-300 animate-in slide-in-from-bottom-5',
              {
                'bg-slate-900/95 text-white border-slate-800': t.variant === 'default',
                'bg-emerald-950/95 text-emerald-100 border-emerald-800': t.variant === 'success',
                'bg-rose-950/95 text-rose-100 border-rose-800': t.variant === 'error',
              }
            )}
          >
            {t.variant === 'success' && <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />}
            {t.variant === 'error' && <AlertCircle className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />}
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold">{t.title}</p>
              {t.description && <p className="text-xs text-slate-300 mt-0.5">{t.description}</p>}
              {t.actionText && t.actionHref && (
                <Link
                  href={t.actionHref}
                  onClick={() => removeToast(t.id)}
                  className="inline-block mt-1 text-xs font-semibold text-amber-400 hover:text-amber-300 underline underline-offset-2"
                >
                  {t.actionText} →
                </Link>
              )}
            </div>

            <button
              onClick={() => removeToast(t.id)}
              className="text-slate-400 hover:text-white transition-colors"
              aria-label="Close notification"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
