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
  metadataBase: new URL('https://amazon-decide-faster.vercel.app'),
  title: {
    default: 'Decide Faster Amazon — Shop in 30 Seconds',
    template: '%s | Decide Faster Amazon',
  },
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
  authors: [{ name: 'Ansika Singh', url: 'https://github.com/Ansika-Singh' }],
  creator: 'Ansika Singh',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://amazon-decide-faster.vercel.app',
    siteName: 'Decide Faster Amazon',
    title: 'Decide Faster Amazon — Shop in 30 Seconds',
    description:
      'Zero sponsored ads, honest review digests, 90-day price history signals, and instant AI concierge.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Decide Faster Amazon — Shop in 30 Seconds',
    description:
      'Zero sponsored ads, honest review digests, 90-day price history signals, and instant AI concierge.',
    creator: '@AnsikaSingh',
  },
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
