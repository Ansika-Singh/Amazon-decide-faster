'use client';

import * as React from 'react';
import { Header } from '@/components/layout/Header';
import { CategoryStrip } from '@/components/layout/CategoryStrip';
import { Footer } from '@/components/layout/Footer';
import { ToastProvider } from '@/components/ui/Toast';
import { AiAssistantModal } from '@/components/assistant/AiAssistantModal';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const [aiModalOpen, setAiModalOpen] = React.useState(false);
  const [initialAiQuery, setInitialAiQuery] = React.useState('');

  // Allow any child component to trigger AI modal with optional custom query via window event
  React.useEffect(() => {
    const handleOpenAi = (e: CustomEvent<{ query?: string }>) => {
      setInitialAiQuery(e.detail?.query || '');
      setAiModalOpen(true);
    };

    window.addEventListener('open-ai-modal', handleOpenAi as EventListener);
    return () => window.removeEventListener('open-ai-modal', handleOpenAi as EventListener);
  }, []);

  return (
    <ToastProvider>
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
      </div>
    </ToastProvider>
  );
}
