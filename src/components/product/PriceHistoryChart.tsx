'use client';

import * as React from 'react';
import { TrendingDown, TrendingUp, Info, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { PricePoint } from '@/types';
import { useCurrency } from '@/context/CurrencyContext';

interface PriceHistoryChartProps {
  priceHistory: PricePoint[];
  currentPrice: number;
}

export function PriceHistoryChart({
  priceHistory,
  currentPrice,
}: PriceHistoryChartProps) {
  const { formatPrice } = useCurrency();
  const [hoveredPoint, setHoveredPoint] = React.useState<PricePoint | null>(null);

  if (!priceHistory || priceHistory.length === 0) return null;

  const prices = priceHistory.map((p) => p.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const avgPrice = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);

  // Compute signal
  let signalType: 'good' | 'wait' | 'fair' = 'fair';
  let signalText = 'Fair price';
  let signalExplanation = 'This item is trading near its 90-day average price.';

  if (currentPrice <= minPrice * 1.05) {
    signalType = 'good';
    signalText = 'Good time to buy';
    signalExplanation = `This product is within 5% of its 90-day historic low (${formatPrice(minPrice)}). Strong buy signal.`;
  } else if (currentPrice > avgPrice * 1.08) {
    signalType = 'wait';
    const potentialDrop = currentPrice - avgPrice;
    signalText = `Wait: usually cheaper by ${formatPrice(potentialDrop)}`;
    signalExplanation = `Historical data shows this item routinely drops during sales by ~${formatPrice(potentialDrop)}. If not urgent, waiting 1-2 weeks may save money.`;
  }

  // Generate SVG coordinates
  const width = 600;
  const height = 180;
  const paddingX = 40;
  const paddingY = 25;

  const chartW = width - paddingX * 2;
  const chartH = height - paddingY * 2;
  const range = maxPrice - minPrice || 1;

  const points = priceHistory.map((p, index) => {
    const x = paddingX + (index / (priceHistory.length - 1)) * chartW;
    const y = paddingY + chartH - ((p.price - minPrice) / range) * chartH;
    return { x, y, data: p };
  });

  const pathD = points.reduce((acc, curr, idx) => {
    return idx === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`;

  // Reference line Y coords
  const avgY = paddingY + chartH - ((avgPrice - minPrice) / range) * chartH;
  const minY = paddingY + chartH;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs space-y-4">
      {/* Title & Signal Badge */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900">90-Day Price History</h3>
            <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
              Automated Tracking
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Transparent price tracking so you never overpay before a sale.
          </p>
        </div>

        {/* Signal Chip */}
        <div
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold shadow-2xs border ${
            signalType === 'good'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
              : signalType === 'wait'
              ? 'bg-amber-50 text-amber-900 border-amber-300'
              : 'bg-indigo-50 text-indigo-900 border-indigo-200'
          }`}
        >
          {signalType === 'good' && <CheckCircle2 className="h-4 w-4 text-emerald-600" />}
          {signalType === 'wait' && <Clock className="h-4 w-4 text-amber-600" />}
          {signalType === 'fair' && <Info className="h-4 w-4 text-indigo-600" />}
          <span>{signalText}</span>
        </div>
      </div>

      {/* Signal Explanation Tooltip Callout */}
      <div
        className={`p-3 rounded-xl text-xs flex items-start gap-2.5 ${
          signalType === 'good'
            ? 'bg-emerald-50/60 text-emerald-900 border border-emerald-200/60'
            : signalType === 'wait'
            ? 'bg-amber-50/70 text-amber-900 border border-amber-200/60'
            : 'bg-slate-50 text-slate-700 border border-slate-200/60'
        }`}
      >
        <Info className="h-4 w-4 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Decision Guidance: </strong> {signalExplanation}
        </div>
      </div>

      {/* 90-Day Summary Metrics Grid */}
      <div className="grid grid-cols-3 gap-3 text-center py-2 bg-slate-50/60 rounded-xl border border-slate-100">
        <div>
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
            Current Price
          </span>
          <p className="text-sm font-bold text-slate-900 mt-0.5">{formatPrice(currentPrice)}</p>
        </div>
        <div>
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
            90-Day Lowest
          </span>
          <p className="text-sm font-bold text-emerald-700 mt-0.5">{formatPrice(minPrice)}</p>
        </div>
        <div>
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
            90-Day Average
          </span>
          <p className="text-sm font-bold text-slate-700 mt-0.5">{formatPrice(avgPrice)}</p>
        </div>
      </div>

      {/* SVG Interactive Sparkline */}
      <div className="relative pt-2">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-44 overflow-visible cursor-crosshair select-none"
        >
          <defs>
            <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4338ca" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#4338ca" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line
            x1={paddingX}
            y1={minY}
            x2={width - paddingX}
            y2={minY}
            stroke="#e2e8f0"
            strokeDasharray="4 4"
          />
          <line
            x1={paddingX}
            y1={avgY}
            x2={width - paddingX}
            y2={avgY}
            stroke="#cbd5e1"
            strokeDasharray="3 3"
          />

          {/* Area Fill */}
          <path d={areaD} fill="url(#priceGradient)" />

          {/* Sparkline Stroke */}
          <path
            d={pathD}
            fill="none"
            stroke="#312e81"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Interactive Hit Rectangles */}
          {points.map((pt, i) => (
            <rect
              key={i}
              x={pt.x - 4}
              y={0}
              width={chartW / points.length + 1}
              height={height}
              fill="transparent"
              onMouseEnter={() => setHoveredPoint(pt.data)}
              onMouseLeave={() => setHoveredPoint(null)}
            />
          ))}

          {/* Hovered point indicator */}
          {hoveredPoint && (
            (() => {
              const activeIndex = priceHistory.findIndex(
                (p) => p.date === hoveredPoint.date
              );
              if (activeIndex === -1) return null;
              const pt = points[activeIndex];
              return (
                <g>
                  <line
                    x1={pt.x}
                    y1={paddingY}
                    x2={pt.x}
                    y2={height - paddingY}
                    stroke="#f59e0b"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                  />
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="5"
                    fill="#f59e0b"
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                </g>
              );
            })()
          )}
        </svg>

        {/* Hover Info Tooltip Overlay */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 px-1">
          <span>90 days ago ({priceHistory[0]?.date})</span>
          {hoveredPoint ? (
            <span className="font-semibold text-slate-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              {hoveredPoint.date}: <strong>{formatPrice(hoveredPoint.price)}</strong>
            </span>
          ) : (
            <span className="text-slate-400 italic">Hover points to view historical price</span>
          )}
          <span>Today ({priceHistory[priceHistory.length - 1]?.date})</span>
        </div>
      </div>
    </div>
  );
}
