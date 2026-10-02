import * as React from 'react';
import { notFound } from 'next/navigation';
import { products } from '@/data/products';
import { ProductDetailClient } from './ProductDetailClient';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const product = products.find((p) => p.slug === resolvedParams.slug);
  if (!product) return { title: 'Product Not Found' };

  return {
    title: `${product.title} — Decide Faster Amazon`,
    description: `${product.brand} ${product.category}. ${product.reviewSummary.verdict}`,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [{ url: product.images[0] }],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const product = products.find((p) => p.slug === resolvedParams.slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
