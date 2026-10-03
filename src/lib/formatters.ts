import { CURRENCIES, CurrencyCode } from '@/context/CurrencyContext';

export function getActiveCurrencyCode(): CurrencyCode {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('amazon_currency') as CurrencyCode;
      if (saved && CURRENCIES[saved]) {
        return saved;
      }
    } catch {
      // Fallback
    }
  }
  return 'INR';
}

export function formatPrice(price: number, currencyCode?: CurrencyCode): string {
  const code = currencyCode || getActiveCurrencyCode();
  const config = CURRENCIES[code] || CURRENCIES.INR;
  const converted = price * config.rate;

  return new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency: config.code,
    minimumFractionDigits: config.fractionDigits,
    maximumFractionDigits: config.fractionDigits,
  }).format(converted);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-IN').format(num);
}

export function getDeliveryEstimate(days: number): string {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + days);
  
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  };
  
  const formatted = targetDate.toLocaleDateString('en-IN', options);
  return `Get it by ${formatted}`;
}

export function calculateDiscount(price: number, mrp: number): number {
  if (mrp <= price) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
}
