'use client';

import * as React from 'react';
import Image, { ImageProps } from 'next/image';
import {
  Package,
  Headphones,
  Laptop,
  Smartphone,
  CookingPot,
  Shirt,
  BookOpen,
  Dumbbell,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ImageWithFallbackProps extends Omit<ImageProps, 'onError'> {
  fallbackTitle?: string;
  category?: string;
}

const categoryIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Audio: Headphones,
  Electronics: Laptop,
  Mobiles: Smartphone,
  'Home & Kitchen': CookingPot,
  Fashion: Shirt,
  Books: BookOpen,
  Fitness: Dumbbell,
  Beauty: Sparkles,
};

export function ImageWithFallback({
  src,
  alt,
  className,
  fallbackTitle,
  category,
  ...props
}: ImageWithFallbackProps) {
  const [error, setError] = React.useState(false);

  // If no src, or empty string, or image failed to load -> Consistent Branded Placeholder
  if (error || !src || typeof src !== 'string' || src.trim() === '') {
    const IconComponent = (category && categoryIconMap[category]) || Package;

    return (
      <div
        className={cn(
          'flex flex-col items-center justify-center text-center p-4 bg-gradient-to-b from-slate-50 via-slate-100/70 to-slate-200/50 rounded-2xl border border-slate-200 shadow-2xs select-none overflow-hidden transition-all',
          props.fill ? 'absolute inset-0 w-full h-full' : 'w-full h-full min-h-[180px]',
          className
        )}
      >
        {/* Subtle Ambient Brand Badge */}
        <div className="relative mb-2.5">
          <div className="w-14 h-14 rounded-2xl bg-indigo-950 text-white flex items-center justify-center shadow-md">
            <IconComponent className="h-7 w-7 text-amber-400 stroke-[1.75]" />
          </div>
          <div className="absolute -bottom-1 -right-1 bg-amber-400 text-slate-950 rounded-full p-0.5 shadow-2xs">
            <ShieldCheck className="h-3.5 w-3.5" />
          </div>
        </div>

        {/* Brand Tag */}
        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-900/10 text-indigo-950 border border-indigo-950/15 text-[10px] font-bold uppercase tracking-wider mb-2">
          <span>Decide Faster Verified</span>
        </div>

        {/* Product Title / Fallback Title */}
        <span className="text-xs font-bold text-slate-800 line-clamp-2 max-w-[90%] px-1 leading-snug">
          {fallbackTitle || alt || 'Verified Product'}
        </span>

        {/* Subtitle / Verification note */}
        <span className="text-[10px] text-slate-500 font-medium mt-1">
          {category ? `${category} • ` : ''}Official Spec Sheet
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
