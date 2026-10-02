'use client';

import * as React from 'react';
import { Header } from '@/components/layout/Header';
import { CategoryStrip } from '@/components/layout/CategoryStrip';
import { Footer } from '@/components/layout/Footer';
import { ToastProvider, useToast } from '@/components/ui/Toast';
import { AiAssistantModal } from '@/components/assistant/AiAssistantModal';
import { CompareDrawer } from '@/components/compare/CompareDrawer';
import { Product } from '@/types';

function ClientLayoutInner({ children }: { children: React.ReactNode }) {
  const [aiModalOpen, setAiModalOpen] = React.useState(false);
  const [initialAiQuery, setInitialAiQuery] = React.useState('');
  const [comparedProducts, setComparedProducts] = React.useState<Product[]>([]);
  const { toast } = useToast();

  // Allow any child component to trigger AI modal with optional custom query via window event
  React.useEffect(() => {
    const handleOpenAi = (e: CustomEvent<{ query?: string }>) => {
      setInitialAiQuery(e.detail?.query || '');
      setAiModalOpen(true);
    };

    const handleCompareToggle = (e: CustomEvent<Product>) => {
      const product = e.detail;
      setComparedProducts((prev) => {
        const exists = prev.some((p) => p.id === product.id);
        if (exists) {
          return prev.filter((p) => p.id !== product.id);
        }
        if (prev.length >= 3) {
          toast({
            title: 'Comparison limit reached',
            description: 'You can compare a maximum of 3 products at a time.',
            variant: 'error',
          });
          return prev;
        }
        return [...prev, product];
      });
    };

    window.addEventListener('open-ai-modal', handleOpenAi as EventListener);
    window.addEventListener('toggle-compare-product', handleCompareToggle as EventListener);
    return () => {
      window.removeEventListener('open-ai-modal', handleOpenAi as EventListener);
      window.removeEventListener('toggle-compare-product', handleCompareToggle as EventListener);
    };
  }, [toast]);

  const handleRemoveCompared = (productId: string) => {
    setComparedProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const handleClearCompared = () => {
    setComparedProducts([]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-amber-100 selection:text-amber-900">
      <Header onOpenAiAsk={() => setAiModalOpen(true)} />
      <CategoryStrip />
      <main className="flex-1">{children}</main>
      <Footer />

      <AiAssistantModal
        open={aiModalOpen}
        onOpenChange={setAiModalOpen}
        initialQuery={initialAiQuery}
      />

      <CompareDrawer
        products={comparedProducts}
        onRemove={handleRemoveCompared}
        onClear={handleClearCompared}
      />
    </div>
  );
}

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <ClientLayoutInner>{children}</ClientLayoutInner>
    </ToastProvider>
  );
}
