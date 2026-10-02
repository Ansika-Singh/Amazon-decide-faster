import Link from 'next/link';
import { PackageX, ArrowRight, Search, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-6">
      <div className="w-20 h-20 rounded-3xl bg-indigo-50 text-indigo-950 flex items-center justify-center mx-auto border border-indigo-200">
        <PackageX className="h-10 w-10" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
          Error 404
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Page or Product Not Found
        </h1>
        <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
          The page you're looking for doesn't exist or has moved. Explore our organic catalog or ask AI to help you decide.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
        <Link href="/">
          <Button variant="primary" size="md">
            Return Home
          </Button>
        </Link>
        <Link href="/search">
          <Button variant="outline" size="md">
            Browse All Products
          </Button>
        </Link>
      </div>
    </div>
  );
}
