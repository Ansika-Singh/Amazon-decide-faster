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
    "itemCount": 16
  },
  {
    "name": "Electronics",
    "slug": "electronics",
    "description": "Gaming laptops, PS5 consoles, mechanical keyboards, mice, external SSDs, USB-C hubs, and monitors.",
    "icon": "Laptop",
    "itemCount": 20
  },
  {
    "name": "Mobiles",
    "slug": "mobiles",
    "description": "5G flagship smartphones, AI camera phones, fast chargers, and ultra-protective armor cases.",
    "icon": "Smartphone",
    "itemCount": 12
  },
  {
    "name": "Home & Kitchen",
    "slug": "home-kitchen",
    "description": "Rapid air fryers, 900W mixer grinders, espresso coffee makers, electric kettles, water purifiers, and cookware.",
    "icon": "Home",
    "itemCount": 18
  },
  {
    "name": "Fashion",
    "slug": "fashion",
    "description": "Kurtis, sarees, formal shirts, denim jackets, jeans, sweatpants, combat boots, and ethnic accessories.",
    "icon": "Shirt",
    "itemCount": 33
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
    "description": "Hex dumbbells, speed jump ropes, whey isolate, creatine, shaker bottles, wrist wraps, and smart bands.",
    "icon": "Dumbbell",
    "itemCount": 19
  },
  {
    "name": "Beauty",
    "slug": "beauty",
    "description": "Snail mucin, active serums, SPF 50 sunscreens, gentle cleansers, hair serums, coffee scrubs, and conditioners.",
    "icon": "Sparkles",
    "itemCount": 17
  }
];
