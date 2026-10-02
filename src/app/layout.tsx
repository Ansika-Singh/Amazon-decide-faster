import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ClientLayout } from '@/components/layout/ClientLayout';
import React, { Suspense } from 'react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Decide Faster Amazon — Shop in 30 Seconds',
  description:
    'Amazon, but it helps you decide in 30 seconds. Zero sponsored ads, honest review digests, 90-day price history signals, and instant AI concierge.',
  keywords: [
    'Amazon',
    'e-commerce',
    'honest reviews',
    'price history',
    'India',
    'shopping assistant',
    'decide faster',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
          <ClientLayout>{children}</ClientLayout>
        </Suspense>
      </body>
    </html>
  );
}
