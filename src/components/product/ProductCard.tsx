'use client';

import * as React from 'react';
import Link from 'next/link';
import { Star, ShoppingBag, TrendingDown, Check, Heart } from 'lucide-react';
import { Product, CartItem } from '@/types';
import { formatPrice, getDeliveryEstimate } from '@/lib/formatters';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useToast } from '@/components/ui/Toast';

interface ProductCardProps {
  product: Product;
  onCompareToggle?: (product: Product) => void;
  isCompared?: boolean;
}

export function ProductCard({
  product,
  onCompareToggle,
  isCompared = false,
}: ProductCardProps) {
  const [, setCart] = useLocalStorage<CartItem[]>('amazon_cart', []);
  const [wishlist, setWishlist] = useLocalStorage<Product[]>('amazon_wishlist', []);
  const { toast } = useToast();
  const [isAdded, setIsAdded] = React.useState(false);

  const isWishlisted = wishlist.some((p) => p.id === product.id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      setWishlist((prev) => prev.filter((p) => p.id !== product.id));
      toast({ title: 'Removed from Wishlist', variant: 'default' });
    } else {
      setWishlist((prev) => [...prev, product]);
      toast({
        title: 'Saved to Wishlist ♥',
        description: product.title.slice(0, 35) + '…',
        actionText: 'View Wishlist',
        actionHref: '/wishlist',
        variant: 'success',
      });
    }
  };

  // Compute 90-day stats
  const historyPrices = product.priceHistory.map((p) => p.price);
  const minPrice = Math.min(...historyPrices);
  const avgPrice = Math.round(
    historyPrices.reduce((a, b) => a + b, 0) / historyPrices.length
  );
  const dropVsAvg = avgPrice - product.price;
  const isNearLow = product.price <= minPrice * 1.05;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);

    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
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
    <div className="group relative flex flex-col rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all duration-200 overflow-hidden">
      {/* Price Signal / 90-Day vs Average Tag */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 items-start">
        {dropVsAvg > 0 && (
          <Badge variant="accent" className="font-bold text-[11px] shadow-2xs">
            ₹{dropVsAvg.toLocaleString('en-IN')} below usual
          </Badge>
        )}
        {isNearLow && (
          <span className="inline-flex items-center gap-0.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-600 text-white shadow-2xs">
            <TrendingDown className="h-3 w-3" /> 90d Low
          </span>
        )}
      </div>

      {/* Compare Checkbox Button */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (onCompareToggle) {
            onCompareToggle(product);
          } else {
            window.dispatchEvent(new CustomEvent('toggle-compare-product', { detail: product }));
          }
        }}
        className={`absolute top-3 right-3 z-10 flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-semibold transition-all ${
          isCompared
            ? 'bg-indigo-950 text-white shadow-xs'
            : 'bg-white/90 text-slate-600 hover:bg-white border border-slate-200 shadow-2xs hover:text-indigo-950'
        }`}
        title="Compare up to 3 products"
      >
        <div
          className={`w-3 h-3 rounded flex items-center justify-center border ${
            isCompared ? 'bg-amber-400 border-amber-400 text-indigo-950' : 'border-slate-300'
          }`}
        >
          {isCompared && <Check className="h-2.5 w-2.5 stroke-[3]" />}
        </div>
        <span>Compare</span>
      </button>

      {/* Wishlist Heart Button */}
      <button
        type="button"
        onClick={handleWishlistToggle}
        className={`absolute bottom-[168px] right-3 z-10 h-8 w-8 rounded-full flex items-center justify-center shadow-sm transition-all ${
          isWishlisted
            ? 'bg-rose-500 text-white border-2 border-rose-400 scale-110'
            : 'bg-white/90 text-slate-400 border border-slate-200 hover:text-rose-500 hover:border-rose-300 hover:bg-rose-50'
        }`}
        aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
      >
        <Heart className={`h-4 w-4 transition-all ${isWishlisted ? 'fill-white' : ''}`} />
      </button>

      {/* Image Container */}
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

      {/* Card Content */}
      <div className="flex flex-col flex-1 p-4">
        {/* Brand & Rating */}
        <div className="flex items-center justify-between gap-2 mb-1.5 text-xs">
          <span className="font-semibold text-slate-500 uppercase tracking-wider text-[11px]">
            {product.brand}
          </span>
          <div className="flex items-center gap-1 font-semibold text-slate-700 bg-amber-50 px-1.5 py-0.5 rounded text-[11px] border border-amber-200/60">
            <Star className="h-3 w-3 fill-amber-400 text-amber-500" />
            <span>{product.rating}</span>
            <span className="text-slate-400 font-normal">({product.reviewCount.toLocaleString('en-IN')})</span>
          </div>
        </div>

        {/* Title */}
        <Link
          href={`/product/${product.slug}`}
          className="text-sm font-semibold text-slate-900 group-hover:text-indigo-950 transition-colors line-clamp-2 leading-snug mb-2"
        >
          {product.title}
        </Link>

        {/* Quick Honest Highlight */}
        <p className="text-xs text-slate-500 line-clamp-1 mb-3">
          {product.reviewSummary.verdict}
        </p>

        {/* Spacer */}
        <div className="mt-auto pt-2 border-t border-slate-100 flex items-end justify-between gap-2">
          {/* Price */}
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold text-slate-900 tracking-tight">
                {formatPrice(product.price)}
              </span>
            </div>
            <div className="text-[11px] font-medium text-emerald-700">
              {getDeliveryEstimate(product.deliveryDays)}
            </div>
          </div>

          {/* Add to Cart CTA */}
          <Button
            variant={isAdded ? "success" : "accent"}
            size="sm"
            onClick={handleAddToCart}
            className={`h-9 px-3 gap-1.5 rounded-xl shadow-2xs font-semibold text-xs active:scale-95 transition-all duration-200 ${
              isAdded ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : ''
            }`}
            aria-label={`Add ${product.title} to cart`}
          >
            {isAdded ? (
              <>
                <Check className="h-3.5 w-3.5 stroke-[3] animate-bounce" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="h-3.5 w-3.5" />
                <span>Add</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
