'use client';

import * as React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  CheckCircle2,
  Package,
  Truck,
  MapPin,
  CreditCard,
  ArrowRight,
  ShoppingBag,
} from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Order } from '@/types';
import { formatPrice } from '@/lib/formatters';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export default function OrderConfirmationPage() {
  const params = useParams();
  const orderId = params?.id as string;

  const [orders, , isLoaded] = useLocalStorage<Order[]>('amazon_orders', []);
  const order = orders.find((o) => o.id === orderId);

  if (!isLoaded) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="h-8 w-48 bg-slate-200 animate-pulse rounded-lg mx-auto" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-4 px-4">
        <h2 className="text-xl font-bold text-slate-900">Order Not Found</h2>
        <p className="text-xs text-slate-500">
          We could not find an order matching #{orderId}. It may have been cleared or placed in another browser session.
        </p>
        <Link href="/orders">
          <Button variant="primary" size="md">
            View All Orders
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Success Hero Card */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-500/15 via-emerald-400/5 to-transparent p-6 sm:p-8 border border-emerald-200 text-center sm:text-left flex flex-col sm:flex-row items-center gap-6">
        <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
          <CheckCircle2 className="h-9 w-9 stroke-[2.5]" />
        </div>
        <div className="space-y-1">
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
            Order Confirmed • Thank you!
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Order #{order.id}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            A confirmation has been saved to your browser storage. Estimated Delivery:{' '}
            <strong className="text-emerald-800">{order.estimatedDelivery}</strong>
          </p>
        </div>
      </div>

      {/* Grid: Delivery Info + Payment Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Shipping Address */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 pb-2 border-b border-slate-100">
            <MapPin className="h-4 w-4 text-indigo-700" />
            <span>Shipping Address</span>
          </div>
          <p className="text-sm font-bold text-slate-900">{order.address.fullName}</p>
          <p className="text-xs text-slate-600 leading-relaxed">
            {order.address.street}, {order.address.city}, {order.address.state} -{' '}
            {order.address.pincode}
          </p>
          <p className="text-xs text-slate-500">Phone: {order.address.phone}</p>
        </div>

        {/* Payment & Status */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 pb-2 border-b border-slate-100">
            <CreditCard className="h-4 w-4 text-indigo-700" />
            <span>Payment Summary</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500">Method:</span>
            <span className="font-bold text-slate-900 uppercase">{order.paymentMethod}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500">Delivery:</span>
            <span className="font-semibold text-emerald-700">
              {order.deliveryFee === 0 ? 'FREE' : formatPrice(order.deliveryFee)}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
            <span className="font-bold text-slate-900">Total Paid:</span>
            <span className="text-base font-extrabold text-slate-900">
              {formatPrice(order.total)}
            </span>
          </div>
        </div>
      </div>

      {/* Ordered Items List */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
          Items in this Order ({order.items.length})
        </h2>

        <div className="divide-y divide-slate-100">
          {order.items.map(({ product, quantity }) => (
            <div key={product.id} className="py-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-xl bg-slate-50 border border-slate-200 overflow-hidden shrink-0">
                  <ImageWithFallback src={product.images[0]} alt={product.title} fill className="object-contain p-1" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400">
                    {product.brand}
                  </span>
                  <Link
                    href={`/product/${product.slug}`}
                    className="block text-sm font-semibold text-slate-900 hover:text-indigo-950 line-clamp-1"
                  >
                    {product.title}
                  </Link>
                  <span className="text-xs text-slate-500">
                    Qty: {quantity} • {formatPrice(product.price)} each
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-sm font-bold text-slate-900">
                  {formatPrice(product.price * quantity)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
        <Link href="/orders">
          <Button variant="outline" size="md">
            View All Past Orders
          </Button>
        </Link>
        <Link href="/search">
          <Button variant="primary" size="md" className="gap-2">
            <span>Continue Shopping</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
