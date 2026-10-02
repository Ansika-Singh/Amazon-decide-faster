'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, Sparkles, ShoppingBag, Command, Zap, History, X, Heart } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { CartItem, Product } from '@/types';
import { Button } from '@/components/ui/Button';

interface HeaderProps {
  onOpenAiAsk?: () => void;
}

const DEFAULT_RECENT_SEARCHES = [
  'budget earbuds under 2000',
  'air fryer',
  'whey protein',
  'mechanical keyboard',
  'niacinamide serum',
];

export function Header({ onOpenAiAsk }: HeaderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = React.useState(searchParams.get('q') || '');
  const [isSearchFocused, setIsSearchFocused] = React.useState(false);
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  
  const [cartItems] = useLocalStorage<CartItem[]>('amazon_cart', []);
  const [wishlistItems] = useLocalStorage<Product[]>('amazon_wishlist', []);
  const [recentSearches, setRecentSearches] = useLocalStorage<string[]>(
    'amazon_recent_searches',
    DEFAULT_RECENT_SEARCHES
  );
  const [badgeBump, setBadgeBump] = React.useState(false);
  const wishlistCount = wishlistItems.length;

  // Calculate total item count
  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Trigger badge bump animation when cart count changes
  const prevCount = React.useRef(totalCount);
  React.useEffect(() => {
    if (totalCount !== prevCount.current) {
      setBadgeBump(true);
      const timer = setTimeout(() => setBadgeBump(false), 300);
      prevCount.current = totalCount;
      return () => clearTimeout(timer);
    }
  }, [totalCount]);

  // Keyboard shortcut listener: '/' focuses search, 'Cmd+K' opens AI assistant
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        document.activeElement !== searchInputRef.current &&
        !(
          document.activeElement instanceof HTMLInputElement ||
          document.activeElement instanceof HTMLTextAreaElement
        )
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onOpenAiAsk?.();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onOpenAiAsk]);

  // Close dropdown on outside click
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(e.target as Node)
      ) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const executeSearch = (term: string) => {
    const trimmed = term.trim();
    if (trimmed) {
      // Add to recent searches (deduplicated, max 6)
      setRecentSearches((prev) => [trimmed, ...prev.filter((s) => s.toLowerCase() !== trimmed.toLowerCase())].slice(0, 6));
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    } else {
      router.push('/search');
    }
    setIsSearchFocused(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch(searchQuery);
  };

  const removeRecentSearch = (e: React.MouseEvent, item: string) => {
    e.stopPropagation();
    setRecentSearches((prev) => prev.filter((s) => s !== item));
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md transition-all">
      {/* Top Banner Notice */}
      <div className="bg-indigo-950 text-indigo-100 text-xs py-1.5 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <Zap className="h-3.5 w-3.5 text-amber-400 shrink-0 fill-amber-400" />
        <span>
          <strong>Decide in 30 seconds:</strong> Pure organic search. Zero sponsored bias. Prices in ₹ with honest signals.
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <div className="h-9 w-9 rounded-xl bg-indigo-950 text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
              D
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight text-slate-900 group-hover:text-indigo-950 transition-colors">
                Decide<span className="text-amber-600">Faster</span>
              </span>
              <span className="text-[10px] text-slate-500 font-medium -mt-1 tracking-tight">
                No sponsored noise
              </span>
            </div>
          </Link>

          {/* Search Bar with Autocomplete & Recent Searches Dropdown */}
          <div className="flex-1 max-w-2xl relative hidden md:block">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onFocus={() => setIsSearchFocused(true)}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, brands, or categories... (Press '/' to focus)"
                className="w-full h-11 pl-10 pr-24 rounded-xl border border-slate-200 bg-slate-50/80 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all shadow-2xs"
              />
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 bg-slate-200/60 rounded border border-slate-300">
                  /
                </kbd>
                <button
                  type="submit"
                  className="h-7 px-2.5 rounded-lg bg-indigo-950 text-white text-xs font-medium hover:bg-indigo-900 transition-colors"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Dropdown for Recent Searches */}
            {isSearchFocused && recentSearches.length > 0 && (
              <div
                ref={dropdownRef}
                className="absolute top-full left-0 right-0 mt-1.5 rounded-2xl bg-white border border-slate-200 shadow-xl p-3 z-50 animate-in fade-in zoom-in-98"
              >
                <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 pb-2 border-b border-slate-100">
                  <span className="flex items-center gap-1">
                    <History className="h-3 w-3" /> Recent Searches
                  </span>
                  <button
                    onClick={() => setRecentSearches([])}
                    className="hover:text-slate-700 font-medium normal-case"
                  >
                    Clear
                  </button>
                </div>

                <div className="divide-y divide-slate-50 py-1">
                  {recentSearches.map((term) => (
                    <div
                      key={term}
                      onClick={() => {
                        setSearchQuery(term);
                        executeSearch(term);
                      }}
                      className="flex items-center justify-between px-2.5 py-2 hover:bg-slate-50 rounded-lg cursor-pointer group text-xs text-slate-700"
                    >
                      <span className="flex items-center gap-2 group-hover:text-indigo-950 font-medium">
                        <Search className="h-3.5 w-3.5 text-slate-400 group-hover:text-indigo-950" />
                        {term}
                      </span>
                      <button
                        onClick={(e) => removeRecentSearch(e, term)}
                        className="text-slate-300 hover:text-rose-500 p-0.5"
                        aria-label={`Remove search ${term}`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Actions: Ask AI & Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Ask AI Trigger */}
            <button
              onClick={onOpenAiAsk}
              type="button"
              className="inline-flex items-center gap-2 h-10 px-3.5 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-950 text-xs sm:text-sm font-semibold transition-all shadow-2xs active:scale-[0.98]"
              title="Open AI Shopping Assistant (Ctrl+K)"
            >
              <Sparkles className="h-4 w-4 text-amber-600 fill-amber-500 animate-pulse" />
              <span className="hidden sm:inline">Ask AI Assistant</span>
              <span className="sm:hidden font-medium">Ask AI</span>
              <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1 py-0.5 text-[10px] font-bold text-amber-800 bg-amber-200/60 rounded border border-amber-300">
                <Command className="h-2.5 w-2.5" /> K
              </kbd>
            </button>

            {/* Orders Link */}
            <Link
              href="/orders"
              className="hidden lg:inline-flex items-center h-10 px-3 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
            >
              My Orders
            </Link>

            {/* Wishlist Link with Badge */}
            <Link href="/wishlist" className="relative">
              <Button
                variant="outline"
                size="md"
                className="relative gap-2 px-3 rounded-xl border-slate-200 hover:bg-rose-50 hover:border-rose-200 min-h-[44px]"
                aria-label="Wishlist"
              >
                <Heart className={`h-4 w-4 transition-colors ${wishlistCount > 0 ? 'text-rose-500 fill-rose-500' : 'text-slate-600'}`} />
                <span className="hidden sm:inline font-medium text-slate-800">Wishlist</span>
                {wishlistCount > 0 && (
                  <span className="inline-flex items-center justify-center h-5 min-w-[20px] px-1 text-[11px] font-bold rounded-full bg-rose-500 text-white">
                    {wishlistCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Cart Link with Count Badge */}
            <Link href="/cart">
              <Button
                variant="outline"
                size="md"
                className="relative gap-2 px-3 sm:px-4 rounded-xl border-slate-200 hover:bg-slate-50 min-h-[44px]"
              >
                <ShoppingBag className="h-4 w-4 text-slate-700" />
                <span className="hidden sm:inline font-medium text-slate-800">Cart</span>
                {totalCount > 0 && (
                  <span
                    className={`inline-flex items-center justify-center h-5 min-w-[20px] px-1 text-[11px] font-bold rounded-full bg-amber-500 text-slate-950 ${
                      badgeBump ? 'animate-badge-bump' : ''
                    }`}
                  >
                    {totalCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Search Row with Recent Quick Chips */}
        <div className="pb-3 md:hidden space-y-2">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products or brands..."
              className="w-full h-11 pl-9 pr-16 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-2xs"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 h-8 px-3 rounded-lg bg-indigo-950 text-white text-xs font-medium"
            >
              Go
            </button>
          </form>

          {/* Quick Recent Chips on Mobile */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 no-scrollbar text-[11px]">
            <span className="text-slate-400 shrink-0 font-medium">Recent:</span>
            {recentSearches.slice(0, 3).map((term) => (
              <button
                key={term}
                onClick={() => {
                  setSearchQuery(term);
                  executeSearch(term);
                }}
                className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 shrink-0 truncate max-w-[130px]"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
