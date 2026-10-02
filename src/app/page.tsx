'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ShieldCheck,
  TrendingDown,
  ArrowRight,
  Zap,
  CheckCircle2,
  Clock,
  Layers,
  Headphones,
  Laptop,
  Smartphone,
  CookingPot,
  Shirt,
  BookOpen,
  Dumbbell,
} from 'lucide-react';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Product } from '@/types';

const categoryIconMap: Record<string, React.ReactNode> = {
  Audio: <Headphones className="h-5 w-5" />,
  Electronics: <Laptop className="h-5 w-5" />,
  Mobiles: <Smartphone className="h-5 w-5" />,
  'Home & Kitchen': <CookingPot className="h-5 w-5" />,
  Fashion: <Shirt className="h-5 w-5" />,
  Books: <BookOpen className="h-5 w-5" />,
  Fitness: <Dumbbell className="h-5 w-5" />,
  Beauty: <Sparkles className="h-5 w-5" />,
};

export default function HomePage() {
  const [heroInput, setHeroInput] = React.useState('');

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroInput.trim()) {
      window.dispatchEvent(
        new CustomEvent('open-ai-modal', { detail: { query: heroInput.trim() } })
      );
    } else {
      window.dispatchEvent(
        new CustomEvent('open-ai-modal', { detail: { query: 'best budget earbuds for gym under 2000' } })
      );
    }
  };

  const openAiWithPrompt = (prompt: string) => {
    window.dispatchEvent(
      new CustomEvent('open-ai-modal', { detail: { query: prompt } })
    );
  };

  // Top Picks (enforcing mixed categories: 1 pick per distinct category)
  const topPicks = React.useMemo(() => {
    const sorted = [...products].sort(
      (a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount
    );
    const selected: Product[] = [];
    const usedCategories = new Set<string>();
    for (const p of sorted) {
      if (!usedCategories.has(p.category)) {
        selected.push(p);
        usedCategories.add(p.category);
        if (selected.length === 4) break;
      }
    }
    return selected;
  }, []);

  // Biggest 90-Day Price Drops ranked by drop vs 90-day average
  const biggestDrops = React.useMemo(() => {
    return [...products]
      .map((p) => {
        const prices = p.priceHistory.map((ph) => ph.price);
        const avgPrice = Math.round(
          prices.reduce((a, b) => a + b, 0) / (prices.length || 1)
        );
        const dropVsAvg = avgPrice - p.price;
        return { product: p, dropVsAvg };
      })
      .filter((item) => item.dropVsAvg > 0)
      .sort((a, b) => b.dropVsAvg - a.dropVsAvg)
      .slice(0, 4)
      .map((item) => item.product);
  }, []);

  return (
    <div className="space-y-16 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-900 text-white pt-14 pb-20 px-4 sm:px-6 lg:px-8 border-b border-indigo-900/50">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-indigo-600/15 blur-[120px] pointer-events-none rounded-full" />

        <div className="relative max-w-4xl mx-auto text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-900/80 border border-indigo-700/60 text-xs font-semibold text-indigo-200">
            <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
            <span>Zero Sponsored Ads • No sponsored results</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Amazon, but it helps you <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200">
              decide in 30 seconds.
            </span>
          </h1>

          {/* Subtitle / Product Thesis */}
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Keeps the familiar shopping flow (search, product page, cart, checkout) and removes what makes Amazon exhausting: sponsored junk, noisy reviews, and unclear "is this a good price?" moments.
          </p>

          {/* Hero AI Ask Bar */}
          <div className="pt-2 max-w-2xl mx-auto">
            <form
              onSubmit={handleHeroSubmit}
              className="relative flex items-center shadow-xl rounded-2xl bg-white p-1.5 border-2 border-amber-400/80 focus-within:ring-4 focus-within:ring-amber-400/20 transition-all"
            >
              <div className="pl-3 text-amber-500">
                <Sparkles className="h-5 w-5 fill-amber-400 animate-pulse" />
              </div>
              <input
                type="text"
                value={heroInput}
                onChange={(e) => setHeroInput(e.target.value)}
                placeholder="Ask AI: 'best budget earbuds for gym under 2000'..."
                className="w-full h-12 px-3 text-sm text-slate-900 placeholder:text-slate-400 bg-transparent focus:outline-none"
              />
              <Button
                type="submit"
                variant="accent"
                size="md"
                className="h-11 px-5 rounded-xl text-slate-950 font-bold shrink-0 gap-1.5 shadow-sm"
              >
                <span>Decide</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>

            {/* Prompt Suggestion Chips */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs">
              <span className="text-slate-400 font-medium">Try asking:</span>
              <button
                type="button"
                onClick={() => openAiWithPrompt('best budget earbuds for gym under 2000')}
                className="px-2.5 py-1 rounded-lg bg-indigo-900/60 hover:bg-indigo-800 text-slate-200 border border-indigo-700/50 transition-colors"
              >
                "best budget earbuds for gym under 2000"
              </button>
              <button
                type="button"
                onClick={() => openAiWithPrompt('good mixer grinder')}
                className="px-2.5 py-1 rounded-lg bg-indigo-900/60 hover:bg-indigo-800 text-slate-200 border border-indigo-700/50 transition-colors"
              >
                "good mixer grinder"
              </button>
              <button
                type="button"
                onClick={() => openAiWithPrompt('protein powder for workout')}
                className="hidden sm:inline-block px-2.5 py-1 rounded-lg bg-indigo-900/60 hover:bg-indigo-800 text-slate-200 border border-indigo-700/50 transition-colors"
              >
                "protein powder for workout"
              </button>
            </div>
          </div>
        </div>

        {/* TRUST STRIP */}
        <div className="max-w-5xl mx-auto mt-14 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-slate-900/50 border border-slate-800">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span className="text-xs font-bold text-white">No Sponsored Results</span>
            <span className="text-[11px] text-slate-400">Pure organic quality ranking</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-slate-900/50 border border-slate-800">
            <TrendingDown className="h-4 w-4 text-amber-400" />
            <span className="text-xs font-bold text-white">90-Day Price Signals</span>
            <span className="text-[11px] text-slate-400">Buy now or wait guidance</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-slate-900/50 border border-slate-800">
            <Clock className="h-4 w-4 text-sky-400" />
            <span className="text-xs font-bold text-white">Honest Review Digest</span>
            <span className="text-[11px] text-slate-400">Pros, cons & one-line verdict</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-slate-900/50 border border-slate-800">
            <Zap className="h-4 w-4 text-yellow-400" />
            <span className="text-xs font-bold text-white">Free Delivery &gt; ₹499</span>
            <span className="text-[11px] text-slate-400">Prices in ₹ for Indian shoppers</span>
          </div>
        </div>
      </section>

      {/* 2. FEATURED HERO QUERY (BUDGET EARBUDS UNDER ₹2000) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-transparent p-6 sm:p-8 border border-amber-200/80">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-2">
                <Sparkles className="h-3.5 w-3.5 text-amber-600 fill-amber-500" />
                <span>Featured Hero Query</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Budget Earbuds & Headphones Under ₹2,000
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Zero sponsored listings. Only the top verified audio gear for workouts, travel, and calls.
              </p>
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={() => openAiWithPrompt('best budget earbuds for gym under 2000')}
              className="gap-2"
            >
              <Sparkles className="h-4 w-4 text-amber-400 fill-amber-400" />
              <span>Ask AI to rank them</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products
              .filter((p) => p.category === 'Audio' && p.price <= 2000)
              .slice(0, 4)
              .map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        </div>
      </section>

      {/* 3. TOP PICKS (MIXED CATEGORIES) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900">Top Rated Picks</h2>
              <Badge variant="accent" className="text-[10px]">
                ★ Mixed Categories
              </Badge>
            </div>
            <p className="text-xs text-slate-500">Highest customer satisfaction across different departments</p>
          </div>
          <Link
            href="/search?sort=rating"
            className="text-xs font-semibold text-indigo-950 hover:text-indigo-800 flex items-center gap-1"
          >
            See more <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topPicks.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. BIGGEST 90-DAY PRICE DROPS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900">Biggest 90-Day Price Drops</h2>
              <Badge variant="success" className="text-[10px]">
                Vs 90-Day Average
              </Badge>
            </div>
            <p className="text-xs text-slate-500">Ranked by maximum discount below their 90-day usual average</p>
          </div>
          <Link
            href="/search?sort=drop"
            className="text-xs font-semibold text-indigo-950 hover:text-indigo-800 flex items-center gap-1"
          >
            View all price drops <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {biggestDrops.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. CATEGORIES GRID (WITH 8 DISTINCT LUCIDE ICONS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Browse by Category</h2>
            <p className="text-xs text-slate-500">Every item vetted with 90-day tracking</p>
          </div>
          <Link
            href="/search"
            className="text-xs font-semibold text-indigo-950 hover:text-indigo-800 flex items-center gap-1"
          >
            View all 50 products <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/search?category=${encodeURIComponent(cat.name)}`}
              className="group flex flex-col items-center text-center p-3.5 rounded-xl bg-white border border-slate-200/90 hover:border-indigo-400 hover:shadow-xs transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-900 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                {categoryIconMap[cat.name] || <Layers className="h-5 w-5" />}
              </div>
              <span className="text-xs font-semibold text-slate-900 group-hover:text-indigo-950">
                {cat.name}
              </span>
              <span className="text-[10px] text-slate-400 mt-0.5 font-medium">
                {cat.itemCount} items
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
