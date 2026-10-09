import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Decide Faster Amazon',
    short_name: 'DecideFaster',
    description: 'Amazon, but it helps you decide in 30 seconds with zero sponsored ads.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f8fafc',
    theme_color: '#131921',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
