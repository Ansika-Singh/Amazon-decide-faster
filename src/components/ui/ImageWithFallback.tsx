'use client';

import * as React from 'react';
import Image, { ImageProps } from 'next/image';
import { Package } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ImageWithFallbackProps extends Omit<ImageProps, 'onError'> {
  fallbackTitle?: string;
}

export function ImageWithFallback({
  src,
  alt,
  className,
  fallbackTitle,
  ...props
}: ImageWithFallbackProps) {
  const [error, setError] = React.useState(false);

  if (error || !src) {
    return (
      <div
        className={cn(
          'flex flex-col items-center justify-center text-center p-4 bg-gradient-to-b from-slate-50 to-slate-100/80 rounded-2xl border border-slate-200/90 text-slate-500 select-none overflow-hidden',
          props.fill ? 'absolute inset-0 w-full h-full' : 'w-full h-full min-h-[160px]',
          className
        )}
      >
        <div className="w-12 h-12 rounded-2xl bg-indigo-950 text-white flex items-center justify-center shadow-xs mb-2">
          <span className="font-extrabold text-base tracking-tighter">D</span>
        </div>
        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-200/70 text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
          <span>Decide Faster</span>
        </div>
        <span className="text-[11px] font-semibold text-slate-700 line-clamp-2 max-w-[85%] px-1">
          {fallbackTitle || alt || 'Verified Product'}
        </span>
        <span className="text-[10px] text-slate-400 mt-1">Official Photo Placeholder</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      {...props}
    />
  );
}
