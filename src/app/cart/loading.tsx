import { Skeleton } from '@/components/ui/Skeleton';

export default function CartLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-pulse">
      <Skeleton className="h-8 w-44" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-4">
          <Skeleton className="h-16 w-full rounded-2xl" />
          <Skeleton className="h-28 w-full rounded-2xl" />
          <Skeleton className="h-28 w-full rounded-2xl" />
        </div>
        <div className="lg:col-span-4">
          <Skeleton className="h-72 w-full rounded-3xl" />
        </div>
      </div>
    </div>
  );
}
