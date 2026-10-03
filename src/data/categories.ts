import { Category } from '@/types';

export interface CategoryMeta {
  name: Category;
  slug: string;
  description: string;
  icon: string;
  itemCount: number;
}

export const categories: CategoryMeta[] = [
  {
    "name": "Audio",
    "slug": "audio",
    "description": "Wireless earbuds, ANC headphones, portable Bluetooth speakers, and neckbands tuned for clarity.",
    "icon": "Headphones",
    "itemCount": 14
  },
  {
    "name": "Electronics",
    "slug": "electronics",
    "description": "Gaming laptops, PS5 consoles, mechanical keyboards, mice, external SSDs, USB-C hubs, and monitors.",
    "icon": "Laptop",
    "itemCount": 18
  },
  {
    "name": "Mobiles",
    "slug": "mobiles",
    "description": "5G flagship smartphones, AI camera phones, fast chargers, and ultra-protective armor cases.",
    "icon": "Smartphone",
    "itemCount": 7
  },
  {
    "name": "Home & Kitchen",
    "slug": "home-kitchen",
    "description": "Rapid air fryers, 900W mixer grinders, espresso coffee makers, electric kettles, and dry irons.",
    "icon": "Home",
    "itemCount": 15
  },
  {
    "name": "Fashion",
    "slug": "fashion",
    "description": "Kurtis, sarees, formal shirts, denim jackets, jeans, combat boots, and ethnic dresses.",
    "icon": "Shirt",
    "itemCount": 31
  },
  {
    "name": "Books",
    "slug": "books",
    "description": "Transformative non-fiction, startups, mental toughness, wealth mindset, investing, and biographies.",
    "icon": "BookOpen",
    "itemCount": 15
  },
  {
    "name": "Fitness",
    "slug": "fitness",
    "description": "Hex dumbbells, solid kettlebells, whey isolate, creatine, shaker bottles, and yoga essentials.",
    "icon": "Dumbbell",
    "itemCount": 16
  },
  {
    "name": "Beauty",
    "slug": "beauty",
    "description": "Snail mucin, active serums, SPF 50 sunscreens, gentle cleansers, and grooming essentials.",
    "icon": "Sparkles",
    "itemCount": 13
  }
];
