'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Search,
  SlidersHorizontal,
  LayoutGrid,
  List,
  Star,
  X,
  RotateCcw,
  Sparkles,
  Check,
  ChevronRight,
} from 'lucide-react';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import { Product, Category } from '@/types';
import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Select } from '@/components/ui/Select';
import { Slider } from '@/components/ui/Slider';
import { Checkbox } from '@/components/ui/Checkbox';
import { Sheet } from '@/components/ui/Sheet';
import { useCurrency } from '@/context/CurrencyContext';

const SORT_OPTIONS = [
  { label: 'Relevance', value: 'relevance' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Highest Rated', value: 'rating' },
  { label: 'Biggest Price Drop', value: 'drop' },
];

const SYNONYM_MAP: Record<string, string[]> = {
  facewash: ['face wash', 'cleanser', 'facial wash', 'face wash cleanser', 'foam wash'],
  'face wash': ['facewash', 'cleanser', 'facial wash', 'foam wash'],
  cleanser: ['facewash', 'face wash', 'facial cleanser', 'facial wash'],
  sunscreen: ['sun screen', 'sunblock', 'spf'],
  'sun screen': ['sunscreen', 'sunblock', 'spf'],
  sunblock: ['sunscreen', 'sun screen', 'spf'],
  smartwatch: ['smart watch', 'watch'],
  'smart watch': ['smartwatch', 'watch'],
  earphones: ['earphone', 'earbuds', 'headphone', 'headphones', 'audio', 'tws'],
  earphone: ['earphones', 'earbuds', 'headphone', 'headphones', 'tws'],
  earbuds: ['earphones', 'earphone', 'headphone', 'headphones', 'tws', 'airpods'],
  headphones: ['headphone', 'earphones', 'earbuds', 'head set'],
  headphone: ['headphones', 'earphones', 'earbuds'],
  powerbank: ['power bank', 'portable charger', 'battery pack'],
  'power bank': ['powerbank', 'portable charger'],
  tshirt: ['t-shirt', 't shirt', 'tee'],
  't-shirt': ['tshirt', 't shirt', 'tee'],
  't shirt': ['tshirt', 't-shirt', 'tee'],
  airfryer: ['air fryer'],
  'air fryer': ['airfryer'],
  neckband: ['neck band'],
  'neck band': ['neckband'],
  moisturizer: ['moisturiser', 'cream', 'lotion'],
  moisturiser: ['moisturizer', 'cream', 'lotion'],
  shoes: ['sneakers', 'footwear'],
  jeans: ['denim', 'pants', 'trousers'],
};

function matchesSearchQuery(product: Product, query: string): boolean {
  if (!query || !query.trim()) return true;

  const qRaw = query.trim().toLowerCase();
  const qClean = qRaw.replace(/[\s\-_]+/g, '');

  const title = (product.title || '').toLowerCase();
  const brand = (product.brand || '').toLowerCase();
  const category = (product.category || '').toLowerCase();
  const tags = (product.tags || []).map((t) => t.toLowerCase());
  const description = (product.description || '').toLowerCase();
  const bullets = (product.bullets || []).map((b) => b.toLowerCase()).join(' ');

  const fullCorpus = `${title} ${brand} ${category} ${tags.join(' ')} ${description} ${bullets}`;
  const strippedCorpus = fullCorpus.replace(/[\s\-_]+/g, '');

  // 1. Direct match on full or space-stripped text
  if (fullCorpus.includes(qRaw) || strippedCorpus.includes(qClean)) {
    return true;
  }

  // 2. Tag matches
  if (tags.some((t) => t.includes(qRaw) || t.replace(/[\s\-_]+/g, '').includes(qClean))) {
    return true;
  }

  // 3. Synonym matches
  const synonyms = SYNONYM_MAP[qRaw] || SYNONYM_MAP[qClean] || [];
  for (const syn of synonyms) {
    const synClean = syn.replace(/[\s\-_]+/g, '');
    if (fullCorpus.includes(syn) || strippedCorpus.includes(synClean)) {
      return true;
    }
  }

  // 4. Multi-token match: all words in query must match
  const tokens = qRaw.split(/\s+/).filter(Boolean);
  if (tokens.length > 1) {
    const allMatch = tokens.every((token) => {
      const tokenClean = token.replace(/[\s\-_]+/g, '');
      const singular = token.endsWith('s') ? token.slice(0, -1) : token;
      const tokenSynonyms = SYNONYM_MAP[token] || SYNONYM_MAP[tokenClean] || [];
      return (
        fullCorpus.includes(token) ||
        fullCorpus.includes(singular) ||
        strippedCorpus.includes(tokenClean) ||
        tokenSynonyms.some((syn) => fullCorpus.includes(syn) || strippedCorpus.includes(syn.replace(/[\s\-_]+/g, '')))
      );
    });
    if (allMatch) return true;
  }

  // 5. Singular / Plural check
  const singular = qRaw.endsWith('s') ? qRaw.slice(0, -1) : qRaw;
  if (singular.length >= 3) {
    const singularClean = singular.replace(/[\s\-_]+/g, '');
    if (fullCorpus.includes(singular) || strippedCorpus.includes(singularClean)) {
      return true;
    }
  }

  return false;
}

export function SearchClient() {
  const { formatPrice, currentCurrency } = useCurrency();
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL state
  const queryParam = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category') || '';
  const sortParam = searchParams.get('sort') || 'relevance';
  const minRatingParam = Number(searchParams.get('rating') || '0');
  const maxPriceParam = Number(searchParams.get('maxPrice') || '130000');
  const brandParam = searchParams.get('brand') || '';
  const inStockOnlyParam = searchParams.get('inStock') === 'true';

  // Local filter states
  const [searchTerm, setSearchTerm] = React.useState(queryParam);
  const [selectedCategory, setSelectedCategory] = React.useState(categoryParam);
  const [sortBy, setSortBy] = React.useState(sortParam);
  const [minRating, setMinRating] = React.useState(minRatingParam);
  const [maxPrice, setMaxPrice] = React.useState(maxPriceParam);
  const [selectedBrands, setSelectedBrands] = React.useState<string[]>(
    brandParam ? brandParam.split(',') : []
  );
  const [brandSearch, setBrandSearch] = React.useState('');
  const [inStockOnly, setInStockOnly] = React.useState(inStockOnlyParam);
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = React.useState(false);

  // Sync with URL when params change externally
  React.useEffect(() => {
    setSearchTerm(searchParams.get('q') || '');
    setSelectedCategory(searchParams.get('category') || '');
    setSortBy(searchParams.get('sort') || 'relevance');
    setMinRating(Number(searchParams.get('rating') || '0'));
    setMaxPrice(Number(searchParams.get('maxPrice') || '130000'));
    const b = searchParams.get('brand');
    setSelectedBrands(b ? b.split(',') : []);
    setInStockOnly(searchParams.get('inStock') === 'true');
  }, [searchParams]);

  // Push updates to URL query string
  const updateUrlParams = React.useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, val]) => {
        if (val === null || val === '' || val === '0') {
          params.delete(key);
        } else {
          params.set(key, val);
        }
      });
      router.push(`/search?${params.toString()}`);
    },
    [router, searchParams]
  );

  // Debounce search input into URL
  React.useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm !== queryParam) {
        updateUrlParams({ q: searchTerm.trim() || null });
      }
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm, queryParam, updateUrlParams]);

  // Extract all distinct brands from current category or overall
  const availableBrands = React.useMemo(() => {
    const pool = selectedCategory
      ? products.filter((p) => p.category === selectedCategory)
      : products;
    return Array.from(new Set(pool.map((p) => p.brand))).sort();
  }, [selectedCategory]);

  const filteredBrands = React.useMemo(() => {
    if (!brandSearch.trim()) return availableBrands;
    const q = brandSearch.toLowerCase().trim();
    return availableBrands.filter((b) => b.toLowerCase().includes(q));
  }, [availableBrands, brandSearch]);

  const handleBrandToggle = (brand: string) => {
    const next = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand];
    setSelectedBrands(next);
    updateUrlParams({ brand: next.length > 0 ? next.join(',') : null });
  };

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    setSelectedBrands([]); // reset brands when category switches
    setBrandSearch('');
    updateUrlParams({ category: cat || null, brand: null });
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSortBy('relevance');
    setMinRating(0);
    setMaxPrice(130000);
    setSelectedBrands([]);
    setBrandSearch('');
    setInStockOnly(false);
    router.push('/search');
  };

  const activeFilterCount =
    (selectedCategory ? 1 : 0) +
    selectedBrands.length +
    (minRating > 0 ? 1 : 0) +
    (maxPrice < 130000 ? 1 : 0) +
    (inStockOnly ? 1 : 0);

  // Filter & Sort Products
  const filteredProducts = React.useMemo(() => {
    return products
      .filter((p) => {
        // Query search with fuzzy, synonym, token, and normalized matching
        if (searchTerm.trim() && !matchesSearchQuery(p, searchTerm)) {
          return false;
        }

        // Category filter
        if (selectedCategory && p.category !== selectedCategory) {
          return false;
        }

        // Max price filter
        if (p.price > maxPrice) {
          return false;
        }

        // Rating filter
        if (minRating > 0 && p.rating < minRating) {
          return false;
        }

        // Brand filter
        if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) {
          return false;
        }

        // In Stock filter
        if (inStockOnly && p.stock <= 0) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price_asc') return a.price - b.price;
        if (sortBy === 'price_desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'drop') {
          const avgA = Math.round(a.priceHistory.reduce((s, h) => s + h.price, 0) / (a.priceHistory.length || 1));
          const avgB = Math.round(b.priceHistory.reduce((s, h) => s + h.price, 0) / (b.priceHistory.length || 1));
          const dropA = avgA - a.price;
          const dropB = avgB - b.price;
          return dropB - dropA;
        }
        // Default relevance: score matches and review popularity
        return b.reviewCount - a.reviewCount;
      });
  }, [searchTerm, selectedCategory, maxPrice, minRating, selectedBrands, inStockOnly, sortBy]);

  // Sidebar Filter Sections Component
  const FilterSections = (
    <div className="space-y-6 text-sm">
      {/* Category Filter */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Category
          </label>
          {selectedCategory && (
            <button
              onClick={() => handleCategorySelect('')}
              className="text-[10px] text-indigo-900 font-semibold hover:underline cursor-pointer"
            >
              Show all
            </button>
          )}
        </div>
        <div className="flex flex-col gap-1 max-h-56 overflow-y-auto pr-1">
          <button
            type="button"
            onClick={() => handleCategorySelect('')}
            className={`text-left text-xs py-1.5 px-2.5 rounded-lg transition-colors cursor-pointer ${
              !selectedCategory
                ? 'bg-indigo-950 text-white font-semibold shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            All Categories ({products.length})
          </button>
          {categories.map((c) => (
            <button
              key={c.name}
              type="button"
              onClick={() => handleCategorySelect(c.name)}
              className={`text-left text-xs py-1.5 px-2.5 rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
                selectedCategory === c.name
                  ? 'bg-indigo-950 text-white font-semibold shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>{c.name}</span>
              <span className="text-[10px] opacity-75">{c.itemCount}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Slider */}
      <div className="space-y-2 pt-3 border-t border-slate-100">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Max Budget ({currentCurrency.symbol.trim()})
        </label>
        <Slider
          min={500}
          max={130000}
          step={500}
          value={maxPrice}
          onChange={(val) => {
            setMaxPrice(val);
            updateUrlParams({ maxPrice: String(val) });
          }}
          formatValue={(val) => formatPrice(val)}
        />
      </div>

      {/* Minimum Rating */}
      <div className="space-y-2 pt-3 border-t border-slate-100">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Customer Rating
        </label>
        <div className="space-y-1.5">
          {[
            { val: 0, label: 'All Ratings' },
            { val: 4.0, label: '★ 4.0 & above' },
            { val: 4.4, label: '★ 4.4 & above (Top Rated)' },
          ].map((r) => (
            <button
              key={r.val}
              type="button"
              onClick={() => {
                setMinRating(r.val);
                updateUrlParams({ rating: r.val > 0 ? String(r.val) : null });
              }}
              className={`w-full text-left text-xs py-1.5 px-2.5 rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
                minRating === r.val
                  ? 'bg-amber-100 text-amber-950 font-bold border border-amber-300'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>{r.label}</span>
              {minRating === r.val && <Check className="h-3.5 w-3.5 text-amber-700" />}
            </button>
          ))}
        </div>
      </div>

      {/* Brands Filter */}
      {availableBrands.length > 0 && (
        <div className="space-y-2 pt-3 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Brand {selectedBrands.length > 0 && `(${selectedBrands.length})`}
            </label>
            {selectedBrands.length > 0 && (
              <button
                onClick={() => {
                  setSelectedBrands([]);
                  updateUrlParams({ brand: null });
                }}
                className="text-[10px] text-indigo-900 font-semibold hover:underline cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
          {availableBrands.length > 6 && (
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                value={brandSearch}
                onChange={(e) => setBrandSearch(e.target.value)}
                placeholder="Search brands..."
                className="w-full h-8 pl-8 pr-2.5 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-600"
              />
            </div>
          )}
          <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1.5">
            {filteredBrands.length === 0 ? (
              <p className="text-xs text-slate-400 py-2 text-center">No matching brands</p>
            ) : (
              filteredBrands.map((brand) => (
                <Checkbox
                  key={brand}
                  id={`brand-${brand}`}
                  label={brand}
                  checked={selectedBrands.includes(brand)}
                  onCheckedChange={() => handleBrandToggle(brand)}
                />
              ))
            )}
          </div>
        </div>
      )}

      {/* In Stock Only */}
      <div className="pt-3 border-t border-slate-100">
        <Checkbox
          id="in-stock-only"
          label="In Stock only"
          checked={inStockOnly}
          onCheckedChange={(checked) => {
            setInStockOnly(checked);
            updateUrlParams({ inStock: checked ? 'true' : null });
          }}
        />
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-500">
        <Link href="/" className="hover:text-slate-900 transition-colors">
          Home
        </Link>
        <ChevronRight className="h-3 w-3 text-slate-400" />
        <span className="font-semibold text-slate-800">
          {selectedCategory || 'All Products'}
        </span>
        {searchTerm && (
          <>
            <ChevronRight className="h-3 w-3 text-slate-400" />
            <span className="text-slate-600">"{searchTerm}"</span>
          </>
        )}
      </nav>

      {/* Header controls: Results Count, Sort, Grid/List, Mobile Filter Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span>{selectedCategory || 'All Products'}</span>
            <span className="text-sm font-normal text-slate-500">
              ({filteredProducts.length} verified results)
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Zero sponsored items. Ranked purely on specs, customer ratings, and honest value.
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-end">
          {/* Mobile Filter Trigger */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden gap-1.5 text-xs h-9 px-3"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="h-2 w-2 rounded-full bg-amber-500" />
            )}
          </Button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">Sort:</span>
            <div className="w-44">
              <Select
                options={SORT_OPTIONS}
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  updateUrlParams({ sort: e.target.value });
                }}
                className="h-9 text-xs"
              />
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="hidden sm:flex items-center rounded-xl border border-slate-200 bg-white p-0.5 shadow-2xs">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                viewMode === 'grid'
                  ? 'bg-indigo-950 text-white'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
              aria-label="Grid view"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                viewMode === 'list'
                  ? 'bg-indigo-950 text-white'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
              aria-label="List view"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Layout: Sidebar + Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Desktop Sidebar Filters: Scrollable with pinned header */}
        <aside className="hidden lg:flex flex-col bg-white rounded-2xl border border-slate-200/90 shadow-2xs sticky top-24 max-h-[calc(100vh-6.5rem)] overflow-hidden">
          {/* Pinned Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-white z-10 shrink-0">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-indigo-950" />
              <span className="font-bold text-slate-900 text-sm">Filters</span>
              {activeFilterCount > 0 && (
                <span className="flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-900 rounded-full">
                  {activeFilterCount}
                </span>
              )}
            </div>
            {activeFilterCount > 0 && (
              <button
                onClick={handleResetFilters}
                className="text-xs text-indigo-900 hover:text-indigo-950 font-semibold flex items-center gap-1 hover:underline cursor-pointer transition-colors"
              >
                <RotateCcw className="h-3 w-3" /> Reset all
              </button>
            )}
          </div>

          {/* Scrollable Filter Body */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6 overscroll-contain">
            {FilterSections}
          </div>
        </aside>

        {/* Mobile Filter Sheet */}
        <Sheet
          open={mobileFilterOpen}
          onOpenChange={setMobileFilterOpen}
          side="left"
          title="Filter Catalog"
        >
          <div className="space-y-6 pb-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs text-slate-500 font-medium">
                {activeFilterCount > 0 ? `${activeFilterCount} active filter${activeFilterCount > 1 ? 's' : ''}` : 'No active filters'}
              </span>
              {activeFilterCount > 0 && (
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-indigo-900 hover:text-indigo-950 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="h-3 w-3" /> Reset all
                </button>
              )}
            </div>
            {FilterSections}
          </div>
        </Sheet>

        {/* Product Grid Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Active Filter Chips */}
          {(selectedCategory || selectedBrands.length > 0 || minRating > 0 || searchTerm) && (
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-slate-400 font-medium mr-1">Active:</span>
              {searchTerm && (
                <Badge variant="secondary" className="gap-1 pl-2.5 pr-1.5 py-1">
                  Query: "{searchTerm}"
                  <button onClick={() => updateUrlParams({ q: null })}>
                    <X className="h-3 w-3 hover:text-slate-900" />
                  </button>
                </Badge>
              )}
              {selectedCategory && (
                <Badge variant="secondary" className="gap-1 pl-2.5 pr-1.5 py-1">
                  {selectedCategory}
                  <button onClick={() => handleCategorySelect('')}>
                    <X className="h-3 w-3 hover:text-slate-900" />
                  </button>
                </Badge>
              )}
              {minRating > 0 && (
                <Badge variant="secondary" className="gap-1 pl-2.5 pr-1.5 py-1">
                  ★ {minRating}+
                  <button onClick={() => updateUrlParams({ rating: null })}>
                    <X className="h-3 w-3 hover:text-slate-900" />
                  </button>
                </Badge>
              )}
              {selectedBrands.map((b) => (
                <Badge key={b} variant="secondary" className="gap-1 pl-2.5 pr-1.5 py-1">
                  {b}
                  <button onClick={() => handleBrandToggle(b)}>
                    <X className="h-3 w-3 hover:text-slate-900" />
                  </button>
                </Badge>
              ))}
              <button
                onClick={handleResetFilters}
                className="text-xs text-indigo-900 hover:underline font-semibold ml-2"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Results List / Grid */}
          {filteredProducts.length > 0 ? (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'
                  : 'space-y-4'
              }
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            /* Friendly Empty State with Recommendations */
            <div className="rounded-3xl bg-white border border-slate-200 p-12 text-center space-y-4 shadow-2xs">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200">
                <Search className="h-7 w-7" />
              </div>
              <div className="max-w-md mx-auto">
                <h3 className="text-lg font-bold text-slate-900">No products matched your filters</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Try widening your price range, clearing specific brand filters, or asking our AI concierge to discover alternatives.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <Button variant="primary" size="sm" onClick={handleResetFilters}>
                  <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
                  Reset all filters
                </Button>
                <Button
                  variant="accent"
                  size="sm"
                  onClick={() =>
                    window.dispatchEvent(
                      new CustomEvent('open-ai-modal', {
                        detail: { query: searchTerm || 'best budget earbuds under 2000' },
                      })
                    )
                  }
                >
                  <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                  Ask AI to find alternatives
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
