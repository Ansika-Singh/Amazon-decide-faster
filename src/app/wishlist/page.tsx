'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Heart, ShoppingBag, Trash2, Star, TrendingDown, ArrowRight, Sparkles } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Product, CartItem } from '@/types';
import { formatPrice, getDeliveryEstimate } from '@/lib/formatters';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import { useCurrency } from '@/context/CurrencyContext';

export default function WishlistPage() {
  const { formatPrice } = useCurrency();
  const router = useRouter();
  const { toast } = useToast();
  const [wishlist, setWishlist, isLoaded] = useLocalStorage<Product[]>('amazon_wishlist', []);
  const [, setCart] = useLocalStorage<CartItem[]>('amazon_cart', []);

  const removeFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((p) => p.id !== productId));
    toast({ title: 'Removed from Wishlist', variant: 'default' });
  };

  const moveToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setWishlist((prev) => prev.filter((p) => p.id !== product.id));
    toast({
      title: 'Moved to Cart!',
      description: product.title.slice(0, 35) + '…',
      actionText: 'View Cart',
      actionHref: '/cart',
      variant: 'success',
    });
  };

  const moveAllToCart = () => {
    wishlist.forEach((product) => {
      setCart((prev) => {
        const existing = prev.find((item) => item.product.id === product.id);
        if (existing) return prev;
        return [...prev, { product, quantity: 1 }];
      });
    });
    setWishlist([]);
    toast({
      title: `${wishlist.length} items moved to Cart`,
      actionText: 'View Cart',
      actionHref: '/cart',
      variant: 'success',
    });
  };

  if (!isLoaded) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-72 rounded-2xl bg-slate-100 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Heart className="h-7 w-7 text-rose-500 fill-rose-500" />
            My Wishlist
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {wishlist.length} saved {wishlist.length === 1 ? 'item' : 'items'} — move to cart when you&apos;re ready
          </p>
        </div>
        {wishlist.length > 0 && (
          <Button
            variant="primary"
            size="md"
            onClick={moveAllToCart}
            className="gap-2 rounded-xl"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Move All to Cart</span>
            <span className="sm:hidden">All to Cart</span>
          </Button>
        )}
      </div>

      {/* Empty State */}
      {wishlist.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center space-y-5">
          <div className="h-20 w-20 rounded-full bg-rose-50 border-2 border-rose-100 flex items-center justify-center">
            <Heart className="h-9 w-9 text-rose-300" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800">Your wishlist is empty</h2>
            <p className="text-sm text-slate-500 mt-1">
              Tap the ♥ heart on any product to save it here for later.
            </p>
          </div>
          <Link href="/search">
            <Button variant="primary" size="md" className="gap-2 rounded-xl mt-2">
              Browse Products <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      )}

      {/* Wishlist Grid */}
      {wishlist.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {wishlist.map((product) => {
            const historyPrices = product.priceHistory.map((p) => p.price);
            const minPrice = Math.min(...historyPrices);
            const avgPrice = Math.round(
              historyPrices.reduce((a, b) => a + b, 0) / historyPrices.length
            );
            const dropVsAvg = avgPrice - product.price;
            const isNearLow = product.price <= minPrice * 1.05;

            return (
              <div
                key={product.id}
                className="group relative flex flex-col rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-200 overflow-hidden"
              >
                {/* Price Badge */}
                <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 items-start">
                  {dropVsAvg > 0 && (
                    <span className="inline-flex items-center gap-0.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 shadow-xs">
                      {formatPrice(dropVsAvg)} below usual
                    </span>
                  )}
                  {isNearLow && (
                    <span className="inline-flex items-center gap-0.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-600 text-white shadow-xs">
                      <TrendingDown className="h-3 w-3" /> 90d Low
                    </span>
                  )}
                </div>

                {/* Remove Button */}
                <button
                  type="button"
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-3 right-3 z-10 h-7 w-7 rounded-full bg-white border border-slate-200 shadow-xs flex items-center justify-center text-rose-400 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-300 transition-all"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>

                {/* Product Image */}
                <Link
                  href={`/product/${product.slug}`}
                  className="relative block w-full aspect-square bg-slate-50 overflow-hidden p-6"
                >
                  <ImageWithFallback
                    src={product.images[0]}
                    alt={product.title}
                    fallbackTitle={product.title}
                    category={product.category}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-contain group-hover:scale-105 transition-transform duration-300 p-2"
                  />
                </Link>

                {/* Card Body */}
                <div className="flex flex-col flex-1 p-4">
                  <div className="flex items-center justify-between gap-2 mb-1 text-xs">
                    <span className="font-semibold text-slate-500 uppercase tracking-wider text-[11px]">
                      {product.brand}
                    </span>
                    <div className="flex items-center gap-1 font-semibold text-slate-700 bg-amber-50 px-1.5 py-0.5 rounded text-[11px] border border-amber-200/60">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-500" />
                      <span>{product.rating}</span>
                      <span className="text-slate-400 font-normal">({product.reviewCount.toLocaleString('en-IN')})</span>
                    </div>
                  </div>

                  <Link
                    href={`/product/${product.slug}`}
                    className="text-sm font-semibold text-slate-900 group-hover:text-indigo-950 transition-colors line-clamp-2 leading-snug mb-1.5"
                  >
                    {product.title}
                  </Link>

                  {/* AI Verdict one-liner */}
                  <p className="text-xs text-slate-500 line-clamp-1 mb-3 flex items-center gap-1">
                    <Sparkles className="h-3 w-3 text-amber-500 shrink-0" />
                    {product.reviewSummary.verdict}
                  </p>

                  {/* Price + CTA */}
                  <div className="mt-auto pt-2 border-t border-slate-100 space-y-2">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-lg font-bold text-slate-900 tracking-tight">
                        {formatPrice(product.price)}
                      </span>
                      {product.mrp > product.price && (
                        <span className="text-xs text-slate-400 line-through">
                          {formatPrice(product.mrp)}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] font-medium text-emerald-700">
                      {getDeliveryEstimate(product.deliveryDays)}
                    </p>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => moveToCart(product)}
                      className="w-full h-9 gap-1.5 rounded-xl font-semibold text-xs"
                      aria-label={`Move ${product.title} to cart`}
                    >
                      <ShoppingBag className="h-3.5 w-3.5" />
                      Move to Cart
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
