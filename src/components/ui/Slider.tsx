'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SliderProps {
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (val: number) => void;
  className?: string;
  formatValue?: (val: number) => string;
}

export function Slider({
  min,
  max,
  step = 1,
  value,
  onChange,
  className,
  formatValue,
}: SliderProps) {
  const percentage = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));

  return (
    <div className={cn('w-full space-y-2', className)}>
      <div className="flex justify-between text-xs font-medium text-slate-500">
        <span>{formatValue ? formatValue(min) : min}</span>
        <span className="font-semibold text-indigo-950">
          {formatValue ? formatValue(value) : value}
        </span>
        <span>{formatValue ? formatValue(max) : max}</span>
      </div>
      <div className="relative flex items-center">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-950 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
          style={{
            background: `linear-gradient(to right, #1e1b4b 0%, #1e1b4b ${percentage}%, #e2e8f0 ${percentage}%, #e2e8f0 100%)`,
          }}
        />
      </div>
    </div>
  );
}
