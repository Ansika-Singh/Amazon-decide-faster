'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'accent' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-xl active:scale-[0.98]',
          {
            'bg-indigo-950 text-white hover:bg-indigo-900 shadow-sm': variant === 'primary',
            'bg-amber-500 text-slate-950 font-semibold hover:bg-amber-400 shadow-sm': variant === 'accent',
            'bg-slate-100 text-slate-800 hover:bg-slate-200': variant === 'secondary',
            'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50': variant === 'outline',
            'text-slate-600 hover:text-slate-900 hover:bg-slate-100': variant === 'ghost',
            'bg-rose-600 text-white hover:bg-rose-700': variant === 'destructive',
          },
          {
            'h-8 px-3 text-xs': size === 'sm',
            'h-10 px-4 py-2 text-sm': size === 'md',
            'h-12 px-6 text-base': size === 'lg',
            'h-10 w-10 p-0': size === 'icon',
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
