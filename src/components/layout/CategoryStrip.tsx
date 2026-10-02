'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Headphones,
  Laptop,
  Smartphone,
  Home,
  Shirt,
  BookOpen,
  Dumbbell,
  Sparkles,
  Layers,
} from 'lucide-react';
import { categories } from '@/data/categories';
import { cn } from '@/lib/utils';

const iconMap: Record<string, React.ReactNode> = {
  Headphones: <Headphones className="h-4 w-4" />,
  Laptop: <Laptop className="h-4 w-4" />,
  Smartphone: <Smartphone className="h-4 w-4" />,
  Home: <Home className="h-4 w-4" />,
  Shirt: <Shirt className="h-4 w-4" />,
  BookOpen: <BookOpen className="h-4 w-4" />,
  Dumbbell: <Dumbbell className="h-4 w-4" />,
  Sparkles: <Sparkles className="h-4 w-4" />,
};

export function CategoryStrip() {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category');

  return (
    <div className="w-full bg-white border-b border-slate-200/80 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2.5 scrollbar-none no-scrollbar">
          <Link
            href="/search"
            className={cn(
              'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors shrink-0',
              !currentCategory
                ? 'bg-indigo-950 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            )}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>All Categories</span>
          </Link>

          {categories.map((cat) => {
            const isActive = currentCategory === cat.name;
            return (
              <Link
                key={cat.slug}
                href={`/search?category=${encodeURIComponent(cat.name)}`}
                className={cn(
                  'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all shrink-0',
                  isActive
                    ? 'bg-indigo-950 text-white font-semibold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                )}
              >
                {iconMap[cat.icon] || <Layers className="h-3.5 w-3.5" />}
                <span>{cat.name}</span>
                <span
                  className={cn(
                    'text-[10px] px-1.5 py-0.2 rounded-full font-normal',
                    isActive ? 'bg-indigo-800 text-indigo-100' : 'bg-slate-100 text-slate-500'
                  )}
                >
                  {cat.itemCount}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
