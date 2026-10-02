'use client';

import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  side?: 'left' | 'right' | 'bottom';
  className?: string;
  title?: string;
}

export function Sheet({
  open,
  onOpenChange,
  children,
  side = 'right',
  className,
  title,
}: SheetProps) {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onOpenChange(false);
      }
    };
    if (open) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs transition-opacity"
        onClick={() => onOpenChange(false)}
      />

      <div
        className={cn(
          'fixed z-50 bg-white p-6 shadow-2xl transition-transform duration-300 ease-in-out flex flex-col',
          {
            'inset-y-0 right-0 h-full w-full max-w-md border-l border-slate-200': side === 'right',
            'inset-y-0 left-0 h-full w-full max-w-md border-r border-slate-200': side === 'left',
            'inset-x-0 bottom-0 max-h-[85vh] w-full rounded-t-2xl border-t border-slate-200': side === 'bottom',
          },
          className
        )}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          {title && <h2 className="text-lg font-semibold text-slate-900">{title}</h2>}
          <button
            onClick={() => onOpenChange(false)}
            className="ml-auto rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
            aria-label="Close sheet"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto pt-4">{children}</div>
      </div>
    </div>
  );
}
