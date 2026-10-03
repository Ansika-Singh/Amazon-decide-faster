'use client';

import * as React from 'react';
import { ChevronDown, Check, Globe } from 'lucide-react';
import { useCurrency, CurrencyCode } from '@/context/CurrencyContext';

interface CurrencySelectorProps {
  variant?: 'header' | 'footer' | 'compact';
  className?: string;
}

export function CurrencySelector({ variant = 'header', className = '' }: CurrencySelectorProps) {
  const { currency, setCurrency, currencies, currentCurrency } = useCurrency();
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code: CurrencyCode) => {
    setCurrency(code);
    setIsOpen(false);
  };

  if (variant === 'footer') {
    return (
      <div className={`relative inline-block ${className}`} ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-xs text-slate-200 hover:bg-slate-700 hover:border-slate-600 transition-colors"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-label="Select currency"
        >
          <span className="text-sm">{currentCurrency.flag}</span>
          <span className="font-semibold">{currentCurrency.code}</span>
          <span className="text-slate-400">({currentCurrency.symbol.trim()})</span>
          <ChevronDown className="h-3 w-3 text-slate-400 ml-0.5" />
        </button>

        {isOpen && (
          <div className="absolute bottom-full left-0 mb-2 w-64 rounded-xl border border-slate-700 bg-slate-800 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2.5 py-1.5 border-b border-slate-700 flex items-center justify-between">
              <span>Select Currency</span>
              <span>Rate vs ₹</span>
            </div>
            <div className="max-h-64 overflow-y-auto py-1 space-y-0.5 scrollbar-thin">
              {currencies.map((c) => {
                const isSelected = c.code === currency;
                return (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => handleSelect(c.code)}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs transition-colors text-left ${
                      isSelected
                        ? 'bg-indigo-600 text-white font-semibold'
                        : 'text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{c.flag}</span>
                      <span className="font-bold">{c.code}</span>
                      <span className="text-[11px] opacity-80">({c.symbol.trim()})</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] opacity-75">
                        {c.code === 'INR' ? 'Base' : `₹${c.inrRate}`}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Header / default variant
  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 h-10 px-2.5 sm:px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-all shadow-2xs hover:border-slate-300 min-h-[44px]"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Change display currency"
        title={`Change currency (Currently ${currentCurrency.name})`}
      >
        <span className="text-sm shrink-0">{currentCurrency.flag}</span>
        <span className="font-bold text-slate-900">{currentCurrency.code}</span>
        <span className="text-slate-500 hidden sm:inline">({currentCurrency.symbol.trim()})</span>
        <ChevronDown className="h-3 w-3 text-slate-400 shrink-0 ml-0.5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1.5 w-72 rounded-2xl border border-slate-200 bg-white shadow-xl p-2 z-50 animate-in fade-in zoom-in-95">
          <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between text-xs">
            <span className="font-bold text-slate-800 flex items-center gap-1.5">
              <Globe className="h-3.5 w-3.5 text-indigo-950" />
              Currency & Rates
            </span>
            <span className="text-[10px] font-semibold text-slate-400">Live Rates</span>
          </div>

          <div className="max-h-72 overflow-y-auto py-1 space-y-0.5 scrollbar-thin">
            {currencies.map((c) => {
              const isSelected = c.code === currency;
              return (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => handleSelect(c.code)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors text-left cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-950 text-white font-semibold shadow-2xs'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg shrink-0">{c.flag}</span>
                    <div className="flex flex-col">
                      <span className="font-bold leading-tight">
                        {c.code}{' '}
                        <span className={`text-[11px] font-normal ${isSelected ? 'text-indigo-200' : 'text-slate-500'}`}>
                          • {c.symbol.trim()}
                        </span>
                      </span>
                      <span className={`text-[10px] ${isSelected ? 'text-indigo-200' : 'text-slate-400'}`}>
                        {c.country}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-right">
                    <div className="flex flex-col items-end">
                      <span className={`text-[11px] font-mono font-medium ${isSelected ? 'text-amber-300' : 'text-slate-600'}`}>
                        {c.code === 'INR' ? '1 INR' : `1 ${c.code}`}
                      </span>
                      <span className={`text-[9px] ${isSelected ? 'text-indigo-200' : 'text-slate-400'}`}>
                        {c.code === 'INR' ? 'Base Currency' : `≈ ₹${c.inrRate}`}
                      </span>
                    </div>
                    {isSelected && <Check className="h-3.5 w-3.5 text-amber-400 shrink-0" />}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="pt-2 px-3 pb-1 border-t border-slate-100 text-[10px] text-slate-400 text-center">
            Rates auto-convert product prices, delivery & cart totals.
          </div>
        </div>
      )}
    </div>
  );
}
