'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
} from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { CartItem } from '@/types';
import { formatPrice, getDeliveryEstimate } from '@/lib/formatters';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { Button } from '@/components/ui/Button';

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems, isLoaded] = useLocalStorage<CartItem[]>('amazon_cart', []);

  const updateQuantity = (productId: string, newQty: number) => {
    if (newQty <= 0) {
      removeItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const removeItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Calculations
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const totalMrp = cartItems.reduce(
    (acc, item) => acc + item.product.mrp * item.quantity,
    0
  );
  const totalSavings = totalMrp > subtotal ? totalMrp - subtotal : 0;
  const isFreeDelivery = subtotal >= 499 || subtotal === 0;
  const deliveryFee = isFreeDelivery ? 0 : 40;
  const total = subtotal + deliveryFee;
  const remainingForFreeDelivery = Math.max(0, 499 - subtotal);

  if (!isLoaded) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="h-8 w-40 bg-slate-200 animate-pulse rounded-lg mx-auto" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Shopping Cart
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {cartItems.length} distinct {cartItems.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        {cartItems.length > 0 && (
          <button
            onClick={clearCart}
            className="text-xs text-slate-500 hover:text-rose-600 transition-colors"
          >
            Clear cart
          </button>
        )}
      </div>

      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cart Items List (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Free Shipping Progress Callout */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <Truck className="h-4 w-4 text-emerald-600" />
                  {isFreeDelivery
                    ? 'Your order qualifies for FREE Fast Delivery!'
                    : `Add ${formatPrice(remainingForFreeDelivery)} more to get FREE Delivery`}
                </span>
                <span className="text-[11px] font-bold text-slate-500">
                  {isFreeDelivery ? '100%' : `${Math.round((subtotal / 499) * 100)}%`}
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                <div
                  style={{ width: `${Math.min(100, (subtotal / 499) * 100)}%` }}
                  className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                />
              </div>
            </div>

            {/* Product List */}
            <div className="space-y-3">
              {cartItems.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-slate-300 transition-all"
                >
                  {/* Thumbnail & Info */}
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <Link
                      href={`/product/${product.slug}`}
                      className="relative w-20 h-20 bg-slate-50 rounded-xl overflow-hidden shrink-0 border border-slate-200 p-2"
                    >
                      <ImageWithFallback
                        src={product.images[0]}
                        alt={product.title}
                        fill
                        className="object-contain p-1"
                      />
                    </Link>

                    <div className="flex-1 min-w-0 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {product.brand}
                      </span>
                      <Link
                        href={`/product/${product.slug}`}
                        className="block text-sm font-semibold text-slate-900 hover:text-indigo-950 line-clamp-1 transition-colors"
                      >
                        {product.title}
                      </Link>
                      <div className="text-xs text-emerald-700 font-medium">
                        {getDeliveryEstimate(product.deliveryDays)}
                      </div>
                      <div className="text-xs text-slate-500">
                        {formatPrice(product.price)} each
                      </div>
                    </div>
                  </div>

                  {/* Quantity Controls & Line Price */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    {/* Stepper */}
                    <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 p-1">
                      <button
                        type="button"
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="p-1 rounded-lg text-slate-600 hover:bg-white hover:text-slate-900 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-slate-900">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="p-1 rounded-lg text-slate-600 hover:bg-white hover:text-slate-900 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    {/* Total for item */}
                    <div className="text-right min-w-[80px]">
                      <div className="text-base font-bold text-slate-900">
                        {formatPrice(product.price * quantity)}
                      </div>
                      {product.mrp > product.price && (
                        <div className="text-[11px] text-slate-400 line-through">
                          {formatPrice(product.mrp * quantity)}
                        </div>
                      )}
                    </div>

                    {/* Remove button */}
                    <button
                      type="button"
                      onClick={() => removeItem(product.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                      title="Remove item"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary Card (4 cols) */}
          <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6 sticky top-28">
            <h2 className="text-lg font-bold text-slate-900 pb-3 border-b border-slate-100">
              Order Summary
            </h2>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Items Subtotal:</span>
                <span className="font-semibold text-slate-900">{formatPrice(subtotal)}</span>
              </div>

              {totalSavings > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Total Discount:</span>
                  <span>- {formatPrice(totalSavings)}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-600">
                <span>Delivery:</span>
                <span>
                  {isFreeDelivery ? (
                    <span className="font-semibold text-emerald-700 uppercase text-[11px]">
                      FREE
                    </span>
                  ) : (
                    formatPrice(deliveryFee)
                  )}
                </span>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline text-sm">
                <span className="font-bold text-slate-900">Order Total:</span>
                <span className="text-xl font-extrabold text-slate-900">
                  {formatPrice(total)}
                </span>
              </div>
            </div>

            <Button
              variant="accent"
              size="lg"
              onClick={() => router.push('/checkout')}
              className="w-full gap-2 text-sm font-bold shadow-xs active:scale-95"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="h-4 w-4" />
            </Button>

            <div className="space-y-2 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Zero hidden fees. Transparent Indian checkout.</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-500 shrink-0" />
                <span>Instant order confirmation & saved in your browser</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Empty Cart State */
        <div className="max-w-md mx-auto py-16 text-center space-y-4 rounded-3xl bg-white border border-slate-200 p-8 shadow-2xs">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-900 flex items-center justify-center mx-auto">
            <ShoppingBag className="h-8 w-8 text-indigo-950" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Your Shopping Cart is empty</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Your cart looks lonely! Explore our catalog of vetted products or ask our AI concierge to help you pick in 30 seconds.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/search">
              <Button variant="primary" size="md" className="w-full sm:w-auto">
                Explore Catalog
              </Button>
            </Link>
            <Button
              variant="accent"
              size="md"
              onClick={() =>
                window.dispatchEvent(
                  new CustomEvent('open-ai-modal', {
                    detail: { query: 'best budget earbuds under 2000' },
                  })
                )
              }
              className="w-full sm:w-auto gap-1.5"
            >
              <Sparkles className="h-4 w-4" />
              <span>Ask AI to recommend</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
