'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Search,
  Check,
  ShoppingBag,
  ArrowRight,
  Loader2,
  DollarSign,
  Tag,
  Target,
  Zap,
} from 'lucide-react';
import { Dialog } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { products } from '@/data/products';
import { Product, AssistResponse, CartItem } from '@/types';
import { formatPrice } from '@/lib/formatters';
import { useToast } from '@/components/ui/Toast';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useCurrency } from '@/context/CurrencyContext';

interface AiAssistantModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialQuery?: string;
}

const EXAMPLE_QUERIES = [
  'best budget earbuds for gym under 2000',
  'laptop for coding under 60000',
  'gift for mom under 1500',
  'good mixer grinder',
  'protein powder for workout',
];

export function AiAssistantModal({
  open,
  onOpenChange,
  initialQuery = '',
}: AiAssistantModalProps) {
  const { formatPrice, currentCurrency } = useCurrency();
  const [query, setQuery] = React.useState(initialQuery);
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<AssistResponse | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const [, setCart] = useLocalStorage<CartItem[]>('amazon_cart', []);
  const { toast } = useToast();

  const exampleQueries = React.useMemo(
    () => [
      `best budget earbuds for gym under ${formatPrice(2000)}`,
      `laptop for coding under ${formatPrice(60000)}`,
      `gift for mom under ${formatPrice(1500)}`,
      'good mixer grinder',
      'protein powder for workout',
    ],
    [formatPrice]
  );

  React.useEffect(() => {
    if (initialQuery && open) {
      setQuery(initialQuery);
      handleSearch(initialQuery);
    }
  }, [initialQuery, open]);

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/assist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery, currency: currentCurrency.code }),
      });

      if (!res.ok) {
        throw new Error('Could not fetch recommendations');
      }

      const data: AssistResponse = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch recommendations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product: Product) => {
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
      description: `${product.title.slice(0, 32)}...`,
      actionText: 'View Cart',
      actionHref: '/cart',
      variant: 'success',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} className="max-w-3xl">
      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 border border-amber-200">
            <Sparkles className="h-6 w-6 fill-amber-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              Decide Faster AI Concierge
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                Beta
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              State your exact budget and use-case. Get 3 vetted picks in seconds.
            </p>
          </div>
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch(query);
          }}
          className="relative"
        >
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`e.g. best budget earbuds for gym under ${formatPrice(2000)}`}
            className="w-full h-12 pl-10 pr-28 rounded-xl border border-slate-300 bg-slate-50/70 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all"
            autoFocus
          />
          <Button
            type="submit"
            size="sm"
            disabled={loading || !query.trim()}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 h-9 px-4 rounded-lg bg-indigo-950 text-white font-medium hover:bg-indigo-900"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <span className="flex items-center gap-1">
                Ask <ArrowRight className="h-3.5 w-3.5" />
              </span>
            )}
          </Button>
        </form>

        {/* Example Prompt Chips */}
        <div className="space-y-1.5">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Popular queries to test:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {exampleQueries.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => {
                  setQuery(q);
                  handleSearch(q);
                }}
                className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 hover:bg-amber-50 hover:text-amber-900 hover:border-amber-200 border border-transparent transition-colors"
              >
                "{q}"
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
            <div className="relative">
              <div className="h-12 w-12 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin" />
              <Sparkles className="absolute inset-0 m-auto h-5 w-5 text-amber-500 fill-amber-400 animate-pulse" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">
                Evaluating catalog against your constraints...
              </p>
              <p className="text-xs text-slate-400">
                Filtering out low ratings and ranking for price-to-performance
              </p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700">
            {error}
          </div>
        )}

        {/* Results State */}
        {result && !loading && (
          <div className="space-y-4 pt-2">
            {/* Interpreted Constraints Strip */}
            <div className="flex flex-wrap items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700">
              <span className="font-semibold text-slate-500 uppercase tracking-wider text-[10px]">
                Inferred Constraints:
              </span>
              {result.interpretedAs.budget && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white border border-slate-200 font-medium text-slate-800">
                  <DollarSign className="h-3 w-3 text-emerald-600" />
                  Max Budget: {formatPrice(result.interpretedAs.budget)}
                </span>
              )}
              {result.interpretedAs.useCase && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white border border-slate-200 font-medium text-slate-800">
                  <Target className="h-3 w-3 text-indigo-600" />
                  {result.interpretedAs.useCase}
                </span>
              )}
              {result.interpretedAs.category && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white border border-slate-200 font-medium text-slate-800">
                  <Tag className="h-3 w-3 text-amber-600" />
                  {result.interpretedAs.category}
                </span>
              )}
              <span className="ml-auto text-[10px] text-slate-400 flex items-center gap-1">
                <Zap className="h-2.5 w-2.5 text-amber-500" />
                Source: {result.source === 'ai' ? 'Gemini 1.5 Flash' : 'Deterministic Ranker'}
              </span>
            </div>

            {/* 3 Ranked Cards */}
            <div className="space-y-3">
              {result.picks.map((pick) => {
                const product = products.find((p) => p.id === pick.productId);
                if (!product) return null;

                const isRank1 = pick.rank === 1;

                return (
                  <div
                    key={pick.productId}
                    className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-xl border transition-all ${
                      isRank1
                        ? 'bg-amber-50/40 border-amber-300 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
                    }`}
                  >
                    {/* Rank Badge & Image */}
                    <div className="relative shrink-0 w-20 h-20 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                      <ImageWithFallback
                        src={product.images[0]}
                        alt={product.title}
                        fill
                        className="object-cover"
                      />
                      <div
                        className={`absolute top-1 left-1 px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          pick.rank === 1
                            ? 'bg-amber-500 text-slate-950'
                            : pick.rank === 2
                            ? 'bg-indigo-950 text-white'
                            : 'bg-slate-700 text-white'
                        }`}
                      >
                        #{pick.rank}
                      </div>
                    </div>

                    {/* Middle Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge
                          variant={pick.rank === 1 ? 'accent' : 'secondary'}
                          className="text-[10px] py-0 px-2"
                        >
                          {pick.label}
                        </Badge>
                        <span className="text-xs text-slate-500 font-medium">
                          {product.brand} • ★ {product.rating}
                        </span>
                      </div>

                      <Link
                        href={`/product/${product.slug}`}
                        onClick={() => onOpenChange(false)}
                        className="text-sm font-semibold text-slate-900 hover:text-indigo-600 line-clamp-1 transition-colors"
                      >
                        {product.title}
                      </Link>

                      <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed italic bg-white/60 p-1.5 rounded-lg border border-slate-100">
                        "{pick.reason}"
                      </p>
                    </div>

                    {/* Price & Actions */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                      <div className="text-left sm:text-right">
                        <div className="text-base font-bold text-slate-900">
                          {formatPrice(product.price)}
                        </div>
                        {product.mrp > product.price && (
                          <div className="text-[11px] text-slate-400 line-through">
                            {formatPrice(product.mrp)}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <Link href={`/product/${product.slug}`} onClick={() => onOpenChange(false)}>
                          <Button variant="outline" size="sm" className="h-8 text-xs">
                            View
                          </Button>
                        </Link>
                        <Button
                          variant="accent"
                          size="sm"
                          onClick={() => handleAddToCart(product)}
                          className="h-8 text-xs gap-1"
                        >
                          <ShoppingBag className="h-3.5 w-3.5" />
                          Add
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </Dialog>
  );
}
