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
    "description": "Wireless earbuds, ANC headphones, and neckbands tuned for clarity.",
    "icon": "Headphones",
    "itemCount": 12
  },
  {
    "name": "Electronics",
    "slug": "electronics",
    "description": "Coding laptops, mechanical keyboards, gaming mice, SSDs, and monitors.",
    "icon": "Laptop",
    "itemCount": 16
  },
  {
    "name": "Mobiles",
    "slug": "mobiles",
    "description": "5G smartphones, flagship cameras, and ultra-protective armor cases.",
    "icon": "Smartphone",
    "itemCount": 6
  },
  {
    "name": "Home & Kitchen",
    "slug": "home-kitchen",
    "description": "Rapid air fryers, 900W mixer grinders, insulated flasks, and dry irons.",
    "icon": "Home",
    "itemCount": 13
  },
  {
    "name": "Fashion",
    "slug": "fashion",
    "description": "Denim jeans, sneakers, smartwatches, and everyday laptop backpacks.",
    "icon": "Shirt",
    "itemCount": 14
  },
  {
    "name": "Books",
    "slug": "books",
    "description": "Transformative non-fiction, finance, investing psychology, and classic literature.",
    "icon": "BookOpen",
    "itemCount": 10
  },
  {
    "name": "Fitness",
    "slug": "fitness",
    "description": "Home gym dumbbells, kettlebells, whey isolate, creatine, and yoga essentials.",
    "icon": "Dumbbell",
    "itemCount": 14
  },
  {
    "name": "Beauty",
    "slug": "beauty",
    "description": "Active serums, SPF 50 sunscreens, gentle cleansers, and grooming essentials.",
    "icon": "Sparkles",
    "itemCount": 12
  }
];
