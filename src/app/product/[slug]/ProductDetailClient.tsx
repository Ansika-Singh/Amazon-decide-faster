'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Star,
  ShoppingBag,
  Zap,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2,
  ChevronRight,
  Share2,
  Check,
} from 'lucide-react';
import { Product, CartItem } from '@/types';
import { formatPrice, getDeliveryEstimate } from '@/lib/formatters';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { PriceHistoryChart } from '@/components/product/PriceHistoryChart';
import { ReviewSummaryDigest } from '@/components/product/ReviewSummaryDigest';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useToast } from '@/components/ui/Toast';

interface ProductDetailClientProps {
  product: Product;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = React.useState(product.images[0]);
  const [quantity, setQuantity] = React.useState(1);
  const [copiedLink, setCopiedLink] = React.useState(false);
  const [isAdded, setIsAdded] = React.useState(false);

  const [, setCart] = useLocalStorage<CartItem[]>('amazon_cart', []);
  const { toast } = useToast();

  const historyPrices = product.priceHistory.map((p) => p.price);
  const avgPrice = Math.round(
    historyPrices.reduce((a, b) => a + b, 0) / (historyPrices.length || 1)
  );
  const dropVsAvg = avgPrice - product.price;

  const handleAddToCart = () => {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);

    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });

    toast({
      title: 'Added to cart',
      description: `${quantity}x ${product.title.slice(0, 28)}...`,
      actionText: 'View Cart',
      actionHref: '/cart',
      variant: 'success',
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/checkout');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
      toast({
        title: 'Link copied',
        description: 'Product URL copied to clipboard',
        variant: 'default',
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 overflow-x-auto whitespace-nowrap">
        <Link href="/" className="hover:text-slate-900 transition-colors">
          Home
        </Link>
        <ChevronRight className="h-3 w-3 text-slate-400" />
        <Link
          href={`/search?category=${encodeURIComponent(product.category)}`}
          className="hover:text-slate-900 transition-colors"
        >
          {product.category}
        </Link>
        <ChevronRight className="h-3 w-3 text-slate-400" />
        <span className="font-semibold text-slate-800 truncate max-w-xs">
          {product.title}
        </span>
      </nav>

      {/* Main Product Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left: Image Gallery (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Main Image */}
          <div className="relative aspect-square w-full rounded-3xl bg-white border border-slate-200/90 overflow-hidden p-6 shadow-2xs">
            <ImageWithFallback
              src={selectedImage}
              alt={product.title}
              fallbackTitle={product.title}
              category={product.category}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-contain p-4"
            />
            {dropVsAvg > 0 && (
              <div className="absolute top-4 left-4">
                <Badge variant="accent" className="font-bold text-xs shadow-2xs">
                  ₹{dropVsAvg.toLocaleString('en-IN')} below usual
                </Badge>
              </div>
            )}
          </div>

          {/* Thumbnails row */}
          <div className="flex items-center gap-3 overflow-x-auto py-1">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedImage(img)}
                className={`relative w-20 h-20 rounded-xl bg-white border-2 overflow-hidden shrink-0 transition-all ${
                  selectedImage === img
                    ? 'border-indigo-950 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <ImageWithFallback
                  src={img}
                  alt={`${product.title} view ${idx + 1}`}
                  fallbackTitle={product.title}
                  category={product.category}
                  fill
                  className="object-contain p-1"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Middle: Details & Bullets (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Brand & Share */}
          <div className="flex items-center justify-between">
            <Link
              href={`/search?brand=${encodeURIComponent(product.brand)}`}
              className="text-xs font-bold uppercase tracking-wider text-indigo-900 hover:underline"
            >
              Visit {product.brand} Store
            </Link>
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 transition-colors"
            >
              {copiedLink ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Share2 className="h-3.5 w-3.5" />}
              <span>{copiedLink ? 'Copied' : 'Share'}</span>
            </button>
          </div>

          {/* Title */}
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
            {product.title}
          </h1>

          {/* Rating & Review count */}
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1 font-bold text-slate-800 bg-amber-50 px-2 py-1 rounded-lg border border-amber-200">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-500" />
              <span>{product.rating}</span>
            </div>
            <span className="text-slate-500">
              {product.reviewCount.toLocaleString('en-IN')} verified customer reviews
            </span>
          </div>

          {/* Price breakdown */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {formatPrice(product.price)}
              </span>
              {product.mrp > product.price && (
                <span className="text-sm text-slate-400 line-through">
                  {formatPrice(product.mrp)}
                </span>
              )}
              {dropVsAvg > 0 && (
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                  ₹{dropVsAvg.toLocaleString('en-IN')} below 90-day average
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-500">Inclusive of all taxes.</p>
          </div>

          {/* Key Bullet Highlights */}
          <div className="space-y-2.5 pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Key Features
            </h3>
            <ul className="space-y-2 text-xs text-slate-700">
              {product.bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Description */}
          <div className="space-y-1.5 pt-2 border-t border-slate-200 text-xs text-slate-600 leading-relaxed">
            <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              Overview
            </h3>
            <p>{product.description}</p>
          </div>
        </div>

        {/* Right: Buy Box / Action Box (3 cols) */}
        <div className="lg:col-span-3 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5 sticky top-28">
          {/* Price in Buy Box */}
          <div>
            <div className="text-2xl font-extrabold text-slate-900">
              {formatPrice(product.price * quantity)}
            </div>
            {product.price >= 499 ? (
              <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1 mt-1">
                <Truck className="h-3.5 w-3.5" /> Free Fast Delivery
              </span>
            ) : (
              <span className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                <Truck className="h-3.5 w-3.5" /> Delivery ₹40 (Free on orders &gt; ₹499)
              </span>
            )}
          </div>

          {/* Delivery & Stock */}
          <div className="space-y-2 text-xs border-y border-slate-100 py-3">
            <div className="font-semibold text-slate-900">
              {getDeliveryEstimate(product.deliveryDays)}
            </div>
            <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>In Stock — Ready to ship</span>
            </div>
            <div className="text-[11px] text-slate-500">
              Ships directly from local fulfillment center.
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Quantity:</label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((qty) => (
                <button
                  key={qty}
                  type="button"
                  onClick={() => setQuantity(qty)}
                  className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                    quantity === qty
                      ? 'bg-indigo-950 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {qty}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            <Button
              variant={isAdded ? "success" : "accent"}
              size="lg"
              onClick={handleAddToCart}
              className={`w-full gap-2 text-sm font-bold shadow-xs active:scale-95 transition-all duration-200 ${
                isAdded ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : ''
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="h-4 w-4 stroke-[3] animate-bounce" />
                  <span>Added to Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="h-4 w-4" />
                  <span>Add to Cart</span>
                </>
              )}
            </Button>

            <Button
              variant="primary"
              size="lg"
              onClick={handleBuyNow}
              className="w-full gap-2 text-sm font-bold shadow-xs active:scale-95"
            >
              <Zap className="h-4 w-4 text-amber-400 fill-amber-400" />
              <span>Buy Now</span>
            </Button>
          </div>

          {/* Guarantees */}
          <div className="space-y-2 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-indigo-700 shrink-0" />
              <span>Zero sponsored listings guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="h-4 w-4 text-indigo-700 shrink-0" />
              <span>7-day easy replacement policy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Differentiator Sections: Price History + Honest Review Digest */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-8 border-t border-slate-200">
        {/* Price History & Signal */}
        <PriceHistoryChart
          priceHistory={product.priceHistory}
          currentPrice={product.price}
        />

        {/* Honest Review Digest */}
        <ReviewSummaryDigest
          summary={product.reviewSummary}
          reviewCount={product.reviewCount}
        />
      </div>

      {/* Mobile Sticky Buy Bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white border-t border-slate-200 p-3 sm:hidden shadow-lg flex items-center justify-between gap-3">
        <div>
          <div className="text-base font-bold text-slate-900">{formatPrice(product.price)}</div>
          <div className="text-[10px] text-emerald-700 font-medium">
            {getDeliveryEstimate(product.deliveryDays)}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="accent" size="sm" onClick={handleAddToCart} className="text-xs px-3">
            Add
          </Button>
          <Button variant="primary" size="sm" onClick={handleBuyNow} className="text-xs px-4">
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
}
