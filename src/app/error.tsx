'use client';

import * as React from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error('Unhandled app error:', error);
  }, [error]);

  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-200">
        <AlertTriangle className="h-8 w-8" />
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Something went wrong
        </h1>
        <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
          An unexpected glitch occurred while rendering this page. You can refresh or try again.
        </p>
      </div>

      <div className="pt-2">
        <Button variant="primary" size="md" onClick={() => reset()} className="gap-2">
          <RotateCcw className="h-4 w-4" />
          <span>Try Again</span>
        </Button>
      </div>
    </div>
  );
}
