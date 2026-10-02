import * as React from 'react';
import Link from 'next/link';
import { ShieldCheck, Sparkles, TrendingDown, Clock, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full bg-slate-900 text-slate-300 border-t border-slate-800 pt-12 pb-16 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Core Value Props Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-800">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-950/80 text-amber-400 border border-indigo-850 shrink-0">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">No Sponsored Junk. Ever.</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Rankings are 100% organic based on ratings, price, and specs. No brand can pay to push bad products.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-950/80 text-amber-400 border border-indigo-850 shrink-0">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">AI Shopping Concierge</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Ask specific natural queries like "gym earbuds under ₹2000" and get exactly 3 vetted picks in seconds.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-950/80 text-amber-400 border border-indigo-850 shrink-0">
              <TrendingDown className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">90-Day Price Signals</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Clear "Good time to buy" or "Wait: usually cheaper" signals computed from 90 days of actual tracking.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-950/80 text-amber-400 border border-indigo-850 shrink-0">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Honest Review Digest</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Synthesized pros, cons, and a one-sentence verdict extracted across thousands of real customer reviews.
              </p>
            </div>
          </div>
        </div>

        {/* Links and Thesis */}
        <div className="py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
                D
              </div>
              <span className="font-bold text-lg text-white">
                Decide<span className="text-amber-500">Faster</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              "Amazon, but it helps you decide in 30 seconds." Keeps the familiar search, cart, and checkout flow while cutting out the exhaustion.
            </p>
            <div className="text-[11px] text-slate-500">
              🇮🇳 Tailored for Indian shoppers with ₹ INR pricing, rapid delivery estimates, and free shipping over ₹499.
            </div>
          </div>

          <div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Explore Categories
            </h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/search?category=Audio" className="hover:text-amber-400 transition-colors">
                  Audio & Wireless Earbuds
                </Link>
              </li>
              <li>
                <Link href="/search?category=Electronics" className="hover:text-amber-400 transition-colors">
                  Productivity & Electronics
                </Link>
              </li>
              <li>
                <Link href="/search?category=Mobiles" className="hover:text-amber-400 transition-colors">
                  5G Smartphones & Accessories
                </Link>
              </li>
              <li>
                <Link href="/search?category=Home+%26+Kitchen" className="hover:text-amber-400 transition-colors">
                  Home & Kitchen Appliances
                </Link>
              </li>
              <li>
                <Link href="/search?category=Fitness" className="hover:text-amber-400 transition-colors">
                  Fitness, Gym & Nutrition
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Platform & Orders
            </h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/orders" className="hover:text-amber-400 transition-colors">
                  Order History & Tracking
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-amber-400 transition-colors">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <span className="text-slate-500">No account required. Stored securely in your browser.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} DecideFaster. Built for the 8x Hiring Assignment.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" /> for Indian online shoppers.
          </p>
        </div>
      </div>
    </footer>
  );
}
