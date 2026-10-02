'use client';

import * as React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CheckboxProps {
  id?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  label?: string;
}

export function Checkbox({
  id,
  checked = false,
  onCheckedChange,
  disabled = false,
  className,
  label,
}: CheckboxProps) {
  return (
    <label
      htmlFor={id}
      className={cn(
        'inline-flex items-center gap-2 cursor-pointer select-none text-sm text-slate-700 hover:text-slate-900',
        disabled && 'cursor-not-allowed opacity-50',
        className
      )}
    >
      <button
        type="button"
        role="checkbox"
        id={id}
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onCheckedChange?.(!checked)}
        className={cn(
          'h-4 w-4 shrink-0 rounded-md border border-slate-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 flex items-center justify-center',
          checked ? 'bg-indigo-950 border-indigo-950 text-white' : 'bg-white hover:bg-slate-50'
        )}
      >
        {checked && <Check className="h-3 w-3 stroke-[3]" />}
      </button>
      {label && <span>{label}</span>}
    </label>
  );
}
