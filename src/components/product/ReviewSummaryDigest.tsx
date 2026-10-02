'use client';

import * as React from 'react';
import { ThumbsUp, ThumbsDown, CheckCircle, ShieldCheck, Sparkles } from 'lucide-react';
import { ReviewSummary } from '@/types';

interface ReviewSummaryDigestProps {
  summary: ReviewSummary;
  reviewCount: number;
}

export function ReviewSummaryDigest({
  summary,
  reviewCount,
}: ReviewSummaryDigestProps) {
  const { pros, cons, verdict, sentiment } = summary;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs space-y-6">
      {/* Title & Metadata */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900">Honest Review Digest</h3>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-indigo-900 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
              <Sparkles className="h-2.5 w-2.5" /> AI Synthesized
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Summarised from {reviewCount.toLocaleString('en-IN')} verified customer reviews. Zero sponsored or paid reviews.
          </p>
        </div>
      </div>

      {/* One-Line Verdict Banner */}
      <div className="p-4 rounded-xl bg-indigo-950 text-white space-y-1 shadow-2xs">
        <span className="text-[10px] font-bold tracking-wider uppercase text-amber-400">
          The Bottom Line Verdict
        </span>
        <p className="text-sm font-medium leading-relaxed text-indigo-50">
          "{verdict}"
        </p>
      </div>

      {/* Sentiment Distribution Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
          <span>Customer Sentiment Distribution</span>
          <div className="flex items-center gap-3 text-[11px]">
            <span className="text-emerald-700 font-bold">{sentiment.positive}% Positive</span>
            <span className="text-slate-500">{sentiment.neutral}% Neutral</span>
            <span className="text-rose-600">{sentiment.negative}% Critical</span>
          </div>
        </div>
        <div className="h-3 w-full rounded-full bg-slate-100 flex overflow-hidden p-0.5 border border-slate-200">
          <div
            style={{ width: `${sentiment.positive}%` }}
            className="bg-emerald-500 rounded-l-full transition-all duration-500"
            title={`${sentiment.positive}% Positive`}
          />
          <div
            style={{ width: `${sentiment.neutral}%` }}
            className="bg-slate-300 transition-all duration-500"
            title={`${sentiment.neutral}% Neutral`}
          />
          <div
            style={{ width: `${sentiment.negative}%` }}
            className="bg-rose-500 rounded-r-full transition-all duration-500"
            title={`${sentiment.negative}% Critical`}
          />
        </div>
      </div>

      {/* Pros & Cons Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        {/* Pros */}
        <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200/80 space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
            <ThumbsUp className="h-4 w-4 text-emerald-600" />
            <span>Top Reasons to Buy (Pros)</span>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-700">
            {pros.map((pro, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="leading-snug">{pro}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Cons */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
            <ThumbsDown className="h-4 w-4 text-rose-500" />
            <span>Points to Keep in Mind (Cons)</span>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-600">
            {cons.map((con, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-400 shrink-0 mt-1.5" />
                <span className="leading-snug">{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
