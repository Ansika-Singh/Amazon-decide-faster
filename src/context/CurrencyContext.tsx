'use client';

import * as React from 'react';

export type CurrencyCode = 'INR' | 'USD' | 'EUR' | 'GBP' | 'AED' | 'JPY' | 'CAD' | 'AUD';

export interface CurrencyConfig {
  code: CurrencyCode;
  name: string;
  country: string;
  symbol: string;
  flag: string;
  rate: number; // Conversion rate from 1 INR to this currency
  inrRate: number; // How many INR 1 unit of this currency equals
  locale: string;
  fractionDigits: number;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  INR: {
    code: 'INR',
    name: 'Indian Rupee',
    country: 'India',
    symbol: '₹',
    flag: '🇮🇳',
    rate: 1,
    inrRate: 1,
    locale: 'en-IN',
    fractionDigits: 0,
  },
  USD: {
    code: 'USD',
    name: 'US Dollar',
    country: 'United States',
    symbol: '$',
    flag: '🇺🇸',
    rate: 0.0116,
    inrRate: 86.2,
    locale: 'en-US',
    fractionDigits: 2,
  },
  EUR: {
    code: 'EUR',
    name: 'Euro',
    country: 'European Union',
    symbol: '€',
    flag: '🇪🇺',
    rate: 0.0108,
    inrRate: 92.6,
    locale: 'de-DE',
    fractionDigits: 2,
  },
  GBP: {
    code: 'GBP',
    name: 'British Pound',
    country: 'United Kingdom',
    symbol: '£',
    flag: '🇬🇧',
    rate: 0.0091,
    inrRate: 109.8,
    locale: 'en-GB',
    fractionDigits: 2,
  },
  AED: {
    code: 'AED',
    name: 'UAE Dirham',
    country: 'United Arab Emirates',
    symbol: 'AED ',
    flag: '🇦🇪',
    rate: 0.0425,
    inrRate: 23.5,
    locale: 'en-AE',
    fractionDigits: 2,
  },
  JPY: {
    code: 'JPY',
    name: 'Japanese Yen',
    country: 'Japan',
    symbol: '¥',
    flag: '🇯🇵',
    rate: 1.76,
    inrRate: 0.57,
    locale: 'ja-JP',
    fractionDigits: 0,
  },
  CAD: {
    code: 'CAD',
    name: 'Canadian Dollar',
    country: 'Canada',
    symbol: 'CA$',
    flag: '🇨🇦',
    rate: 0.0162,
    inrRate: 61.7,
    locale: 'en-CA',
    fractionDigits: 2,
  },
  AUD: {
    code: 'AUD',
    name: 'Australian Dollar',
    country: 'Australia',
    symbol: 'AU$',
    flag: '🇦🇺',
    rate: 0.0181,
    inrRate: 55.2,
    locale: 'en-AU',
    fractionDigits: 2,
  },
};

interface CurrencyContextType {
  currency: CurrencyCode;
  currentCurrency: CurrencyConfig;
  setCurrency: (code: CurrencyCode) => void;
  formatPrice: (priceInINR: number) => string;
  convertPrice: (priceInINR: number) => number;
  currencies: CurrencyConfig[];
}

const CurrencyContext = React.createContext<CurrencyContextType | undefined>(undefined);

const STORAGE_KEY = 'amazon_currency';

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = React.useState<CurrencyCode>('INR');
  const [mounted, setMounted] = React.useState(false);

  // Load from localStorage after mount to avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as CurrencyCode;
      if (saved && CURRENCIES[saved]) {
        setCurrencyState(saved);
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  // Listen to storage events across tabs
  React.useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        const val = e.newValue as CurrencyCode;
        if (CURRENCIES[val]) {
          setCurrencyState(val);
        }
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const setCurrency = React.useCallback((code: CurrencyCode) => {
    if (!CURRENCIES[code]) return;
    setCurrencyState(code);
    try {
      localStorage.setItem(STORAGE_KEY, code);
      // Dispatch custom event for non-react listeners
      window.dispatchEvent(new CustomEvent('currency-changed', { detail: { code } }));
    } catch {
      // Ignore
    }
  }, []);

  const currentCurrency = CURRENCIES[currency] || CURRENCIES.INR;

  const convertPrice = React.useCallback(
    (priceInINR: number): number => {
      const config = CURRENCIES[currency] || CURRENCIES.INR;
      return priceInINR * config.rate;
    },
    [currency]
  );

  const formatPrice = React.useCallback(
    (priceInINR: number): string => {
      const config = CURRENCIES[currency] || CURRENCIES.INR;
      const converted = priceInINR * config.rate;

      return new Intl.NumberFormat(config.locale, {
        style: 'currency',
        currency: config.code,
        minimumFractionDigits: config.fractionDigits,
        maximumFractionDigits: config.fractionDigits,
      }).format(converted);
    },
    [currency]
  );

  const currencies = React.useMemo(() => Object.values(CURRENCIES), []);

  const value = React.useMemo(
    () => ({
      currency,
      currentCurrency,
      setCurrency,
      formatPrice,
      convertPrice,
      currencies,
    }),
    [currency, currentCurrency, setCurrency, formatPrice, convertPrice, currencies]
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency(): CurrencyContextType {
  const context = React.useContext(CurrencyContext);
  if (!context) {
    // Graceful fallback if rendered outside provider
    const fallbackCurrency = CURRENCIES.INR;
    return {
      currency: 'INR',
      currentCurrency: fallbackCurrency,
      setCurrency: () => {},
      convertPrice: (p: number) => p,
      formatPrice: (p: number) =>
        new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
          maximumFractionDigits: 0,
        }).format(p),
      currencies: Object.values(CURRENCIES),
    };
  }
  return context;
}
