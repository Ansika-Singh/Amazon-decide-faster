import * as React from 'react';
import { Suspense } from 'react';
import { SearchClient } from './SearchClient';
import { Skeleton } from '@/components/ui/Skeleton';

export const metadata = {
  title: 'Search & Explore Catalog — Decide Faster Amazon',
  description:
    'Search through 50 organic verified products. Filter by budget, customer rating, brand, and category with zero sponsored results.',
};

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          <Skeleton className="h-10 w-48" />
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <Skeleton className="h-96" />
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-80 rounded-2xl" />
              ))}
            </div>
          </div>
        </div>
      }
    >
      <SearchClient />
    </Suspense>
  );
}
