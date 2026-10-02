'use client';

import * as React from 'react';
import Link from 'next/link';
import { X, Scale, ShoppingBag, Check, Trash2, Star, Truck } from 'lucide-react';
import { Product, CartItem } from '@/types';
import { formatPrice, getDeliveryEstimate } from '@/lib/formatters';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { Button } from '@/components/ui/Button';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useToast } from '@/components/ui/Toast';

interface CompareDrawerProps {
  products: Product[];
  onRemove: (productId: string) => void;
  onClear: () => void;
}

export function CompareDrawer({ products, onRemove, onClear }: CompareDrawerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [, setCart] = useLocalStorage<CartItem[]>('amazon_cart', []);
  const { toast } = useToast();

  if (products.length === 0) return null;

  const lowestPrice = products.length > 0 ? Math.min(...products.map((p) => p.price)) : 0;
  const highestRating = products.length > 0 ? Math.max(...products.map((p) => p.rating)) : 0;

  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });

    toast({
      title: 'Added to cart',
      description: `${product.title.slice(0, 30)}...`,
      actionText: 'View Cart',
      actionHref: '/cart',
      variant: 'success',
    });
  };

  return (
    <>
      {/* Floating Pill when minimized */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-40 animate-in slide-in-from-bottom-5">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-3 px-5 py-3 rounded-full bg-indigo-950 text-white shadow-xl hover:bg-indigo-900 border border-indigo-800 transition-all hover:scale-105 active:scale-95"
          >
            <div className="relative">
              <Scale className="h-5 w-5 text-amber-400" />
              <span className="absolute -top-1.5 -right-2 bg-amber-500 text-slate-950 text-[10px] font-extrabold h-4 w-4 rounded-full flex items-center justify-center">
                {products.length}
              </span>
            </div>
            <span className="text-xs font-bold tracking-wide">
              Compare ({products.length}/3)
            </span>
          </button>
        </div>
      )}

      {/* Expanded Bottom Drawer */}
      {isOpen && (
        <div className="fixed inset-x-0 bottom-0 z-50 bg-white border-t border-slate-300 shadow-2xl animate-in slide-in-from-bottom duration-300 max-h-[85vh] overflow-y-auto">
          {/* Drawer Header */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Scale className="h-4 w-4 text-amber-400" />
              <h3 className="text-sm font-bold tracking-wide">
                Side-by-Side Product Comparison ({products.length}/3)
              </h3>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <button
                type="button"
                onClick={onClear}
                className="text-slate-400 hover:text-white transition-colors"
              >
                Clear all
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
                aria-label="Close comparison drawer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Comparison Grid */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
              {products.map((product) => {
                const isLowestPrice = products.length > 1 && product.price === lowestPrice;
                const isHighestRated = products.length > 1 && product.rating === highestRating;

                return (
                  <div key={product.id} className="pt-4 sm:pt-0 sm:px-4 space-y-4 first:pl-0 last:pr-0">
                    {/* Highlights & Image */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="relative w-24 h-24 bg-slate-50 rounded-xl overflow-hidden border border-slate-200 p-2">
                        <ImageWithFallback
                          src={product.images[0]}
                          alt={product.title}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <button
                          type="button"
                          onClick={() => onRemove(product.id)}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                          title="Remove from comparison"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        {isLowestPrice && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold tracking-tight">
                            Best Price
                          </span>
                        )}
                        {isHighestRated && (
                          <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-900 text-[10px] font-bold tracking-tight">
                            Top Rated
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Title & Brand */}
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {product.brand}
                      </span>
                      <Link
                        href={`/product/${product.slug}`}
                        className="block text-sm font-semibold text-slate-900 hover:text-indigo-950 line-clamp-2 leading-snug"
                      >
                        {product.title}
                      </Link>
                    </div>

                    {/* Price & Rating */}
                    <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                      <div>
                        <span className="text-base font-bold text-slate-900">
                          {formatPrice(product.price)}
                        </span>
                        {product.mrp > product.price && (
                          <span className="text-[11px] text-slate-400 line-through ml-1.5">
                            {formatPrice(product.mrp)}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 font-semibold text-slate-700 bg-amber-50 px-2 py-0.5 rounded text-[11px] border border-amber-200">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-500" />
                        <span>{product.rating}</span>
                      </div>
                    </div>

                    {/* Delivery */}
                    <div className="text-xs text-emerald-700 font-medium flex items-center gap-1">
                      <Truck className="h-3.5 w-3.5" />
                      <span>{getDeliveryEstimate(product.deliveryDays)}</span>
                    </div>

                    {/* Honest One-Line Verdict */}
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-900">
                        Verdict
                      </span>
                      <p className="italic leading-snug line-clamp-2">
                        "{product.reviewSummary.verdict}"
                      </p>
                    </div>

                    {/* Key Features Bullets */}
                    <div className="space-y-1 text-xs text-slate-600">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Key Highlights
                      </span>
                      <ul className="space-y-1">
                        {product.bullets.slice(0, 3).map((b, i) => (
                          <li key={i} className="flex items-start gap-1.5 leading-snug">
                            <Check className="h-3 w-3 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="line-clamp-2">{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action */}
                    <Button
                      variant="accent"
                      size="sm"
                      onClick={() => handleAddToCart(product)}
                      className="w-full gap-1.5 text-xs font-bold"
                    >
                      <ShoppingBag className="h-3.5 w-3.5" />
                      <span>Add to Cart</span>
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
