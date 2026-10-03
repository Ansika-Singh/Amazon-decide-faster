'use client';

import * as React from 'react';
import Link from 'next/link';
import { Package, ChevronRight, ShoppingBag, Calendar, Clock, ArrowRight } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Order } from '@/types';
import { formatPrice } from '@/lib/formatters';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useCurrency } from '@/context/CurrencyContext';

export default function OrdersListPage() {
  const { formatPrice } = useCurrency();
  const [orders, , isLoaded] = useLocalStorage<Order[]>('amazon_orders', []);

  if (!isLoaded) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="h-8 w-48 bg-slate-200 animate-pulse rounded-lg mx-auto" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Title */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            My Orders
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Track and review your past orders stored in this browser session.
          </p>
        </div>

        <Link href="/search">
          <Button variant="outline" size="sm" className="text-xs">
            Browse Catalog
          </Button>
        </Link>
      </div>

      {orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order) => {
            const dateStr = new Date(order.date).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            });

            return (
              <div
                key={order.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden hover:border-slate-300 transition-all"
              >
                {/* Order Top Bar */}
                <div className="bg-slate-50/80 px-6 py-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-6">
                    <div>
                      <span className="text-slate-400 font-semibold uppercase text-[10px]">
                        Order Placed
                      </span>
                      <p className="font-bold text-slate-900 mt-0.5">{dateStr}</p>
                    </div>

                    <div>
                      <span className="text-slate-400 font-semibold uppercase text-[10px]">
                        Total Amount
                      </span>
                      <p className="font-bold text-slate-900 mt-0.5">{formatPrice(order.total)}</p>
                    </div>

                    <div>
                      <span className="text-slate-400 font-semibold uppercase text-[10px]">
                        Ship To
                      </span>
                      <p className="font-medium text-slate-800 mt-0.5">{order.address.fullName}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-slate-400 text-xs font-mono">#{order.id}</span>
                    <Badge variant="success" className="text-[10px]">
                      Confirmed
                    </Badge>
                  </div>
                </div>

                {/* Items preview & Details CTA */}
                <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  {/* Thumbnails */}
                  <div className="flex items-center gap-3 overflow-x-auto py-1">
                    {order.items.map(({ product, quantity }) => (
                      <Link
                        key={product.id}
                        href={`/product/${product.slug}`}
                        className="relative w-16 h-16 rounded-xl bg-slate-50 border border-slate-200 overflow-hidden shrink-0 p-1 hover:border-indigo-950 transition-colors"
                        title={`${product.title} (Qty: ${quantity})`}
                      >
                        <ImageWithFallback src={product.images[0]} alt={product.title} fill className="object-contain p-1" />
                        {quantity > 1 && (
                          <span className="absolute bottom-1 right-1 bg-indigo-950 text-white text-[9px] font-bold px-1 rounded-sm">
                            x{quantity}
                          </span>
                        )}
                      </Link>
                    ))}
                    <div className="text-xs text-slate-500 pl-2">
                      <p className="font-semibold text-slate-800">
                        {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                      </p>
                      <p className="text-[11px] text-emerald-700 font-medium">
                        ETA: {order.estimatedDelivery}
                      </p>
                    </div>
                  </div>

                  {/* View Details Link */}
                  <Link href={`/orders/${order.id}`}>
                    <Button variant="outline" size="sm" className="gap-1.5 text-xs font-semibold">
                      <span>View Order</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty Orders State */
        <div className="max-w-md mx-auto py-20 text-center space-y-4 bg-white rounded-3xl border border-slate-200 p-8 shadow-2xs">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-950 flex items-center justify-center mx-auto">
            <Package className="h-8 w-8 text-indigo-950" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">No Orders Yet</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            When you place an order, it will appear here with transparent delivery tracking and invoices.
          </p>
          <div className="pt-2">
            <Link href="/search">
              <Button variant="primary" size="md">
                Start Shopping Now
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
