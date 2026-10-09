import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://amazon-decide-faster.vercel.app';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/checkout', '/orders'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
