import { Skeleton } from '@/components/ui/Skeleton';

export default function SearchLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Skeleton className="h-8 w-48" />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <Skeleton className="h-[450px] rounded-2xl hidden lg:block" />
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-84 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
