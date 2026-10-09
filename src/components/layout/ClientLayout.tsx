'use client';

import * as React from 'react';
import { Header } from '@/components/layout/Header';
import { CategoryStrip } from '@/components/layout/CategoryStrip';
import { Footer } from '@/components/layout/Footer';
import { ToastProvider, useToast } from '@/components/ui/Toast';
import { AiAssistantModal } from '@/components/assistant/AiAssistantModal';
import { CompareDrawer } from '@/components/compare/CompareDrawer';
import { CurrencyProvider } from '@/context/CurrencyContext';
import { AuthProvider } from '@/context/AuthContext';
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
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-amber-500 focus:text-slate-900 focus:font-semibold focus:rounded-md focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>
      <Header onOpenAiAsk={() => setAiModalOpen(true)} />
      <CategoryStrip />
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        {children}
      </main>
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
      <CurrencyProvider>
        <AuthProvider>
          <ClientLayoutInner>{children}</ClientLayoutInner>
        </AuthProvider>
      </CurrencyProvider>
    </ToastProvider>
  );
}
