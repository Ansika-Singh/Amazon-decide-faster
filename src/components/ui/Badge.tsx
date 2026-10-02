import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'accent' | 'success' | 'warning' | 'outline';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        {
          'bg-indigo-950 text-white': variant === 'default',
          'bg-slate-100 text-slate-800': variant === 'secondary',
          'bg-amber-100 text-amber-900 border border-amber-300': variant === 'accent',
          'bg-emerald-50 text-emerald-700 border border-emerald-200': variant === 'success',
          'bg-amber-50 text-amber-800 border border-amber-200': variant === 'warning',
          'border border-slate-300 text-slate-700': variant === 'outline',
        },
        className
      )}
      {...props}
    />
  );
}
