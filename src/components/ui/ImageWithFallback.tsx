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
          'flex flex-col items-center justify-center bg-slate-100 text-slate-400 p-4 rounded-xl border border-slate-200/80',
          className
        )}
      >
        <Package className="h-8 w-8 text-slate-400 mb-1" />
        <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-500 text-center line-clamp-1">
          {fallbackTitle || alt || 'Product Image'}
        </span>
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
