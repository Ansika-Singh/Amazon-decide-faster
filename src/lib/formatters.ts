export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
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
