'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  Truck,
  CreditCard,
  QrCode,
  Banknote,
  CheckCircle2,
  Lock,
  ArrowRight,
  Info,
} from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { CartItem, Order, ShippingAddress, PaymentMethod } from '@/types';
import { formatPrice, getDeliveryEstimate } from '@/lib/formatters';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { useToast } from '@/components/ui/Toast';

export default function CheckoutPage() {
  const router = useRouter();
  const [cartItems, setCartItems, isLoaded] = useLocalStorage<CartItem[]>('amazon_cart', []);
  const [, setOrders] = useLocalStorage<Order[]>('amazon_orders', []);
  const { toast } = useToast();

  // Form State
  const [address, setAddress] = React.useState<ShippingAddress>({
    fullName: 'Ansika Singh',
    phone: '9876543210',
    street: 'Flat 402, Green Glen Layout, Bellandur',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560103',
  });

  const [paymentMethod, setPaymentMethod] = React.useState<PaymentMethod>('upi');
  const [upiId, setUpiId] = React.useState('ansika@okhdfcbank');
  const [cardNumber, setCardNumber] = React.useState('4532 •••• •••• 8821');
  const [cardExpiry, setCardExpiry] = React.useState('08/28');
  const [cardCvv, setCardCvv] = React.useState('921');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Calculations
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const isFreeDelivery = subtotal >= 499 || subtotal === 0;
  const deliveryFee = isFreeDelivery ? 0 : 40;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!address.fullName || !address.phone || !address.street || !address.city || !address.pincode) {
      toast({
        title: 'Missing Address Information',
        description: 'Please complete all address fields.',
        variant: 'error',
      });
      return;
    }

    if (cartItems.length === 0) {
      toast({
        title: 'Cart is empty',
        description: 'Add items to your cart before checking out.',
        variant: 'error',
      });
      return;
    }

    setIsSubmitting(true);

    const orderId = `OD${Date.now().toString().slice(-8)}`;
    const newOrder: Order = {
      id: orderId,
      date: new Date().toISOString(),
      items: [...cartItems],
      subtotal,
      deliveryFee,
      total,
      address,
      paymentMethod,
      estimatedDelivery: getDeliveryEstimate(2),
      status: 'confirmed',
    };

    setTimeout(() => {
      // Save order to localStorage
      setOrders((prev) => [newOrder, ...prev]);
      // Clear cart
      setCartItems([]);
      setIsSubmitting(false);

      toast({
        title: 'Order placed successfully!',
        description: `Order ID: ${orderId}`,
        variant: 'success',
      });

      router.push(`/orders/${orderId}`);
    }, 700);
  };

  if (!isLoaded) return null;

  if (cartItems.length === 0) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-4 px-4">
        <h2 className="text-xl font-bold text-slate-900">Your cart is empty</h2>
        <p className="text-xs text-slate-500">There are no items to checkout.</p>
        <Link href="/search">
          <Button variant="primary" size="md">
            Go to Catalog
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Checkout Title */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <span>Instant Checkout</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
              Demo Mode
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            No password or account required. Demo payment simulation with zero real charges.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
          <Lock className="h-3.5 w-3.5" />
          <span>256-bit Encrypted</span>
        </div>
      </div>

      <form onSubmit={handlePlaceOrder}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Checkout Columns (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Step 1: Shipping Address */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-950 text-white text-xs font-bold">
                  1
                </span>
                <h2 className="text-base font-bold text-slate-900">Delivery Address</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Full Name *</label>
                  <Input
                    type="text"
                    required
                    value={address.fullName}
                    onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                    placeholder="Recipient's name"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Phone Number *</label>
                  <Input
                    type="tel"
                    required
                    value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                    placeholder="10-digit mobile number"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Flat, House No., Building, Street *</label>
                  <Input
                    type="text"
                    required
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    placeholder="Area, Colony, Sector or Street"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">City / Town *</label>
                  <Input
                    type="text"
                    required
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">State *</label>
                    <Input
                      type="text"
                      required
                      value={address.state}
                      onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Pincode *</label>
                    <Input
                      type="text"
                      required
                      value={address.pincode}
                      onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                      maxLength={6}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Payment Method */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-950 text-white text-xs font-bold">
                    2
                  </span>
                  <h2 className="text-base font-bold text-slate-900">Payment Option</h2>
                </div>
                <span className="text-[11px] font-semibold text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  Demo Simulation
                </span>
              </div>

              {/* Demo Notice Banner */}
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-start gap-2">
                <Info className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
                <div className="leading-relaxed">
                  <strong>Notice:</strong> This is an interactive demo for the 8x assignment. Real payment credentials will NOT be charged. All choices succeed instantly.
                </div>
              </div>

              {/* Payment Radios */}
              <div className="space-y-3 pt-2">
                {/* UPI Option */}
                <label
                  className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-indigo-950 bg-indigo-50/40 ring-1 ring-indigo-950'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      value="upi"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                      className="accent-indigo-950 h-4 w-4"
                    />
                    <div className="p-2 rounded-xl bg-white border border-slate-200 text-indigo-950">
                      <QrCode className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-slate-900">Instant UPI</span>
                      <p className="text-xs text-slate-500">Google Pay, PhonePe, Paytm, BHIM</p>
                    </div>
                  </div>

                  {paymentMethod === 'upi' && (
                    <div className="w-full sm:w-auto">
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="yourname@upi"
                        className="text-xs px-3 py-1.5 rounded-lg border border-slate-300 bg-white"
                      />
                    </div>
                  )}
                </label>

                {/* Credit / Debit Card Option */}
                <label
                  className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'card'
                      ? 'border-indigo-950 bg-indigo-50/40 ring-1 ring-indigo-950'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="accent-indigo-950 h-4 w-4"
                    />
                    <div className="p-2 rounded-xl bg-white border border-slate-200 text-indigo-950">
                      <CreditCard className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-slate-900">Credit / Debit Card</span>
                      <p className="text-xs text-slate-500">Visa, Mastercard, RuPay, Amex</p>
                    </div>
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white w-32"
                      />
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="text-xs px-2 py-1.5 rounded-lg border border-slate-300 bg-white w-14 text-center"
                      />
                      <input
                        type="password"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="text-xs px-2 py-1.5 rounded-lg border border-slate-300 bg-white w-12 text-center"
                      />
                    </div>
                  )}
                </label>

                {/* Cash on Delivery Option */}
                <label
                  className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-indigo-950 bg-indigo-50/40 ring-1 ring-indigo-950'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="accent-indigo-950 h-4 w-4"
                    />
                    <div className="p-2 rounded-xl bg-white border border-slate-200 text-indigo-950">
                      <Banknote className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-slate-900">Cash on Delivery (COD)</span>
                      <p className="text-xs text-slate-500">Pay cash or UPI to delivery agent at your doorstep</p>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Order Review & Place CTA (4 cols) */}
          <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6 sticky top-28">
            <h2 className="text-lg font-bold text-slate-900 pb-3 border-b border-slate-100">
              Review Items ({cartItems.length})
            </h2>

            {/* Compact Item Thumbnails */}
            <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
              {cartItems.map(({ product, quantity }) => (
                <div key={product.id} className="flex items-center gap-3 text-xs">
                  <div className="relative w-12 h-12 rounded-lg bg-slate-50 border border-slate-200 overflow-hidden shrink-0">
                    <ImageWithFallback src={product.images[0]} alt={product.title} fill className="object-contain p-0.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900 truncate">{product.title}</p>
                    <p className="text-slate-500">Qty: {quantity} • {formatPrice(product.price * quantity)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="space-y-2 text-xs pt-3 border-t border-slate-100">
              <div className="flex justify-between text-slate-600">
                <span>Items Subtotal:</span>
                <span className="font-semibold text-slate-900">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Standard Delivery:</span>
                <span>{isFreeDelivery ? <strong className="text-emerald-700">FREE</strong> : formatPrice(deliveryFee)}</span>
              </div>
              <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline text-sm">
                <span className="font-bold text-slate-900">Total Payable:</span>
                <span className="text-2xl font-extrabold text-slate-900">
                  {formatPrice(total)}
                </span>
              </div>
            </div>

            {/* Place Order Button */}
            <Button
              type="submit"
              variant="accent"
              size="lg"
              disabled={isSubmitting}
              className="w-full gap-2 text-sm font-bold shadow-sm active:scale-95"
            >
              {isSubmitting ? (
                <span>Confirming Order...</span>
              ) : (
                <>
                  <span>Place Your Order</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>

            <div className="text-[11px] text-slate-400 text-center leading-relaxed">
              By placing your order, you agree to Decide Faster's fair price guarantee and demo terms.
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
