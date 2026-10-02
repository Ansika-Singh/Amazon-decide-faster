import { Skeleton } from '@/components/ui/Skeleton';

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 animate-pulse">
      <div className="h-48 w-full rounded-3xl bg-slate-200/80" />
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <Skeleton className="h-8 w-40" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-80 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
